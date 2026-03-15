"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { StakingPanel } from "@/features/staking/StakingPanel";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function CustomConnectButton() {
  const { setVisible } = useWalletModal();
  return (
    <button
      onClick={() => setVisible(true)}
      className="bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/50 hover:border-purple-400 font-bold px-8 rounded-md h-12 inline-flex items-center justify-center transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_-3px_rgba(168,85,247,0.6)]"
    >
      Connect Wallet to Stake
    </button>
  );
}

export default function PoolDetailsPage() {
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const params = useParams();

  const poolId = params?.id || "pool";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-20 w-full max-w-5xl mx-auto pt-6">
      <div>
        <Link
          href="/pools"
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm w-fit transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pools
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-slate-200 via-slate-200 to-slate-200/40 bg-clip-text text-transparent pb-2 capitalize">
              {poolId.toString().replace("-", " ")}
            </h1>
            <p className="text-muted-foreground text-lg mt-2 font-light">
              Stake your SOL in this specific pool to mint LSTs directly.
            </p>
          </motion.div>

          <motion.div
            className="p-6 border border-border/40 rounded-3xl bg-gradient-to-b from-black/0 to-accent/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="font-semibold mb-4 text-xl">Pool Information</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center border-b border-border/20 pb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Operational
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-border/20 pb-2">
                <span className="text-muted-foreground">Estimated APY</span>
                <span className="font-mono font-medium text-green-400">
                  ~7.2%
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-border/20 pb-2">
                <span className="text-muted-foreground">
                  Validation Strategy
                </span>
                <span className="text-foreground">Algorithmic Delegation</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-foreground">0% Deposit / 5% Reward</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-[450px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {mounted && connected ? (
            <StakingPanel />
          ) : (
            <div
              className="w-full p-10 text-center border border-border/40 rounded-3xl 
              bg-black/40 backdrop-blur-md flex flex-col items-center justify-center space-y-6 
              bg-gradient-to-b from-black/0 to-accent/10 h-full min-h-[400px]"
            >
              <div className="">{mounted && <CustomConnectButton />}</div>
              <p className="text-muted-foreground text-sm">
                Connect your Solana wallet to interact with this pool.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
