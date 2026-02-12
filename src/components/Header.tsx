"use client";

import { useGames } from "@/context/GameContext";
import { supabase } from "@/lib/supabase";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const { user, profile } = useGames();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // Force full reload to ensure cookies are cleared and middleware runs
        window.location.href = "/login";
    };

    // Special Gold Effect Logic
    const pseudo = profile?.pseudo?.toLowerCase() || "";
    const isGoldUser = pseudo === "sawpalin" || pseudo === "mikamaral";

    return (
        <header className="border-b border-red-900/30 px-6 py-4 mb-4 bg-black/50 backdrop-blur-sm sticky top-0 z-50 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-creepster text-red-600 tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse-slow">
                    Sawpa Stats
                </h1>
                <nav className="flex gap-4">
                    <Link href="/" className="text-slate-400 hover:text-red-500 font-metal tracking-wider transition-colors text-sm uppercase">Tableau de bord</Link>
                    <Link href="/history" className="text-slate-400 hover:text-red-500 font-metal tracking-wider transition-colors text-sm uppercase">Historique</Link>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt="Avatar"
                                className={`w-10 h-10 rounded-full border-2 ${isGoldUser ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" : "border-red-900/50"}`}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-red-900/30">
                                <UserIcon className="w-5 h-5 text-slate-400" />
                            </div>
                        )}

                        {/* Pseudo */}
                        <div className="flex flex-col items-end">
                            <span className={`font-bold text-sm ${isGoldUser ? "gold-text animate-text-shimmer" : "text-slate-200"}`}>
                                {profile?.pseudo || user.email?.split('@')[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                            >
                                <LogOut className="w-3 h-3" /> Déconnexion
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 px-4 py-2 rounded-lg font-bold text-sm transition-all"
                    >
                        Connexion
                    </Link>
                )}
            </div>
        </header>
    );
}
