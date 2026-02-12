import AuthButtons from "@/components/AuthButtons";
import { Skull } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#1a0505] to-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-red-900/30 shadow-[0_0_50px_-12px_rgba(220,38,38,0.25)] flex flex-col items-center">
                <div className="mb-8 p-4 bg-red-950/20 rounded-full ring-2 ring-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.3)] animate-pulse-slow">
                    <Skull className="w-16 h-16 text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                </div>

                <h1 className="text-4xl font-creepster text-red-600 mb-2 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Sawpa Stats
                </h1>
                <p className="text-slate-400 mb-8 text-center font-sans tracking-wide">
                    Connecte-toi pour sauvegarder tes massacres
                </p>

                <AuthButtons />
            </div>
        </div>
    );
}
