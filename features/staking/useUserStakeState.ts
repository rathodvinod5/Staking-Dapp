"use client";

import { useQuery } from "@tanstack/react-query";
import { useProgram } from "@/lib/solana/ProgramProvider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

// Hardcoded program IDs
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

function getAssociatedTokenAddressSync(mint: PublicKey, owner: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  )[0];
}

export function useUserStakeState(poolPubkey?: string, lstMintPubkey?: string) {
  const { readOnlyProgram } = useProgram();
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const userAtaQuery = useQuery({
    queryKey: ["user_ata", publicKey?.toBase58(), lstMintPubkey],
    queryFn: async () => {
      if (!publicKey || !lstMintPubkey) return null;
      const mint = new PublicKey(lstMintPubkey);
      const ataAccount = getAssociatedTokenAddressSync(mint, publicKey);
      
      try {
        const balance = await connection.getTokenAccountBalance(ataAccount);
        return {
          address: ataAccount.toBase58(),
          balance: balance.value.uiAmount,
          balanceRaw: balance.value.amount,
        };
      } catch (err) {
        // ATA likely doesn't exist yet
        return {
          address: ataAccount.toBase58(),
          balance: 0,
          balanceRaw: "0",
        };
      }
    },
    enabled: !!publicKey && !!lstMintPubkey && !!connection,
  });

  const stakeEntryQuery = useQuery({
    queryKey: ["stake_entry", poolPubkey, publicKey?.toBase58()],
    queryFn: async () => {
      if (!readOnlyProgram || !publicKey || !poolPubkey) return null;
      
      const poolPk = new PublicKey(poolPubkey);
      const [stakeEntryPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("stake-entry"),
          poolPk.toBuffer(),
          publicKey.toBuffer(),
        ],
        readOnlyProgram.programId
      );

      try {
        const account = await readOnlyProgram.account.stakeEntry.fetch(stakeEntryPda);
        return {
          publicKey: stakeEntryPda,
          account
        };
      } catch (e) {
        // Account may not be initialized yet
        return null;
      }
    },
    enabled: !!readOnlyProgram && !!publicKey && !!poolPubkey,
  });

  return {
    userAta: userAtaQuery.data,
    isUserAtaLoading: userAtaQuery.isLoading,
    stakeEntry: stakeEntryQuery.data,
    isStakeEntryLoading: stakeEntryQuery.isLoading,
  };
}
