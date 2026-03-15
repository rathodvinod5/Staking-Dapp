"use client";

import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/lib/solana/ProgramProvider";

export function useProtocolStats() {
  const { program } = useProgram();

  // Mocking global stats
  return useQuery({
    queryKey: ["protocol-stats"],
    queryFn: async () => {
      // simulate network delay
      await new Promise((res) => setTimeout(res, 800));

      return {
        totalStaked: 145000.5 * 1e9, // mock lamports
        reserve: 2400.0 * 1e9,
        apy: 7.45,
        totalStakers: 1245,
        pendingUnstakes: 1540.3 * 1e9,
      };
    },
    // Only enabled if we have internet basically, program can be null if offline
    enabled: true,
  });
}

export function useUserStats() {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["user-stats", publicKey?.toBase58()],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 600));

      if (!publicKey) return null;

      return {
        stakedBalance: 145.2 * 1e9, // mock LST
        solBalance: 12.4 * 1e9, // mock SOL balance
      };
    },
    enabled: !!publicKey,
  });
}
