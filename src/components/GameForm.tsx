"use client";

import { useGames } from "@/context/GameContext";
import { KILLERS, MAPS, getKillerImage } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "./SearchableSelect";

export default function GameForm() {
    const { addGame } = useGames();
    const [map, setMap] = useState<string>(MAPS[0]);
    const [killer, setKiller] = useState<string>(KILLERS[0]);
    const [kills, setKills] = useState<number>(2);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addGame({
            map,
            killer,
            kills,
        });
        // Visual feedback handled by UI updates usually, but let's keep it simple
    };

    const killerImage = getKillerImage(killer);

    return (
        <div className="bg-slate-900/80 rounded-xl border border-red-900/30 shadow-lg backdrop-blur-sm relative overflow-hidden group h-full flex flex-col">
            <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="p-4 border-b border-red-900/30 bg-black/40 text-center">
                <h2 className="text-xl font-creepster text-red-600 tracking-wide drop-shadow-sm">NOUVELLE PARTIE</h2>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6 relative z-10 overflow-y-auto">

                {/* Killer Preview */}
                <div className="flex justify-center">
                    <div className="h-32 w-24 rounded-lg bg-black/50 border-2 border-red-900/40 overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                        {killerImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={killerImage} alt={killer} className="h-full w-full object-cover object-top" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-red-900/50">?</div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <SearchableSelect
                        label="TUEUR"
                        options={[...KILLERS]}
                        value={killer}
                        onChange={setKiller}
                        placeholder="Choisir..."
                    />

                    <SearchableSelect
                        label="CARTE"
                        options={[...MAPS]}
                        value={map}
                        onChange={setMap}
                        placeholder="Choisir..."
                    />

                    <div>
                        <label className="block text-xs font-bold mb-2 text-slate-400 font-metal tracking-widest">KILLS DU TUEUR</label>
                        <div className="flex gap-2">
                            {[0, 1, 2, 3, 4].map((num) => (
                                <div key={num} className="flex-1">
                                    <button
                                        type="button"
                                        onClick={() => setKills(num)}
                                        className={cn(
                                            "w-full py-2 rounded border transition-all duration-200 font-bold font-metal tracking-wider relative overflow-hidden group/btn",
                                            kills === num
                                                ? "bg-red-700 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-105 z-10"
                                                : "bg-slate-900 border-slate-700 text-slate-500 hover:border-red-800 hover:text-slate-300"
                                        )}
                                    >
                                        <span className="relative z-10">{num}</span>
                                        {kills === num && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white font-bold rounded shadow-lg border border-red-500/30 transition-all active:scale-[0.98] uppercase tracking-widest font-metal mt-4 group/submit"
                    >
                        <span className="group-hover/submit:animate-pulse">AJOUTER</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
