import { collections } from "@/data/collections";
import toolsData from "@/data/tools.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">
            Коллекции
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Подборки инструментов, сгруппированные по ключевым особенностям и
            моделям оплаты.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col) => {
            // Считаем количество инструментов в каждой коллекции
            const count = toolsData.filter(col.filter).length;

            return (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-primary transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-muted ${col.color}`}>
                    <col.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {count} ресурсов
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
