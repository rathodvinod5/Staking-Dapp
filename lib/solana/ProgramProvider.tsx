"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { IDL, StakingProgram } from "./idl";

// Define the context state
interface ProgramContextState {
  program: Program<StakingProgram> | null;
  provider: AnchorProvider | null;
}

const ProgramContext = createContext<ProgramContextState>({
  program: null,
  provider: null,
});

// Update with your actual deployed program ID
const PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

export function ProgramProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  const { program, provider } = useMemo(() => {
    // We need the wallet to have an implementation of signTransaction, signAllTransactions, and publicKey
    // AnchorProvider requires these, but wallet-adapter might not always have them ready.
    if (!wallet || !wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
      return { program: null, provider: null };
    }

    const anchorWallet = {
      publicKey: wallet.publicKey,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
    };

    const provider = new AnchorProvider(connection, anchorWallet, {
        preflightCommitment: "processed",
        commitment: "confirmed",
    });

    setProvider(provider);

    const program = new Program<StakingProgram>(IDL as StakingProgram, provider);

    return { program, provider };
  }, [connection, wallet]);

  return (
    <ProgramContext.Provider value={{ program, provider }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  return useContext(ProgramContext);
}
