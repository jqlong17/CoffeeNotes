import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/layout/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Notes - 咖啡笔记",
  description: "一个面向咖啡爱好者的 H5 应用，提供咖啡资讯、实用工具和个性化学习体验。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={cn(inter.className, 'min-h-screen bg-coffee-50')}>
        <Nav />
        <div className="lg:pl-64">
          <main className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-8">
            <div className="mx-auto max-w-screen-xl px-4 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
