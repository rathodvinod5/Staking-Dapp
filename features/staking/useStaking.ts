"use client";

import { useState } from "react";
import { useProgram } from "@/lib/solana/ProgramProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import { parseAnchorError } from "@/lib/solana/utils";

export function useStaking() {
  const { program } = useProgram();
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  const deposit = async (amountLamports: number) => {
    if (!program || !publicKey) {
      window.alert("Please connect your wallet first.");
      return;
    }

    try {
      setIsStaking(true);
      // Mock logic: in reality we would fetch the PDA for the pool
      // const poolPda = PublicKey.findProgramAddressSync([...], program.programId)[0];
      
      // toast.loading("Simulating deposit...", { id: "deposit" });

      // Simulate a contract call explicitly for the frontend demo
      // Due to dummy IDL we'll just mock a 2 second delay as a successful tx
      await new Promise((res) => setTimeout(res, 2000));
      
      window.alert(`Successfully deposited ${(amountLamports / 1e9).toFixed(2)} SOL`);
      
      // Invalidate queries to refresh dashboard data
      queryClient.invalidateQueries({ queryKey: ["protocol-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats", publicKey.toBase58()] });
      
    } catch (err: any) {
      console.error(err);
      window.alert("Staking Failed: " + parseAnchorError(err));
    } finally {
      setIsStaking(false);
    }
  };

  const unstake = async (amountLamports: number) => {
    if (!program || !publicKey) {
      window.alert("Please connect your wallet first.");
      return;
    }

    try {
      setIsUnstaking(true);
      
      // toast.loading("Creating Unstake Ticket...", { id: "unstake" }); // Removed as per instruction to replace toast with alert

      // Mock contract unstake ticket creation
      await new Promise((res) => setTimeout(res, 2000));
      
      window.alert("Unstake ticket created successfully! You will receive SOL once the admin processes the queue.");
      
      queryClient.invalidateQueries({ queryKey: ["protocol-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats", publicKey.toBase58()] });
      queryClient.invalidateQueries({ queryKey: ["user-tickets", publicKey.toBase58()] });
      
    } catch (err: any) {
      console.error(err);
      window.alert("Unstaking Failed: " + parseAnchorError(err));
    } finally {
      setIsUnstaking(false);
    }
  };

  return {
    deposit,
    unstake,
    isStaking,
    isUnstaking,
  };
}
