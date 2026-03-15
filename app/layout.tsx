import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stakely | Liquid Staking for Solana",
  description: "Deposit SOL and mint LST on the Solana network.",
};

import { SolanaProvider } from "@/lib/solana/SolanaProvider";
import { ProgramProvider } from "@/lib/solana/ProgramProvider";
import { ReactQueryProvider } from "@/lib/hooks/ReactQueryProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <ReactQueryProvider>
              <SolanaProvider>
                <ProgramProvider>
                  <AppLayout>{children}</AppLayout>
                </ProgramProvider>
              </SolanaProvider>
            </ReactQueryProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
