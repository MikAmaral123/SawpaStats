"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Game {
    id: string;
    date: string;
    map: string;
    killer: string;
    kills: number;
}

interface GameContextType {
    games: Game[];
    addGame: (game: Omit<Game, "id" | "date">) => void;
    deleteGame: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [games, setGames] = useState<Game[]>([]);
    const isLoaded = React.useRef(false);

    useEffect(() => {
        const savedGames = localStorage.getItem("sawpa-stats-games");
        if (savedGames) {
            try {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setGames(JSON.parse(savedGames));
            } catch (e) {
                console.error("Failed to parse games", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isLoaded.current) {
            localStorage.setItem("sawpa-stats-games", JSON.stringify(games));
        } else {
            isLoaded.current = true;
        }
    }, [games]);

    const addGame = (gameData: Omit<Game, "id" | "date">) => {
        const newGame: Game = {
            ...gameData,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
        };
        setGames((prev) => [newGame, ...prev]);
    };

    const deleteGame = (id: string) => {
        setGames((prev) => prev.filter((g) => g.id !== id));
    };

    return (
        <GameContext.Provider value={{ games, addGame, deleteGame }}>
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
