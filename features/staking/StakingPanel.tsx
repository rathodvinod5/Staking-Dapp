"use client";

import { useState } from "react";
import { useStaking } from "./useStaking";
import { useUserStats } from "../dashboard/useStats";
import { formatLamports } from "@/lib/solana/utils";
import { Loader2 } from "lucide-react";

export function StakingPanel() {
  const { deposit, unstake, isStaking, isUnstaking } = useStaking();
  const { data: userStats, isLoading } = useUserStats();

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

  const handleStake = () => {
    if (!stakeAmount || isNaN(Number(stakeAmount))) return;
    const lamports = Number(stakeAmount) * 1e9;
    deposit(lamports);
  };

  const handleUnstake = () => {
    if (!unstakeAmount || isNaN(Number(unstakeAmount))) return;
    const lamports = Number(unstakeAmount) * 1e9;
    unstake(lamports);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-border/50 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />

      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
          Liquid Staking
        </h3>
        <p className="text-sm text-muted-foreground">Stake SOL to receive stSOL instantly.</p>
      </div>
      
      <div className="p-6 pt-0">
        <div className="w-full">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-accent/50 p-1 text-muted-foreground w-full mb-6">
            <button 
                onClick={() => setActiveTab("stake")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-1/2 ${activeTab === 'stake' ? 'bg-primary text-primary-foreground shadow-sm' : ''}`}
            >
              Stake
            </button>
            <button 
                onClick={() => setActiveTab("unstake")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-1/2 ${activeTab === 'unstake' ? 'bg-destructive text-destructive-foreground shadow-sm' : ''}`}
            >
              Unstake
            </button>
          </div>
          
          {activeTab === "stake" ? (
            <div className="space-y-4">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-muted-foreground flex justify-between">
                  <span>Amount</span>
                  <span>Balance: {isLoading ? "---" : formatLamports(userStats?.solBalance || 0)} SOL</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="flex h-20 w-full rounded-md border pl-4 pr-16 py-6 text-xl bg-background/50 border-input font-mono ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-sm font-bold text-muted-foreground">SOL</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/30 rounded-lg p-3 text-sm space-y-2 border border-border/10">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You will receive</span>
                  <span className="font-mono font-medium tracking-tight text-primary">~{stakeAmount || "0.00"} stSOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-mono">1 SOL = ~0.98 stSOL</span>
                </div>
              </div>

              <button 
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full py-6 text-lg font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleStake}
                disabled={isStaking || !stakeAmount || Number(stakeAmount) <= 0}
              >
                {isStaking ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                {isStaking ? "Staking..." : "Stake SOL"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-muted-foreground flex justify-between">
                  <span>Amount</span>
                  <span>Staked: {isLoading ? "---" : formatLamports(userStats?.stakedBalance || 0)} stSOL</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="flex h-20 w-full rounded-md border pl-4 pr-16 py-6 text-xl bg-background/50 border-input font-mono ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-sm font-bold text-muted-foreground">stSOL</span>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm flex items-start gap-2 border border-destructive/20">
                 <span className="mt-0.5 animate-pulse">ℹ</span>
                 <p>Unstaking creates a ticket. You will receive SOL once the protocol admin processes the withdraw queue from the reserve.</p>
              </div>

              <button 
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full py-6 text-lg font-bold shadow-[0_0_20px_-5px_rgba(255,0,0,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleUnstake}
                disabled={isUnstaking || !unstakeAmount || Number(unstakeAmount) <= 0}
              >
                {isUnstaking ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                {isUnstaking ? "Creating Ticket..." : "Unstake to SOL"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
