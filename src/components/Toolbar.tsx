"use client";

import { Search, LayoutGrid, ArrowUpDown, ChevronDown } from "lucide-react";

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory?: string;
  categories?: string[];
  onCategoryChange?: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
  placeholder?: string;
}

export default function Toolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  placeholder = "Поиск инструментов...",
}: ToolbarProps) {
  return (
    <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-y border-border py-3 mb-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center">
        {/* ПОИСК */}
        <div className="relative grow w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-10 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all font-sans"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0">
          {/* КАТЕГОРИИ (показываем только если переданы) */}
          {onCategoryChange && (
            <div className="relative grow md:grow-0">
              <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none h-10 pl-9 pr-8 bg-card border border-border rounded-xl text-[12px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full md:w-44 font-sans"
              >
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>
          )}

          {/* СОРТИРОВКА */}
          <div className="relative grow md:grow-0">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none h-10 pl-9 pr-8 bg-card border border-border rounded-xl text-[12px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full md:w-44 font-sans"
            >
              <option value="newest">Новые</option>
              <option value="oldest">Старые</option>
              <option value="a-z">Название (A - Z)</option>
              <option value="z-a">Название (Z - A)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
