"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Game {
    id: string;
    created_at: string;
    map: string;
    killer: string;
    kills: number;
}

interface GameContextType {
    games: Game[];
    addGame: (game: Omit<Game, "id" | "created_at">) => Promise<void>;
    deleteGame: (id: string) => Promise<void>;
    isLoading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGames = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching games:", error);
        } else {
            console.log("Fetched games:", data);
            setGames(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const addGame = async (gameData: Omit<Game, "id" | "created_at">) => {
        const { data, error } = await supabase
            .from('games')
            .insert([gameData])
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
        <GameContext.Provider value={{ games, addGame, deleteGame, isLoading }}>
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
