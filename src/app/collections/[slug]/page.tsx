"use client";

import { useState, useMemo, Suspense, use } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toolsData from "@/data/tools.json";
import { collections } from "@/data/collections";
import ToolCard from "@/components/ToolCard";
import Toolbar from "@/components/Toolbar";
import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 21;

function CollectionPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Находим данные о коллекции по слагу
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  // Параметры из URL
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState(q);

  const updateUrl = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === "" || (key === "page" && val === 1)) params.delete(key);
      else params.set(key, val.toString());
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Логика: фильтруем инструменты на основе фильтра из коллекции + поиск
  const filteredAndSorted = useMemo(() => {
    // 1. Применяем специфичный фильтр коллекции (например, только Open Source)
    let result = toolsData.filter(collection.filter);

    // 2. Применяем поиск по тексту (если введен)
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.short_description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 3. Применяем сортировку
    if (sort === "a-z") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "z-a")
      result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "oldest") result.sort((a, b) => a.id.localeCompare(b.id));
    else result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [collection, searchQuery, sort]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredAndSorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header коллекции */}
      <section className="pt-24 pb-12 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div
            className={`inline-flex p-3 rounded-2xl bg-muted ${collection.color} mb-6 shadow-sm`}
          >
            <collection.icon className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 uppercase">
            {collection.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <Toolbar
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          updateUrl({ q: val, page: 1 });
        }}
        sortBy={sort}
        onSortChange={(val) => updateUrl({ sort: val })}
        placeholder={`Поиск в коллекции: ${collection.title}...`}
      />

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg font-bold">
              В этой коллекции пока ничего не найдено 🔍
            </p>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => updateUrl({ page: p })}
        />
      </section>
    </main>
  );
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CollectionPageContent params={params} />
    </Suspense>
  );
}
