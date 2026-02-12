"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Supabase handles the session exchange automatically in the client
        // We just need to redirect after checking session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // Create profile if not exists (upsert)
                // Actually best done via Postgres Triggers, but client-side is faster to implement now
                // We'll trust the trigger or simple RLS
                // Metadata is in session.user.user_metadata
                // We can just redirect to dashboard
                router.push("/");
            } else {
                router.push("/login");
            }
        });
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-creepster text-2xl animate-pulse">
            Initialisation du rituel...
        </div>
    );
}
