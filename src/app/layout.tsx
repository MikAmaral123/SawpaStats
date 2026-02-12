import type { Metadata } from "next";
import { Inter, Creepster, Metal_Mania } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const creepster = Creepster({ weight: "400", subsets: ["latin"], variable: "--font-creepster" });
const metalMania = Metal_Mania({ weight: "400", subsets: ["latin"], variable: "--font-metal" });

export const metadata: Metadata = {
  title: "Sawpa Stats",
  description: "Stats Survivant Dead by Daylight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${creepster.variable} ${metalMania.variable} min-h-screen bg-slate-950 text-slate-100 font-sans`}>
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50 mix-blend-overlay"></div>
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>

        <GameProvider>
          <header className="border-b border-red-900/30 px-6 py-4 mb-4 bg-black/50 backdrop-blur-sm sticky top-0 z-50 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-creepster text-red-600 tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse-slow">
                Sawpa Stats
              </h1>
              <nav className="flex gap-4">
                <a href="/" className="text-slate-400 hover:text-red-500 font-metal tracking-wider transition-colors text-sm uppercase">Tableau de bord</a>
                <a href="/history" className="text-slate-400 hover:text-red-500 font-metal tracking-wider transition-colors text-sm uppercase">Historique</a>
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4 max-w-[1800px] relative z-10">
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
