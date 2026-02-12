"use client";

import GameForm from "@/components/GameForm";
import GlobalStats from "@/components/GlobalStats";
import KillerList from "@/components/KillerList";
import RecentGames from "@/components/RecentGames";

export default function Home() {
  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] grid grid-cols-12 gap-4 pb-4">

      {/* LEFT COLUMN: STATS & LIST (8 cols) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 h-full">
        {/* TOP: GLOBAL METRICS (Fixed Height) */}
        <div className="h-32 shrink-0">
          <GlobalStats />
        </div>

        {/* BOTTOM: KILLER LIST (Flexible Height) */}
        <div className="flex-1 min-h-0">
          <KillerList />
        </div>
      </div>

      {/* RIGHT COLUMN: FORM (4 cols) - Full Height */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full">
        <div className="flex-1 min-h-0">
          <GameForm />
        </div>
      </div>

    </div>
  );
}
