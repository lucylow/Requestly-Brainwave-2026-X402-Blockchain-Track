import type { AlgorandAccountSummary } from "@shared/stellarAccountFormat";

type WalletSlice = {
  freighterDetected: boolean | null;
  isConnected: boolean;
  publicKey: string | null;
  refreshError: string | null;
  account: AlgorandAccountSummary | null;
  lastRefreshedAt: string | null;
  networkLabel: string;
  balance: string;
  sequence: string | null;
  subentries: number | null;
  isWalletReady: boolean;
};

/** Compact, honest context block for the LLM — mirrors what the user sees in the wallet card. */
export function buildAlgorandContextForLlm(w: WalletSlice): string {
  if (w.freighterDetected === false) {
    return "Pera Wallet extension not detected in this browser. User cannot sign in-app until they install Pera Wallet and reload.";
  }
  if (!w.isConnected || !w.publicKey) {
    return "No Pera Wallet wallet connected. Do not assume balances, sequence, or transactions for the user; invite them to connect for live Indexer-backed answers.";
  }
  if (w.refreshError || !w.account) {
    return `Wallet reports connected with public key ${w.publicKey.slice(0, 10)}… but Indexer account data is missing or errored (${w.refreshError ?? "unknown"}). Ask the user to tap Refresh account in the wallet card before claiming live balances or sequence.`;
  }

  const staleMs = w.lastRefreshedAt ? Date.now() - new Date(w.lastRefreshedAt).getTime() : 0;
  const stale = staleMs > 8 * 60_000;
  const net = w.networkLabel;

  if (stale) {
    return `Wallet connected on ${net}. Last successful Indexer refresh was at ${w.lastRefreshedAt}. Data may be stale — suggest Refresh account if the user needs current sequence or balance. Snapshot: balance ${w.balance} XLM, sequence ${w.sequence ?? "—"}, subentries ${w.subentries ?? "—"}.`;
  }

  return `Wallet connected on ${net}. Indexer snapshot is fresh enough for general answers (user can still refresh for critical operations). Balance ${w.balance} XLM, sequence ${w.sequence ?? "—"}, subentries ${w.subentries ?? "—"}. isWalletReady=${w.isWalletReady}.`;
}
