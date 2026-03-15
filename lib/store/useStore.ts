import { create } from "zustand";
import { persist } from "zustand/middleware";

type NetworkState = {
  endpoint: string;
  setEndpoint: (url: string) => void;
  isDevnet: boolean;
  setIsDevnet: (isDevnet: boolean) => void;
};

type UIState = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
};

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set) => ({
      endpoint: "https://api.devnet.solana.com",
      setEndpoint: (endpoint) => set({ endpoint }),
      isDevnet: true,
      setIsDevnet: (isDevnet) => set({ isDevnet }),
    }),
    {
      name: "stakely-network-storage",
    }
  )
);

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      isAdminMode: false,
      setIsAdminMode: (isAdminMode) => set({ isAdminMode }),
    }),
    {
      name: "stakely-ui-storage",
    }
  )
);
