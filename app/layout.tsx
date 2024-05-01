import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healt Quest",
  description: "HealthQuest: Perjalanan Kesehatan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto w-full max-w-sm h-screen relative flex flex-col">
          <Navbar />
          {children}
          <MenuBar />
        </div>
      </body>
    </html>
  );
}
