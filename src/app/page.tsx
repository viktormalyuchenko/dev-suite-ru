"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toolsData from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ArrowUpDown,
} from "lucide-react";

const ITEMS_PER_PAGE = 21;

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("newest");

  const currentPage = Number(searchParams.get("page")) || 1;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(toolsData.map((t) => t.category)));
    return ["Все", ...unique.sort()];
  }, []);

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.short_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Все" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const sortedTools = useMemo(() => {
    const result = [...filteredTools];
    switch (sortBy) {
      case "a-z":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case "oldest":
        return result.sort((a, b) => (a.id > b.id ? 1 : -1));
      case "newest":
      default:
        return result.sort((a, b) => (a.id < b.id ? 1 : -1));
    }
  }, [filteredTools, sortBy]);

  const totalPages = Math.ceil(sortedTools.length / ITEMS_PER_PAGE);
  const paginatedTools = sortedTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Найдите лучшие инструменты <br />
            для вашего проекта
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Экономьте время, сокращайте расходы и фокусируйтесь на главном —
            создании качественного софта.
          </p>
        </div>
      </section>

      {/* --- TOOLBAR --- */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-y border-border py-3 mb-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center px-6">
          {/* ПОИСК */}
          <div className="relative grow w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Поиск инструментов..."
              className="w-full h-10 bg-muted border border-border rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ФИЛЬТРЫ */}
          <div className="flex gap-2 w-full md:w-auto shrink-0">
            {/* Общий стиль для селектов */}
            {[
              {
                id: "cat",
                val: selectedCategory,
                set: setSelectedCategory,
                list: categories,
                icon: LayoutGrid,
              },
              {
                id: "sort",
                val: sortBy,
                set: setSortBy,
                list: null,
                icon: ArrowUpDown,
              },
            ].map((item) => (
              <div key={item.id} className="relative grow md:grow-0">
                <item.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <select
                  value={item.val}
                  onChange={(e) => item.set(e.target.value)}
                  className="appearance-none h-10 pl-9 pr-8 bg-card border border-border rounded-xl 
    /* Новые классы шрифта */
    text-[12px] font-semibold tracking-tight text-foreground font-sans
    outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full md:w-44"
                >
                  {/* Добавляем стили для самих опций, чтобы браузер их подхватил */}
                  {item.list ? (
                    item.list.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-card text-foreground font-sans py-2"
                      >
                        {cat}
                      </option>
                    ))
                  ) : (
                    <>
                      <option
                        value="newest"
                        className="bg-card text-foreground font-sans py-2"
                      >
                        Новые
                      </option>
                      <option
                        value="oldest"
                        className="bg-card text-foreground font-sans py-2"
                      >
                        Старые
                      </option>
                      <option
                        value="a-z"
                        className="bg-card text-foreground font-sans py-2"
                      >
                        Название (A — Z)
                      </option>
                      <option
                        value="z-a"
                        className="bg-card text-foreground font-sans py-2"
                      >
                        Название (Z — A)
                      </option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GRID --- */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Ничего не найдено 🔍
            </p>
          </div>
        )}

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2 border-t border-border pt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-muted transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-foreground text-background shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-muted transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomePageContent />
    </Suspense>
  );
}
