"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { StakingPanel } from "@/features/staking/StakingPanel";
import { UnstakeTicketList } from "@/features/unstake/UnstakeTicketList";
import { ProtocolStatsBar } from "@/features/dashboard/ProtocolStatsBar";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col gap-12 pb-20 w-full max-w-5xl mx-auto">
      <section className="text-center space-y-4 pt-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent pb-2">
            Liquid Staking <br/> on Solana
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-4 font-light">
            Stake your SOL, mint stSOL, and earn yield instantly while retaining liquidity across DeFi.
          </p>
        </motion.div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <ProtocolStatsBar />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div 
          className="lg:col-span-5 w-full flex justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {connected ? (
            <StakingPanel />
          ) : (
            <div className="w-full max-w-md p-12 text-center border border-border/40 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8" />
              </div>
              <p className="text-muted-foreground text-sm">Connect your Solana wallet to start staking</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="lg:col-span-7 w-full space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {connected && <UnstakeTicketList />}
          
          <div className="p-6 border border-border/40 rounded-3xl bg-gradient-to-b from-black/0 to-accent/10">
             <h3 className="font-semibold mb-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Program Status: Operational
             </h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               The Stakely liquidity model processes unstaking claims in batches. If the reserve buffer is sufficient, your claims are fulfilled instantly upon processing. Otherwise, the protocol delegates unbinding from validator nodes at the next epoch boundary.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
