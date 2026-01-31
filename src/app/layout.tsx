import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Metrika from "@/components/Metrika";
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
    default: "DevTools — Каталог лучших инструментов для разработчиков",
    template: "%s | DevTools",
  },
  description:
    "Самая большая база IT-инструментов, сервисов и библиотек на русском языке. Найдите идеальные решения для разработки, дизайна и роста вашего проекта.",
  verification: {
    google: "Ihz5Cd5vkNkVuh36pZjbyhECtbKBY5oZu7pMs4t5kXU",
    yandex: "b07cf790ccd76c61",
  },
  robots: "index, follow",
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
          <Metrika />
        </Providers>
      </body>
    </html>
  );
}
