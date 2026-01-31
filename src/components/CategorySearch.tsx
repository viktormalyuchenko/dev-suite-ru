"use client";

import { Search, ChevronDown, ArrowUpDown } from "lucide-react";

export default function CategorySearch({ total }: { total: number }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-10">
      {/* ПОИСК */}
      <div className="relative grow group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder={`Поиск среди ${total} инструментов...`}
          className="w-full h-10 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* КНОПКА СОРТИРОВКИ (в стиле оригинала) */}
      <button className="flex items-center justify-between h-10 px-4 bg-card border border-border rounded-xl text-[12px] font-bold text-foreground cursor-pointer hover:bg-card-hover transition-all md:min-w-44">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Сортировка</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}
