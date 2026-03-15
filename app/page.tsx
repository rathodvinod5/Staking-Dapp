"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import { StakingPanel } from "@/features/staking/StakingPanel";
import { UnstakeTicketList } from "@/features/unstake/UnstakeTicketList";
import { ProtocolStatsBar } from "@/features/dashboard/ProtocolStatsBar";
import { motion } from "framer-motion";

function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  return (
    <button
      onClick={() => setVisible(true)}
      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-8 rounded-md h-12 inline-flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)]"
    >
      Select Wallet
    </button>
  );
}

export default function Dashboard() {
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20 w-full max-w-5xl mx-auto">
      <section className="text-center space-y-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-slate-200 via-slate-200 to-slate-200/40 bg-clip-text text-transparent pb-2">
            Liquid Staking <br /> on Solana
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mt-4 font-light">
            Stake your SOL, mint stSOL, and earn yield instantly while retaining
            liquidity across DeFi.
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
          <div
            className="w-full p-10 text-left border border-border/40 rounded-3xl 
              bg-black/40 backdrop-blur-md flex flex-col space-y-6 
              bg-gradient-to-br from-primary/10 via-black/40 to-accent/10"
          >
            <h2 className="text-3xl font-bold text-slate-200 tracking-tight">
              Start Staking Today
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Join the decentralized network. Secure the protocol and earn yield
              on your SOL, instantly accessing liquidity across the ecosystem.
            </p>

            <div className="pt-4 flex flex-col gap-4">
              <a
                href="/pools"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-md h-12 inline-flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)] w-full"
              >
                View Staking Pools
              </a>
              {mounted && connected && (
                <a
                  href="/portfolio"
                  className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold px-8 rounded-md h-12 inline-flex items-center justify-center transition-all w-full"
                >
                  My Portfolio
                </a>
              )}
              {mounted && !connected && (
                <div className="w-full mt-2">
                  <CustomConnectButton />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7 w-full space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="p-8 border border-border/40 rounded-3xl bg-black/20 flex flex-col gap-4 h-full">
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]" />
              Network Status: Operational
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              The Stakely liquidity model processes unstaking claims in batches.
              If the reserve buffer is sufficient, your claims are fulfilled
              instantly upon processing. Otherwise, the protocol delegates
              unbinding from validator nodes at the next epoch boundary.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-border/40">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Validators
                </h4>
                <p className="text-3xl font-bold text-slate-200">124</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Epoch Progress
                </h4>
                <p className="text-3xl font-bold text-slate-200">42%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
