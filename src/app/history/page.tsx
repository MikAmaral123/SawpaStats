"use client";

import { useGames } from "@/context/GameContext";
import { getKillerImage } from "@/lib/constants";
import { Trash2, History, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
    const { games, deleteGame } = useGames();

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-full bg-slate-900 border border-slate-700 hover:border-red-600 hover:text-red-500 transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-creepster text-red-600 tracking-wide drop-shadow-sm">Historique des Parties</h1>
                </div>
                <div className="text-slate-400 font-metal text-sm">
                    {games.length} PARTIES ENREGISTRÉES
                </div>
            </div>

            <div className="bg-slate-900/80 rounded-xl border border-red-900/30 shadow-lg backdrop-blur-sm overflow-hidden flex-1 flex flex-col">
                <div className="grid grid-cols-12 bg-black/60 p-4 text-sm font-metal text-red-700 uppercase tracking-widest border-b border-red-900/30 sticky top-0 z-10 backdrop-blur-md">
                    <div className="col-span-1"></div>
                    <div className="col-span-4">Tueur</div>
                    <div className="col-span-4">Carte</div>
                    <div className="col-span-2 text-center">Résultat</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-hide">
                    {games.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 italic">
                            Aucune partie enregistrée.
                        </div>
                    ) : (
                        <div className="divide-y divide-red-900/10">
                            {games.map(game => {
                                const imageUrl = getKillerImage(game.killer);
                                const isWin = game.kills < 3;

                                return (
                                    <div key={game.id} className="grid grid-cols-12 items-center p-4 hover:bg-red-900/5 transition-colors group">
                                        <div className="col-span-1">
                                            <div className="h-12 w-9 rounded overflow-hidden bg-black border border-red-900/20">
                                                {imageUrl && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={imageUrl} alt={game.killer} className="h-full w-full object-cover object-top opacity-80" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-4 font-bold text-slate-200">{game.killer}</div>
                                        <div className="col-span-4 text-slate-400 text-sm">{game.map}</div>
                                        <div className="col-span-2 text-center">
                                            <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase tracking-wider", isWin ? "bg-green-900/30 text-green-400 border border-green-900/50" : "bg-red-900/30 text-red-400 border border-red-900/50")}>
                                                {game.kills} Kills
                                            </span>
                                        </div>
                                        <div className="col-span-1 text-right">
                                            <button
                                                onClick={() => deleteGame(game.id)}
                                                className="text-slate-600 hover:text-red-500 transition-colors p-2 hover:bg-red-900/10 rounded-full"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
