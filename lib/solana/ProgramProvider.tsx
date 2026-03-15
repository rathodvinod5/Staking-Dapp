"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { IDL, StakingProgram } from "./idl";
import { Keypair } from "@solana/web3.js";

type ProgramContextState = {
  connection: any;
  readOnlyProvider: AnchorProvider | null;
  writeProvider: AnchorProvider | null;
  program: Program<StakingProgram> | null;
  readOnlyProgram: Program<StakingProgram> | null;
};

const ProgramContext = createContext<ProgramContextState>({
  connection: null,
  readOnlyProvider: null,
  writeProvider: null,
  program: null,
  readOnlyProgram: null,
});

// A dummy wallet is needed for the read-only provider
const dummyKeypair = Keypair.generate();
const dummyWallet = {
  publicKey: dummyKeypair.publicKey,
  signTransaction: async (tx: any) => tx,
  signAllTransactions: async (txs: any[]) => txs,
};

export function ProgramProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const { readOnlyProvider, writeProvider, program, readOnlyProgram } =
    useMemo(() => {
      // Read-only provider (no wallet)
      const readOnlyProvider = new AnchorProvider(connection, dummyWallet, {
        commitment: "confirmed",
        preflightCommitment: "processed",
      });

      const readOnlyProgram = new Program<StakingProgram>(
        IDL as Idl as StakingProgram,
        readOnlyProvider
      );

      // Write provider (requires wallet)
      if (wallet) {
        const writeProvider = new AnchorProvider(connection, wallet, {
          commitment: "confirmed",
          preflightCommitment: "processed",
        });
        const program = new Program<StakingProgram>(
          IDL as Idl as StakingProgram,
          writeProvider
        );

        return { readOnlyProvider, writeProvider, program, readOnlyProgram };
      }

      return {
        readOnlyProvider,
        readOnlyProgram,
        writeProvider: null,
        program: null,
      };
    }, [connection, wallet]);

  return (
    <ProgramContext.Provider
      value={{
        connection,
        readOnlyProvider,
        writeProvider,
        program,
        readOnlyProgram,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  return useContext(ProgramContext);
}
