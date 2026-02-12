import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSurvivalScore(kills: number): number {
  switch (kills) {
    case 0: return 100;
    case 1: return 75;
    case 2: return 50;
    case 3: return 15;
    case 4: return 0;
    default: return 0;
  }
}
