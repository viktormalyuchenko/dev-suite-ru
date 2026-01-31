import Link from "next/link";
import toolsData from "@/data/tools.json";
import { Github, Send, Terminal, Zap } from "lucide-react";

export default function Footer() {
  // Динамически берем 10 самых популярных категорий
  const categoriesMap = toolsData.reduce(
    (acc: Record<string, number>, tool: any) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    },
    {},
  );

  const popCategories = Object.entries(categoriesMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <footer className="border-t border-border bg-background pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Блок: Бренд */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-foreground dark:bg-primary p-1.5 rounded-lg text-background dark:text-white group-hover:rotate-12 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-foreground">
                Dev<span className="text-primary">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Курируемый список лучших инструментов для разработчиков. Мы
              помогаем экономить время и находить качественные решения.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Блок: Навигация */}
          <div className="flex flex-col gap-4 text-sm">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
              Навигация
            </h4>
            <Link
              href="/"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Все инструменты
            </Link>
            <Link
              href="/categories"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Категории
            </Link>
            <Link
              href="/advertise"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Реклама
            </Link>
          </div>

          {/* Блок: Проекты */}
          <div className="flex flex-col gap-4 text-sm">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
              Другие проекты
            </h4>
            <a
              href="https://bots.viktoor.ru"
              target="_blank"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Каталог ботов ТГ
            </a>
            <a
              href="https://viktoor.ru"
              target="_blank"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Личный сайт
            </a>
          </div>

          {/* Блок: Помощь */}
          <div className="flex flex-col gap-4 text-sm">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
              Помощь
            </h4>
            <Link
              href="/about"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              О проекте
            </Link>
            <Link
              href="/privacy"
              className="text-foreground hover:text-primary font-bold transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/submit"
              className="text-primary font-black uppercase tracking-tighter"
            >
              Добавить ↗
            </Link>
          </div>
        </div>

        {/* Популярные категории */}
        <div className="pt-12 border-t border-border">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-8 text-center md:text-left">
            Популярные категории:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-4">
            {popCategories.map(([name, count]) => (
              <div
                key={name}
                className="flex justify-between items-center text-[12px] font-bold border-b border-border pb-2"
              >
                <Link
                  href={`/categories/${encodeURIComponent(name)}`}
                  className="text-muted-foreground hover:text-primary transition-colors truncate pr-2"
                >
                  {name}
                </Link>
                <span className="text-muted-foreground opacity-40 text-[10px]">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Нижняя плашка */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-muted-foreground opacity-60 uppercase tracking-widest">
            <p>© 2026 DevSuite RU — Часть экосистемы Viktoor.ru</p>
            <div className="flex gap-4">
              <span>Сделано с ❤️ для IT-сообщества</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
