import type { Metadata } from "next";
import { Inter, Creepster, Metal_Mania } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import Header from "@/components/Header";

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
          <Header />
          <main className="container mx-auto p-4 max-w-[1800px] relative z-10">
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
