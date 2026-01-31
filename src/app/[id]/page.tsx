import ReactMarkdown from "react-markdown";
import toolsData from "@/data/tools.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  Globe,
  Tag,
  DollarSign,
  Layout,
} from "lucide-react";
import SmartImage from "@/components/SmartImage";

interface Tool {
  id: string;
  name: string;
  link: string;
  pricing: string;
  category: string;
  short_description: string;
  description_markdown: string;
  is_open_source: boolean;
  is_verified?: boolean;
  tags: string[];
}

const tools = toolsData as Tool[];

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = tools.find((t) => t.id === id);

  if (!tool) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-5xl mx-auto py-12">
        {/* Кнопка назад */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Все инструменты
        </Link>

        {/* Заголовок */}
        <header className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            {/* ИКОНКА СЕРВИСА */}
            <SmartImage id={tool.id} name={tool.name} type="icon" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
                  {tool.name}
                </h1>
                {tool.is_verified && (
                  <ShieldCheck className="w-5 h-5 text-primary fill-primary/10" />
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-1 font-semibold tracking-wide">
                {
                  tool.link
                    .replace("https://", "")
                    .replace("www.", "")
                    .split("/")[0]
                }
              </p>
            </div>
          </div>

          <a
            href={tool.link}
            target="_blank"
            className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            Визит на сайт <ExternalLink className="w-4 h-4" />
          </a>
        </header>

        {/* ОСНОВНАЯ СЕТКА */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ЛЕВАЯ КОЛОНКА (Контент) */}
          <div className="lg:col-span-8">
            <div className="max-w-3xl pb-4">
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {tool.short_description}
              </p>
            </div>
            {/* Скриншот */}
            <SmartImage id={tool.id} name={tool.name} type="screenshot" />

            {/* Описание (Markdown) */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-headings:font-black prose-p:text-foreground/90 rose-p:leading-relaxed prose-li:text-foreground/90 prose-strong:text-foreground prose-strong:font-bold">
                <ReactMarkdown>{tool.description_markdown}</ReactMarkdown>
              </article>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (Сайдбар) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-muted/40 border border-border rounded-3xl p-8">
              {/* ЗАГОЛОВОК БЛОКА: уменьшаем разрядку и используем font-bold вместо font-black */}
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-8">
                Детали продукта
              </h3>

              <div className="space-y-8">
                {/* ПУНКТ: ЦЕНА */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-background border border-border rounded-xl text-primary shadow-sm">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight mb-0.5">
                      Цена
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {tool.pricing}
                    </p>
                  </div>
                </div>

                {/* ПУНКТ: КАТЕГОРИЯ */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-background border border-border rounded-xl text-purple-500 shadow-sm">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight mb-0.5">
                      Категория
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {tool.category}
                    </p>
                  </div>
                </div>

                {/* ПУНКТ: ТЕГИ */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-background border border-border rounded-xl text-emerald-500 shadow-sm">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight mb-1.5">
                      Теги
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold bg-background border border-border px-2 py-0.5 rounded-md text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {tool.is_open_source && (
                <div className="mt-8 pt-6 border-t border-border text-center">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    Open Source проект
                  </span>
                </div>
              )}
            </div>

            {/* Рекламный блок */}
            {/* <div className="rounded-3xl border-2 border-dashed border-border p-8 flex items-center justify-center text-center">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Место для контента
              </p>
            </div> */}
          </aside>
        </div>
      </div>
    </div>
  );
}
