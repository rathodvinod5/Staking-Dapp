"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { UnstakeTicketList } from "@/features/unstake/UnstakeTicketList";
import { motion } from "framer-motion";
import { useUserStats } from "@/features/dashboard/useStats";
import { formatLamports } from "@/lib/solana/utils";
import { Coins, Wallet, Activity } from "lucide-react";
import Link from "next/link";

function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  return (
    <button
      onClick={() => setVisible(true)}
      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-8 rounded-md h-12 inline-flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)]"
    >
      Connect Wallet
    </button>
  );
}

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const { data: userStats, isLoading } = useUserStats();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 pb-20 w-full max-w-5xl mx-auto pt-10">
      <div className="text-left space-y-4 mb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent pb-2 animate-gradient">
          My Portfolio
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl font-light">
          Manage your staked assets and track unstaking requests.
        </p>
      </div>

      {!connected ? (
        <div
          className="w-full p-12 text-center border border-border/40 rounded-3xl 
          dark:bg-black/40 bg-white/60 backdrop-blur-md shadow-xl dark:shadow-none flex flex-col items-center justify-center space-y-6 
          bg-gradient-to-b from-black/0 to-accent/10 mt-8"
        >
          <Wallet className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold">Connect your wallet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Connect your Solana wallet to view your staking portfolio, balances,
            and manage unstake tickets.
          </p>
          <div className="pt-4">
            <CustomConnectButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          <motion.div
            className="lg:col-span-5 w-full flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="p-6 border border-border/80 rounded-3xl dark:bg-black/40 bg-white/60 shadow-xl dark:shadow-none backdrop-blur-md relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors pointer-events-none" />

              <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wider">
                Total Staked Balance
              </h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold font-mono tracking-tighter text-slate-900 dark:text-slate-200">
                  {isLoading
                    ? "---"
                    : formatLamports(userStats?.stakedBalance || 0)}
                </span>
                <span className="text-xl text-primary font-medium mb-1">
                  stSOL
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                ≈{" "}
                {isLoading
                  ? "---"
                  : (((userStats?.stakedBalance || 0) / 1e9) * 1.02).toFixed(
                      2
                    )}{" "}
                SOL
              </p>

              <hr className="border-border/40 mb-6" />

              <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wider">
                Wallet Balance
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold font-mono tracking-tighter text-slate-900 dark:text-slate-200">
                  {isLoading
                    ? "---"
                    : formatLamports(userStats?.solBalance || 0)}
                </span>
                <span className="text-muted-foreground font-medium mb-0.5">
                  SOL
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <Link
                  href="/pools"
                  className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary/20 text-primary hover:bg-primary/30 py-3 text-sm font-bold transition-colors"
                >
                  Stake More SOL
                </Link>
              </div>
            </div>

            <div className="p-4 border border-border/40 rounded-xl bg-accent/20 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Connected Address</span>
              <span className="font-mono text-xs">
                {publicKey?.toString().slice(0, 4)}...
                {publicKey?.toString().slice(-4)}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 w-full space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" /> Active Tickets
              </h2>
              <UnstakeTicketList />
            </div>

            <div className="p-6 border border-border/40 rounded-3xl bg-gradient-to-b from-black/0 to-accent/10 mt-8">
              <h3 className="font-semibold mb-2">How Unstaking Works</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When you request to unstake your stSOL (via a specific pool), a
                ticket is created. The protocol processes these tickets by
                unbinding SOL from validator nodes at the next epoch boundary.
                Once processed, you must claim the SOL to receive it in your
                wallet.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
