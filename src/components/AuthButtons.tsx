"use client";

import { supabase } from "@/lib/supabase";
import { Twitch, Disc } from "lucide-react"; // Note: Lucide might not have Discord icon, checking... usually it's not there. I'll use text or generic icon if needed, or SVG. Actually Lucide has 'Gamepad2' or similar. I'll use simple SVGs or text if Lucide misses specifics. Wait, Lucide DOES NOT have brand icons usually. I will use standard SVGs for brands.

export default function AuthButtons() {
    const handleLogin = async (provider: "discord" | "twitch") => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <button
                onClick={() => handleLogin("discord")}
                className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white p-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
            >
                <svg width="24" height="24" viewBox="0 0 127.14 96.36" className="fill-current">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.09,105.09,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c.63-15.79-4.16-39.73-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                Connexion avec Discord
            </button>

            <button
                onClick={() => handleLogin("twitch")}
                className="flex items-center justify-center gap-3 bg-[#9146FF] hover:bg-[#7a2ce8] text-white p-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
                Connexion avec Twitch
            </button>
        </div>
    );
}
