import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense } from "react"; 

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StudioSpace | Premium Creative Workspaces",
  description: "Discover, book, and host premium creative studios.",
};


function NavbarSkeleton() {
  return <div className="h-20 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-neutral-800 w-full"></div>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebas.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-[#0a0a0a] dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          
          
          <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}