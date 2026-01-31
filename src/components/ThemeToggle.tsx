"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const options = [
    { name: "light", label: "Светлая", icon: Sun },
    { name: "dark", label: "Темная", icon: Moon },
    { name: "system", label: "Системная", icon: Monitor },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Кнопка-триггер */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-muted transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 bg-card border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in duration-150">
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => {
                setTheme(opt.name);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors hover:bg-card-hover cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <opt.icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    theme === opt.name
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span
                  className={
                    theme === opt.name
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }
                >
                  {opt.label}
                </span>
              </div>
              {theme === opt.name && <Check className="w-3 h-3 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
