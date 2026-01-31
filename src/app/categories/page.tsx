import toolsData from "@/data/tools.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Все категории инструментов | DevSuite RU",
  description:
    "Обзор всех категорий инструментов для разработчиков: от API до баз данных.",
};

export default function CategoriesPage() {
  // 1. Собираем уникальные категории и считаем количество инструментов в каждой
  const categoriesMap = toolsData.reduce(
    (acc: Record<string, number>, tool: any) => {
      const cat = tool.category;
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {},
  );

  const sortedCategories = Object.keys(categoriesMap).sort();

  // Функция для правильного склонения слова "инструмент"
  const getToolsLabel = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return "инструмент";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return "инструмента";
    return "инструментов";
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-5xl mx-auto py-20 px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Обзор категорий
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Найдите идеальный стек инструментов по направлениям
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCategories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat)}`}
              className="group flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all shadow-sm"
            >
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {cat}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {categoriesMap[cat]} {getToolsLabel(categoriesMap[cat])}
                </p>
              </div>

              {/* Иконка стрелки в кружочке */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
