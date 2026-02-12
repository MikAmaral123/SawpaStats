"use client";

import { useGames } from "@/context/GameContext";
import { getKillerImage } from "@/lib/constants";
import { calculateSurvivalScore } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function KillerList() {
    const { games } = useGames();
    const [searchTerm, setSearchTerm] = useState("");

    const killerStats = games.reduce((acc, game) => {
        if (!acc[game.killer]) {
            acc[game.killer] = { games: 0, totalSurvivalScore: 0 };
        }
        acc[game.killer].games += 1;
        acc[game.killer].totalSurvivalScore += calculateSurvivalScore(game.kills);
        return acc;
    }, {} as Record<string, { games: number; totalSurvivalScore: number }>);

    const filteredStats = Object.entries(killerStats).filter(([killerName]) =>
        killerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-900/80 rounded-xl border border-red-900/30 flex flex-col h-full shadow-lg backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-red-900/30 bg-black/40 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <h3 className="font-creepster text-xl text-red-600 tracking-wider">TUEURS</h3>
                <div className="relative w-1/2">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-700 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-950/50 border border-red-900/40 rounded text-sm focus:outline-none focus:border-red-600 text-slate-200 placeholder:text-slate-600 transition-all font-sans"
                    />
                </div>
            </div>

            <div className="overflow-y-auto flex-1 p-2 space-y-1 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-slate-950">
                {filteredStats.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                        <Search className="h-8 w-8 mb-2" />
                        <p className="text-sm">Aucune donnée</p>
                    </div>
                ) : (
                    filteredStats.sort((a, b) => b[1].games - a[1].games).map(([killer, stats]) => {
                        const imageUrl = getKillerImage(killer);
                        const survivalRate = stats.games > 0 ? (stats.totalSurvivalScore / stats.games).toFixed(0) : "0";

                        return (
                            <div key={killer} className="flex items-center gap-3 p-2 rounded hover:bg-red-900/10 transition-colors group border border-transparent hover:border-red-900/20">
                                <div className="h-12 w-9 rounded overflow-hidden bg-black border border-red-900/30 shrink-0 relative">
                                    {imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={imageUrl} alt={killer} className="h-full w-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="h-full w-full bg-slate-800" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-slate-200 text-sm truncate group-hover:text-red-400 transition-colors">{killer}</div>
                                    <div className="text-xs text-slate-500 font-metal">{stats.games} PARTIES</div>
                                </div>

                                <div className="text-right">
                                    <div className={cn("font-bold font-creepster text-lg", Number(survivalRate) >= 50 ? "text-green-500" : "text-red-500")}>
                                        {survivalRate}%
                                    </div>
                                    <div className="text-[10px] text-slate-600 uppercase">Survie</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
