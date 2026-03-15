"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtocolStatsBar } from "@/features/dashboard/ProtocolStatsBar";

export default function PoolsPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 w-full max-w-5xl mx-auto pt-10">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
          Staking Pools
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
          Choose a liquidity pool to stake your SOL and mint LSTs.
        </p>
      </div>

      <ProtocolStatsBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <Link href={`/pools/stakely-core`}>
          <div className="group relative rounded-2xl border border-border/100 bg-black/40 backdrop-blur-xl p-6 pt-10 hover:border-primary/50 transition-all cursor-pointer overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded-full border border-green-500/20">
                Active
              </span>
            </div>

            <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-2">
              Stakely Core Pool
            </h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              The official Stakely liquidity pool. Stake SOL to receive stSOL
              instantly with competitive yields.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
              <div>
                <p className="text-xs text-muted-foreground">Estimated APY</p>
                <p className="font-mono font-medium text-green-400">~7.2%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Exchange Rate</p>
                <p className="font-mono font-medium">1 : 0.98</p>
              </div>
            </div>

            <div className="mt-6 w-full pt-4">
              <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4 flex items-center gap-1">
                View Pool Details &rarr;
              </span>
            </div>
          </div>
        </Link>

        {/* Placeholder for future pools */}
        <div className="rounded-2xl border border-border/20 bg-black/20 backdrop-blur-xl p-6 flex flex-col items-center justify-center min-h-[250px] opacity-60">
          <p className="text-muted-foreground font-medium">Coming Soon</p>
          <p className="text-sm text-muted-foreground/60 text-center mt-2">
            More liquidity pools and validator strategies will be available
            here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
