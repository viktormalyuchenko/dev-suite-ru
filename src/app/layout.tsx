import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin", "cyrillic"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.viktoor.ru"),
  title: {
    default: "DevTools.ru — Каталог лучших инструментов для разработчиков",
    template: "%s | DevTools.ru",
  },
  description:
    "Самая большая база IT-инструментов, сервисов и библиотек на русском языке. Найдите идеальные решения для разработки, дизайна и роста вашего проекта.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
