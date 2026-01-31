"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Инструменты", href: "/" },
    { name: "Категории", href: "/categories" },
    { name: "Коллекции", href: "#" }, // Пока заглушки
    { name: "Реклама", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Левая часть: Логотип и Навигация */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-foreground dark:bg-primary p-1.5 rounded-lg text-background dark:text-white group-hover:rotate-12 transition-transform shadow-sm">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-foreground">
                Dev<span className="text-primary">Tools</span>
              </span>
            </Link>

            {/* Десктопная навигация */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Правая часть: Поиск, Тема, Кнопки */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Поиск */}
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>

            {/* Переключатель темы (наш новый компонент) */}
            <ThemeToggle />

            {/* Кнопки действий */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/submit"
                className="px-4 py-2 text-xs font-bold uppercase tracking-tight text-foreground border border-border rounded-xl hover:bg-muted transition-all"
              >
                Добавить
              </Link>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-xs font-black uppercase tracking-tight bg-foreground text-background rounded-xl hover:opacity-90 transition-all shadow-sm"
              >
                Войти
              </Link>
            </div>

            {/* Мобильное меню (бургер) */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильная навигация (выпадающая) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-bold text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2 border-t border-border">
            <Link
              href="/submit"
              className="w-full py-3 text-center border border-border text-foreground rounded-xl text-sm font-black uppercase"
            >
              Добавить инструмент
            </Link>
            <Link
              href="/sign-in"
              className="w-full py-3 text-center bg-foreground text-background rounded-xl text-sm font-black uppercase"
            >
              Войти
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
