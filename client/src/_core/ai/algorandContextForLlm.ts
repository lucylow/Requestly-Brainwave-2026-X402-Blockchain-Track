/** Compact, honest context block for the LLM — mirrors what the user sees in the wallet card. */
export function buildAlgorandContextForLlm(w: any): string {
  if (w.algorandWalletDetected === false) {
    return "Algorand wallet extension (e.g., Pera) not detected in this browser. User cannot sign in-app until they install a wallet and reload.";
  }
  if (!w.isConnected || !w.publicKey) {
    return "No Algorand wallet connected. Do not assume balances or transactions for the user; invite them to connect for live Algorand-backed answers.";
  }
  if (w.refreshError || !w.account) {
    return `Wallet reports connected with address ${w.publicKey.slice(0, 10)}… but Algorand account data is missing or errored (${w.refreshError ?? "unknown"}). Ask the user to tap Refresh account in the wallet card before claiming live balances.`;
  }

  const staleMs = w.lastRefreshedAt ? Date.now() - new Date(w.lastRefreshedAt).getTime() : 0;
  const stale = staleMs > 8 * 60_000;
  const net = w.networkLabel;

  if (stale) {
    return `Wallet connected on ${net}. Last successful Algorand refresh was at ${w.lastRefreshedAt}. Data may be stale — suggest Refresh account if the user needs current balance. Snapshot: balance ${w.balance} ALGO.`;
  }

  return `Wallet connected on ${net}. Algorand snapshot is fresh enough for general answers (user can still refresh for critical operations). Balance ${w.balance} ALGO. isWalletReady=${w.isWalletReady}.`;
}

// Keep alias for compatibility during migration
export const buildAlgorandContextForLlm = buildAlgorandContextForLlm;
