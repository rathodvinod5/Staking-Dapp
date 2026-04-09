import { useQuery } from "@tanstack/react-query";
import { useProgram } from "@/lib/solana/ProgramProvider";

// Mock data representing the future network request response.
const ACTIVE_POOLS_MOCK = [
  {
    id: "stakely-core-1",
    name: "Stakely Core Pool 1",
    description:
      "The official Stakely liquidity pool. Stake SOL to receive stSOL instantly with competitive yields.",
    status: "Active",
    apy: "~7.2%",
    exchangeRate: "1 : 0.98",
    fee: "0% Deposit / 5% Reward",
    strategy: "Algorithmic Delegation",
  },
  {
    id: "stakely-core-2",
    name: "Stakely Core Pool 2",
    description:
      "A secondary Stakely liquidity pool optimized for specific validator sets.",
    status: "Active",
    apy: "~7.4%",
    exchangeRate: "1 : 0.97",
    fee: "0% Deposit / 4% Reward",
    strategy: "High Yield Delegation",
  },
  {
    id: "stakely-core-3",
    name: "Stakely Core Pool 3",
    description:
      "Beta testing pool for emerging validators and new algorithmic strategies.",
    status: "Active",
    apy: "~7.6%",
    exchangeRate: "1 : 0.96",
    fee: "0% Deposit / 6% Reward",
    strategy: "Beta Delegation",
  },
  {
    id: "stakely-core-4",
    name: "Stakely Core Pool 4",
    description:
      "Enterprise-grade pool focused on maximum security and uptime validators.",
    status: "Active",
    apy: "~6.9%",
    exchangeRate: "1 : 0.99",
    fee: "0% Deposit / 2% Reward",
    strategy: "Enterprise Delegation",
  },
];

export function usePools() {
  const { readOnlyProgram } = useProgram();

  return useQuery({
    queryKey: ["pools"],
    queryFn: async () => {
      if (!readOnlyProgram) return ACTIVE_POOLS_MOCK;

      try {
        const onChainPools = await readOnlyProgram.account.pool.all();
        
        if (onChainPools.length > 0) {
          return onChainPools.map((p, index) => ({
            id: p.publicKey.toBase58(),
            pubkey: p.publicKey,
            name: `Stakely Pool ${index + 1}`,
            description: "On-chain loaded liquidity pool.",
            status: "Active",
            apy: "~7.2%",
            exchangeRate: "1 : 0.98",
            fee: "0% Deposit / 5% Reward",
            strategy: "Algorithmic Delegation",
            ...p.account, // attach raw account data if needed
          }));
        }
      } catch (err) {
        console.error("Failed to fetch pools from chain:", err);
      }

      // Simulate network delay for fallback
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return ACTIVE_POOLS_MOCK;
    },
  });
}

export function usePool(id: string) {
  const { data: pools, isLoading } = usePools();

  return {
    data: pools?.find((pool) => pool.id === id),
    isLoading,
  };
}
