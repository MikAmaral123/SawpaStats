"use client";

import { useGames } from "@/context/GameContext";
import { getKillerImage } from "@/lib/constants";
import { Trash2, History } from "lucide-react";

export default function RecentGames() {
    const { games, deleteGame } = useGames();

    return (
        <div className="bg-slate-900/80 rounded-xl border border-red-900/30 flex flex-col h-full shadow-lg backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-red-900/30 bg-black/40 sticky top-0 z-10 backdrop-blur-md flex items-center gap-2">
                <History className="h-4 w-4 text-red-600" />
                <h3 className="font-creepster text-xl text-slate-400 tracking-wider">HISTORIQUE</h3>
            </div>

            <div className="overflow-y-auto flex-1 p-2 space-y-2 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-slate-950">
                {games.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                        <p className="text-sm italic">Aucune partie récente</p>
                    </div>
                ) : (
                    games.slice(0, 10).map(game => {
                        const imageUrl = getKillerImage(game.killer);
                        return (
                            <div key={game.id} className="flex items-center justify-between bg-slate-950/50 p-2 rounded border border-red-900/10 hover:border-red-600/30 transition-all group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="h-10 w-8 rounded overflow-hidden bg-black border border-red-900/20 shrink-0">
                                        {imageUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={imageUrl} alt={game.killer} className="h-full w-full object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-red-400 text-sm truncate group-hover:text-red-300 transition-colors">{game.killer}</div>
                                        <div className="text-[10px] text-slate-500 truncate">{game.map}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pl-2">
                                    <div className="text-center">
                                        <span className="block font-mono font-bold text-slate-300 text-sm">{game.kills}</span>
                                        <span className="block text-[8px] text-slate-600 uppercase tracking-widest">Kills</span>
                                    </div>
                                    <button
                                        onClick={() => deleteGame(game.id)}
                                        className="text-slate-700 hover:text-red-600 transition-colors p-1.5 hover:bg-red-900/10 rounded"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
