"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toolsData from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import Toolbar from "@/components/Toolbar";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 21;

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "Все";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState(q);

  const updateUrl = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === "Все" || val === "" || (key === "page" && val === 1))
        params.delete(key);
      else params.set(key, val.toString());
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categories = useMemo(
    () => [
      "Все",
      ...Array.from(new Set(toolsData.map((t) => t.category))).sort(),
    ],
    [],
  );

  const filteredAndSorted = useMemo(() => {
    let result = toolsData.filter(
      (t) =>
        (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.short_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (cat === "Все" || t.category === cat),
    );
    if (sort === "a-z") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "z-a")
      result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "oldest") result.sort((a, b) => a.id.localeCompare(b.id));
    else result.sort((a, b) => b.id.localeCompare(a.id));
    return result;
  }, [searchQuery, cat, sort]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredAndSorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      <section className="pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Лучшие инструменты
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto px-6">
          Курируемый список IT-сервисов для профессионалов.
        </p>
      </section>

      {/* ИСПОЛЬЗУЕМ КОМПОНЕНТ TOOLBAR */}
      <Toolbar
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          updateUrl({ q: val, page: 1 });
        }}
        selectedCategory={cat}
        categories={categories}
        onCategoryChange={(val) => updateUrl({ category: val, page: 1 })}
        sortBy={sort}
        onSortChange={(val) => updateUrl({ sort: val })}
      />

      <section className="max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>

        {/* ИСПОЛЬЗУЕМ КОМПОНЕНТ PAGINATION */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => updateUrl({ page: p })}
        />
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
