"use client";

import { useGames } from "@/context/GameContext";
import { calculateSurvivalScore } from "@/lib/utils";
import { Users, Skull, Trophy } from "lucide-react";

export default function GlobalStats() {
    const { games } = useGames();

    const totalGames = games.length;
    const totalSurvivalScore = games.reduce((acc, game) => acc + calculateSurvivalScore(game.kills), 0);
    const averageSurvival = totalGames > 0 ? (totalSurvivalScore / totalGames).toFixed(0) : "0";

    // Average Kills
    const totalKills = games.reduce((acc, game) => acc + game.kills, 0);
    const averageKills = totalGames > 0 ? (totalKills / totalGames).toFixed(1) : "0";

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-red-900/30 shadow-lg flex items-center justify-between backdrop-blur-sm group hover:border-red-600/50 transition-colors">
                <div>
                    <h3 className="text-slate-400 text-xs font-metal tracking-widest uppercase">Survie Globale</h3>
                    <p className="text-3xl font-creepster text-red-500 drop-shadow-sm mt-1">{averageSurvival}%</p>
                </div>
                <div className="p-3 bg-red-950/30 rounded-full border border-red-900/20 group-hover:bg-red-900/30 transition-colors">
                    <Users className="h-6 w-6 text-red-600" />
                </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-red-900/30 shadow-lg flex items-center justify-between backdrop-blur-sm group hover:border-red-600/50 transition-colors">
                <div>
                    <h3 className="text-slate-400 text-xs font-metal tracking-widest uppercase">Parties</h3>
                    <p className="text-3xl font-creepster text-slate-200 drop-shadow-sm mt-1">{totalGames}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-full border border-red-900/20 group-hover:bg-red-900/30 transition-colors">
                    <Trophy className="h-6 w-6 text-red-600" />
                </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-red-900/30 shadow-lg flex items-center justify-between backdrop-blur-sm group hover:border-red-600/50 transition-colors">
                <div>
                    <h3 className="text-slate-400 text-xs font-metal tracking-widest uppercase">Moy. Kills</h3>
                    <p className="text-3xl font-creepster text-red-500 drop-shadow-sm mt-1">{averageKills}</p>
                </div>
                <div className="p-3 bg-red-950/30 rounded-full border border-red-900/20 group-hover:bg-red-900/30 transition-colors">
                    <Skull className="h-6 w-6 text-red-600" />
                </div>
            </div>
        </div>
    );
}
