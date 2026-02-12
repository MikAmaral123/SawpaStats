"use client";

import { useGames } from "@/context/GameContext";
import { getKillerImage } from "@/lib/constants";
import { Trash2, History, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

export default function HistoryPage() {
    const { games, deleteGame } = useGames();
    const [selectedKiller, setSelectedKiller] = useState<string>("");
    const [selectedMap, setSelectedMap] = useState<string>("");

    // Extract unique killers and maps for filter options
    const killers = useMemo(() => Array.from(new Set(games.map(g => g.killer))).sort(), [games]);
    const maps = useMemo(() => Array.from(new Set(games.map(g => g.map))).sort(), [games]);

    // Filter games
    const filteredGames = useMemo(() => {
        return games.filter(game => {
            const matchKiller = selectedKiller ? game.killer === selectedKiller : true;
            const matchMap = selectedMap ? game.map === selectedMap : true;
            return matchKiller && matchMap;
        });
    }, [games, selectedKiller, selectedMap]);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-full bg-slate-900 border border-slate-700 hover:border-red-600 hover:text-red-500 transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-creepster text-red-600 tracking-wide drop-shadow-sm">Historique</h1>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-red-900/20 backdrop-blur-sm">
                    <Filter className="w-4 h-4 text-red-500/70 ml-2" />
                    <select
                        value={selectedKiller}
                        onChange={(e) => setSelectedKiller(e.target.value)}
                        className="bg-transparent text-sm text-slate-300 border-none focus:ring-0 cursor-pointer hover:text-red-400 transition-colors"
                    >
                        <option value="">Tous les Tueurs</option>
                        {killers.map(k => <option key={k} value={k} className="bg-slate-900">{k}</option>)}
                    </select>
                    <div className="w-px h-4 bg-red-900/30 mx-2"></div>
                    <select
                        value={selectedMap}
                        onChange={(e) => setSelectedMap(e.target.value)}
                        className="bg-transparent text-sm text-slate-300 border-none focus:ring-0 cursor-pointer hover:text-red-400 transition-colors"
                    >
                        <option value="">Toutes les Maps</option>
                        {maps.map(m => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
                    </select>
                </div>

                <div className="text-slate-400 font-metal text-sm">
                    {filteredGames.length} / {games.length} PARTIES
                </div>
            </div>

            <div className="bg-slate-900/80 rounded-xl border border-red-900/30 shadow-lg backdrop-blur-sm overflow-hidden flex-1 flex flex-col relative z-10">
                <div className="grid grid-cols-12 bg-black/60 p-4 text-sm font-metal text-red-700 uppercase tracking-widest border-b border-red-900/30 sticky top-0 z-20 backdrop-blur-md">
                    <div className="col-span-1"></div>
                    <div className="col-span-4 pl-2">Tueur</div>
                    <div className="col-span-4">Carte</div>
                    <div className="col-span-2 text-center">Résultat</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                <div className="overflow-y-auto flex-1 scrollbar-hide">
                    {filteredGames.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 italic p-8">
                            {games.length === 0 ? "Aucune partie enregistrée." : "Aucune partie ne correspond aux filtres."}
                        </div>
                    ) : (
                        <div className="divide-y divide-red-900/10">
                            {filteredGames.map(game => {
                                const imageUrl = getKillerImage(game.killer);
                                const isWin = game.kills < 3;

                                return (
                                    <div key={game.id} className="grid grid-cols-12 items-center p-4 hover:bg-red-900/5 transition-colors group">
                                        <div className="col-span-1">
                                            <div className="h-12 w-9 rounded overflow-hidden bg-black border border-red-900/20 relative group-hover:border-red-500/50 transition-colors">
                                                {imageUrl && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={imageUrl} alt={game.killer} className="h-full w-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-span-4 pl-2 font-bold text-slate-200 group-hover:text-red-400 transition-colors">{game.killer}</div>
                                        <div className="col-span-4 text-slate-400 text-sm">{game.map}</div>
                                        <div className="col-span-2 text-center">
                                            <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase tracking-wider", isWin ? "bg-green-900/20 text-green-400 border border-green-900/30" : "bg-red-900/20 text-red-400 border border-red-900/30")}>
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
        </div>
    );
}
