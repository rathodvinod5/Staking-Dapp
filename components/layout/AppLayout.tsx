"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Coins, LayoutDashboard } from "lucide-react";
import { useUIStore } from "@/lib/store/useStore";

function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  return (
    <button 
      onClick={() => setVisible(true)}
      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-4 rounded-full h-9 text-sm tracking-tight inline-flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)]"
    >
      Select Wallet
    </button>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet();
  const { isAdminMode, setIsAdminMode } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // In a real app we'd verify this against an environment variable or on-chain config
  // For now we allow toggle if connected
  const isConnected = !!publicKey;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-8 mx-auto justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="font-bold tracking-tight text-xl hidden sm:inline-block">
              Stakely
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            {mounted && isConnected && (
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdminMode}
                  onChange={(e) => setIsAdminMode(e.target.checked)}
                  className="rounded bg-accent"
                />
                Admin Mode
              </label>
            )}
            {mounted && isAdminMode && (
              <Link
                href="/admin"
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 text-purple-400"
              >
                <LayoutDashboard className="w-4 h-4" />
                Control Panel
              </Link>
            )}
            {mounted && <CustomConnectButton />}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col relative w-full items-center">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-7xl px-4 md:px-8 py-8 z-10 flex flex-col flex-1">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Stakely. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Built on Solana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
