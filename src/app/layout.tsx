"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <div className="flex-grow flex-1">{children}</div>
            </CartProvider>
          </AuthProvider>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
