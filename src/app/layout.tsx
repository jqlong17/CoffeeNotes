import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        <nav className="sticky top-0 z-50 border-b border-coffee-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-coffee-900">☕ Coffee Notes</h1>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-screen-xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
