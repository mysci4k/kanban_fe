import { getSession } from "@/features/auth/lib/session";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { QueryProvider } from "@/shared/providers/query-provider";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanblast",
  description:
    "Manage your tasks with energy! Kanblast is a modern Kanban app designed to supercharge your workflow.",
  keywords: [
    "kanblast",
    "kanban",
    "task management",
    "productivity",
    "workflow",
    "project management",
    "collaboration",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialSession = await getSession();

  return (
    <html
      lang="en"
      className={clsx(figtree.variable, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider initialSession={initialSession}>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
