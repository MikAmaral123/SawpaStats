"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface Game {
    id: string;
    created_at: string;
    map: string;
    killer: string;
    kills: number;
    user_id: string;
}

export interface Profile {
    id: string;
    pseudo: string | null;
    avatar_url: string | null;
}

interface GameContextType {
    games: Game[];
    addGame: (game: Omit<Game, "id" | "created_at" | "user_id">) => Promise<void>;
    deleteGame: (id: string) => Promise<void>;
    isLoading: boolean;
    user: User | null;
    profile: Profile | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Initial Auth Check & Subscription
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
                await fetchGames(session.user.id);
            } else {
                setGames([]);
                setProfile(null);
            }
            setIsLoading(false);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
                await fetchGames(session.user.id);
            } else {
                setGames([]);
                setProfile(null);
            }
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            setProfile(data);
        } else if (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchGames = async (userId: string) => {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching games:", error);
        } else {
            setGames(data || []);
        }
    };

    const addGame = async (gameData: Omit<Game, "id" | "created_at" | "user_id">) => {
        if (!user) return; // Prevent adding if not logged in

        const { data, error } = await supabase
            .from('games')
            .insert([{ ...gameData, user_id: user.id }])
            .select()
            .single();

        if (error) {
            console.error("Error adding game:", error);
        } else if (data) {
            setGames((prev) => [data, ...prev]);
        }
    };

    const deleteGame = async (id: string) => {
        const { error } = await supabase
            .from('games')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting game:", error);
        } else {
            setGames((prev) => prev.filter((g) => g.id !== id));
        }
    };

    return (
        <GameContext.Provider value={{ games, addGame, deleteGame, isLoading, user, profile }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGames() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGames must be used within a GameProvider");
    }
    return context;
}
