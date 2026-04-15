"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Coins, LayoutDashboard, Wallet, Menu, X } from "lucide-react";
import { useUIStore } from "@/lib/store/useStore";
import { ThemeToggle } from "@/components/ThemeToggle";

function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  const { publicKey, connected, disconnect } = useWallet();

  console.log("CustomConnectButton: ", publicKey, connected);

  if (connected && publicKey) {
    return (
      <button
        onClick={() => disconnect()}
        className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-900 dark:text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-4 rounded-full h-9 text-sm tracking-tight flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)] group min-w-[130px]"
      >
        <span className="group-hover:hidden">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
        <span className="hidden group-hover:inline">Disconnect</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-900 dark:text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-4 rounded-full h-9 text-sm tracking-tight flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)] min-w-[130px]"
    >
      Select Wallet
    </button>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet();
  const { isAdminMode, setIsAdminMode } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // In a real app we'd verify this against an environment variable or on-chain config
  // For now we allow toggle if connected
  const isConnected = !!publicKey;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-8 mx-auto justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Coins className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="font-bold tracking-tight text-xl hidden sm:inline-block">
              Stakely
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/pools"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pools
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Portfolio
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
            {mounted && <ThemeToggle />}
          </nav>

          {/* Mobile Header Elements */}
          <div className="flex md:hidden items-center gap-3">
            {mounted && <CustomConnectButton />}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 text-foreground hover:bg-accent rounded-md transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background border-l border-border/40 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/40 min-h-[64px]">
          <span className="font-bold tracking-tight text-xl">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 -mr-2 text-foreground hover:bg-accent rounded-md transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6 overflow-y-auto">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/pools"
            onClick={closeMenu}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Pools
          </Link>
          <Link
            href="/portfolio"
            onClick={closeMenu}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Portfolio
          </Link>
          
          {mounted && isConnected && (
            <label className="flex items-center gap-3 text-lg text-muted-foreground cursor-pointer pt-4 border-t border-border/40">
              <input
                type="checkbox"
                checked={isAdminMode}
                onChange={(e) => setIsAdminMode(e.target.checked)}
                className="rounded bg-accent w-5 h-5 flex-shrink-0"
              />
              Admin Mode
            </label>
          )}
          
          {mounted && isAdminMode && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2 text-purple-400"
            >
              <LayoutDashboard className="w-5 h-5" />
              Control Panel
            </Link>
          )}

          <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            {mounted && <ThemeToggle />}
          </div>
        </div>
      </div>

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
