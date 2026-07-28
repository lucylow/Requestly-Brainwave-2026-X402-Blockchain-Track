import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useAlgorandWallet } from "@/_core/context/AlgorandWalletContext";

export type ActivityLevel = "info" | "success" | "warning" | "error";

export interface ActivityEntry {
  id: string;
  at: number;
  message: string;
  level: ActivityLevel;
}

export type AlgorandAgentContextValue = any & {
  activities: ActivityEntry[];
  pushActivity: (message: string, level?: ActivityLevel) => void;
  clearActivities: () => void;
};

const AlgorandAgentContext = createContext<AlgorandAgentContextValue | null>(null);

export function AlgorandAgentProvider({ children }: { children: React.ReactNode }) {
  const wallet = useAlgorandWallet();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const prevStatus = useRef(wallet.status);

  const pushActivity = useCallback((message: string, level: ActivityLevel = "info") => {
    setActivities((prev) =>
      [{ id: nanoid(), at: Date.now(), message, level }, ...prev].slice(0, 80)
    );
  }, []);

  const clearActivities = useCallback(() => setActivities([]), []);

  const value = useMemo(
    (): AlgorandAgentContextValue => ({
      ...wallet,
      activities,
      pushActivity,
      clearActivities,
    }),
    [wallet, activities, pushActivity, clearActivities]
  );

  useEffect(() => {
    if (prevStatus.current === wallet.status) return;
    if (wallet.status === "connected") {
      pushActivity("Algorand wallet connected.", "success");
    } else if (wallet.status === "disconnected") {
      pushActivity("Algorand wallet disconnected.", "warning");
    } else if (wallet.status === "error" && wallet.error) {
      pushActivity(wallet.error, "error");
    }
    prevStatus.current = wallet.status;
  }, [wallet.status, wallet.error, pushActivity]);

  return <AlgorandAgentContext.Provider value={value}>{children}</AlgorandAgentContext.Provider>;
}

export function useAlgorandAgent(): AlgorandAgentContextValue {
  const ctx = useContext(AlgorandAgentContext);
  if (!ctx) {
    throw new Error("useAlgorandAgent must be used within AlgorandAgentProvider");
  }
  return ctx;
}

export function useAlgorandAgentOptional(): AlgorandAgentContextValue | null {
  return useContext(AlgorandAgentContext);
}

// Keep aliases for compatibility during migration
export const AlgorandAgentProvider = AlgorandAgentProvider;
export const useAlgorandAgent = useAlgorandAgent;
export const useAlgorandAgentOptional = useAlgorandAgentOptional;
