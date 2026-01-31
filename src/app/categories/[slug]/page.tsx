import toolsData from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import { notFound } from "next/navigation";
import CategorySearch from "@/components/CategorySearch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);

  const filteredTools = toolsData.filter((t) => t.category === decodedCategory);
  if (filteredTools.length === 0) notFound();

  const russianTitle = decodedCategory;

  return (
    // Добавлен bg-background и text-foreground
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto py-12">
          {/* Заголовок: использован text-foreground, а для числа — text-muted-foreground */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-center">
            <span className="text-muted-foreground opacity-50">
              {filteredTools.length}
            </span>{" "}
            Лучших {russianTitle}
          </h1>

          {/* Описание: использован text-muted-foreground */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium text-center">
            Лучшие протоколы и инструменты, которые позволяют приложениям
            общаться и взаимодействовать.
          </p>

          <div className="max-w-5xl mx-auto">
            <CategorySearch total={filteredTools.length} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
