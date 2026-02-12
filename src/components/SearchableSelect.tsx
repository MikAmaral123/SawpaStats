"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";

interface SearchableSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Sélectionner...",
    label,
}: SearchableSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={wrapperRef}>
            {label && <label className="block text-sm font-medium mb-1 text-slate-300">{label}</label>}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-3 rounded bg-slate-900 border border-red-900/50 text-slate-100 hover:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors shadow-sm"
            >
                <span className={cn("truncate", !value && "text-slate-500")}>
                    {value || placeholder}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>

            {open && (
                <div className="absolute z-50 w-full mt-1 bg-slate-950 border border-red-900 rounded shadow-lg animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-hidden flex flex-col">
                    <div className="flex items-center border-b border-red-900/30 px-3 py-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            className="flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-slate-500"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-slate-900">
                        {filteredOptions.length === 0 ? (
                            <div className="py-6 text-center text-sm text-slate-500">
                                Aucun résultat.
                            </div>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-red-900/20 hover:text-red-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                        value === option && "bg-red-900/40 text-red-100"
                                    )}
                                    onClick={() => {
                                        onChange(option);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
