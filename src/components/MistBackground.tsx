"use client";

import { useEffect, useState } from "react";

export default function MistBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
            <div className="mist-container">
                <div className="mist mist-1"></div>
                <div className="mist mist-2"></div>
                <div className="mist mist-3"></div>
            </div>
        </div>
    );
}
