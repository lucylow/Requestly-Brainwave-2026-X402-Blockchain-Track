/** Algorand blockchain interpretation logic for the UI. */
export function interpretAlgorandAccountPanel(opts: {
  account: any | null;
  network: string;
  transactions: any[];
  operations: any[];
  txsError: string | null;
  opsError: string | null;
}): string[] {
  const lines: string[] = [];
  lines.push(`Network: Algorand ${opts.network === "mainnet" ? "Mainnet" : "Testnet"}`);
  
  if (!opts.account) {
    lines.push("Status: Account data not loaded or address unfunded.");
    return lines;
  }

  lines.push(`Address: ${opts.account.address}`);
  lines.push(`Balance: ${opts.account.amount} ALGO`);

  if (opts.transactions.length > 0) {
    lines.push(`Activity: ${opts.transactions.length} recent transactions found.`);
  } else if (opts.txsError) {
    lines.push(`Activity: Error loading transactions (${opts.txsError})`);
  } else {
    lines.push("Activity: No recent transactions found in the current window.");
  }

  return lines;
}

// Keep alias for compatibility during migration
export const interpretAlgorandAccountPanel = interpretAlgorandAccountPanel;
