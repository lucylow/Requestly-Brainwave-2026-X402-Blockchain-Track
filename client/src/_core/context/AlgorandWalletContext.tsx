import { createContext, useContext, type ReactNode } from "react";
import { useAlgorandWalletState } from "@/_core/hooks/useAlgorandWallet";

const AlgorandWalletContext = createContext<any | null>(null);

export function AlgorandWalletProvider({ children }: { children: ReactNode }) {
  const value = useAlgorandWalletState();
  return (
    <AlgorandWalletContext.Provider value={value}>{children}</AlgorandWalletContext.Provider>
  );
}

export function useAlgorandWallet(): any {
  const ctx = useContext(AlgorandWalletContext);
  if (!ctx) {
    throw new Error("useAlgorandWallet must be used within AlgorandWalletProvider");
  }
  return ctx;
}

// Keep aliases for compatibility during migration
export const AlgorandWalletProvider = AlgorandWalletProvider;
export const useAlgorandWallet = useAlgorandWallet;
