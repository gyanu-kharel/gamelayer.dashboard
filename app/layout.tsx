import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import type React from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management",
  description: "Project Management Dashboard and Kanban Board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <div className="border-b">
              <div className="flex h-16 items-center justify-between px-4">
                {/* Left-aligned navigation */}
                <div className="flex-1">
                  <MainNav className="mx-6" />
                </div>

                {/* Centered logo */}
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/gamelayer-logo.svg"
                    height={170}
                    width={170}
                    alt="logo"
                  />
                </div>

                {/* Right-aligned controls */}
                <div className="flex-1 flex justify-end items-center space-x-4">
                  <ThemeToggle />
                  <UserNav />
                </div>
              </div>
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
