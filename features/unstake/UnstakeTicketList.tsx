"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { formatLamports, shortenAddress } from "@/lib/solana/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

type Ticket = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "completed";
  createdAt: number;
};

export function UnstakeTicketList() {
  const { publicKey } = useWallet();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["user-tickets", publicKey?.toBase58()],
    queryFn: async (): Promise<Ticket[]> => {
      // Mock fetch
      await new Promise((res) => setTimeout(res, 800));
      if (!publicKey) return [];

      return [
        {
          id: "tkt123456789abc",
          amount: 15.5 * 1e9,
          status: "pending",
          createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        },
        {
          id: "tkt987654321xyz",
          amount: 2.1 * 1e9,
          status: "completed",
          createdAt: Date.now() - 1000 * 60 * 60 * 48, // 48 hours ago
        },
      ];
    },
    enabled: !!publicKey,
  });

  if (!publicKey) return null;

  return (
    <div className="rounded-xl border border-border/80 dark:bg-black/40 bg-white/60 backdrop-blur-xl text-card-foreground shadow-xl dark:shadow-none">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Your Unstake Tickets
        </h3>
        <p className="text-sm text-muted-foreground">
          Withdraw claims waiting for admin processing.
        </p>
      </div>
      <div className="p-6 pt-0">
        {isLoading ? (
          <div className="flex justify-center p-8 text-muted-foreground animate-pulse">
            Loading tickets...
          </div>
        ) : tickets?.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg border-border/50">
            No active unstake tickets.
          </div>
        ) : (
          <div className="relative overflow-auto h-[250px] pr-4">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {tickets?.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30 border border-border/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-mono font-medium">
                      {formatLamports(ticket.amount)} SOL
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {shortenAddress(ticket.id, 6)} •{" "}
                      {formatDistanceToNow(ticket.createdAt, {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div>
                    {ticket.status === "pending" && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        In Queue
                      </div>
                    )}
                    {ticket.status === "processing" && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Processing
                      </div>
                    )}
                    {ticket.status === "completed" && (
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-500/10 text-green-500 border-green-500/20">
                        Completed
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
