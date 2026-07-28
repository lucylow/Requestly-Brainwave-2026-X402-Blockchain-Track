import type { AgentToolRoute } from "@shared/appConnectionModel";

const BLOCKCHAIN_RE =
  /\b(stellar|horizon|ledger|testnet|mainnet|account|public\s*key|wallet|freighter|transaction|tx\b|operation|sequence|balance|xlm|soroban|trustline|asset)\b/i;

const SEARCH_RE =
  /\b(search|find|look\s*up|documentation|docs|news|latest|what\s+is|how\s+to|guide|tutorial|protocol|compare|reference)\b/i;

const PAYMENT_RE =
  /\b(x402|http\s*402|pay\s+per|paid\s+(access|search|query|tool|api)|micropayment|authorize\s+payment|payment\s+required|soroban\s+auth|agentic\s+payment|premium\s+(search|query)|unlock\s+(this|the)\s+(tool|request))\b/i;

const WALLET_RE =
  /\b(my\s+balance|my\s+account|my\s+wallet|connect\s+wallet|sign\s+with|my\s+public\s*key|my\s+sequence)\b/i;

export type IntentClassification = {
  route: AgentToolRoute;
  needsWallet: boolean;
  reasons: string[];
};

export function classifyAgentPrompt(text: string, walletConnected: boolean): IntentClassification {
  const t = text.trim();
  const reasons: string[] = [];
  let needsWallet = WALLET_RE.test(t);

  const wantsPayment = PAYMENT_RE.test(t);
  const bc = BLOCKCHAIN_RE.test(t);
  const sr = SEARCH_RE.test(t);

  let route: AgentToolRoute = "general";

  if (wantsPayment) {
    route = "payment";
    reasons.push("Payment / x402-style access implied — run authorization before tools");
    needsWallet = true;
  } else if (bc && sr) {
    route = "mixed";
    reasons.push("Mentions on-chain context and information discovery");
  } else if (bc) {
    route = "blockchain_lookup";
    reasons.push("Looks like a Algorand / on-chain question");
  } else if (sr) {
    route = "search";
    reasons.push("Looks like a docs or web-style question");
  } else {
    reasons.push("General assistant path");
  }

  if (needsWallet && !walletConnected) {
    reasons.push("First-person wallet context requested — connect Pera Wallet for live data");
  }

  if (route === "blockchain_lookup" || route === "mixed") {
    needsWallet = needsWallet || WALLET_RE.test(t);
  }

  if (route === "general" && needsWallet) {
    route = "wallet_check";
  }

  return { route, needsWallet, reasons };
}

/** Compact plan timeline (UI steps 1–5). */
export function buildPlanTimelineSteps(): string[] {
  return [
    "Understand request",
    "Choose tool",
    "Fetch data",
    "Verify output",
    "Return result",
  ];
}

/** Short narrative lines shown above the timeline. */
export function buildPlanNarrative(
  route: AgentToolRoute,
  walletConnected: boolean,
  needsWallet: boolean,
  networkLabel?: string
): string[] {
  const lines: string[] = [];
  const net = networkLabel ?? "your selected network";

  switch (route) {
    case "search":
      lines.push("I will search curated sources for the latest Algorand information");
      break;
    case "blockchain_lookup":
      lines.push("I will inspect Algorand / on-chain context with the blockchain_lookup tool (Indexer-style facts in demo mode)");
      break;
    case "mixed":
      lines.push("I will combine search with a blockchain lookup where it helps");
      break;
    case "wallet_check":
      lines.push("I will align with your wallet and account context when possible");
      break;
    case "payment":
      lines.push("I will show an x402-style payment challenge, then unlock the agent tools for this turn");
      break;
    default:
      lines.push("I will answer directly and use tools only if the question needs them");
  }
  if (needsWallet && !walletConnected) {
    lines.push(
      "I need a connected Pera Wallet wallet to inspect live balances, sequence, and personalized Indexer context."
    );
  } else if (walletConnected) {
    lines.push(`Your public key is available to the model for this turn on ${net}.`);
  }
  return lines;
}

/**
 * Visible blockchain reasoning — maps to the five-step flow requested in product copy.
 */
export function buildBlockchainReasoningSteps(
  route: AgentToolRoute,
  walletConnected: boolean,
  needsWallet: boolean,
  networkLabel?: string
): string[] {
  const net = networkLabel ?? "Testnet/Mainnet";
  const base = [
    "Understand the request and whether it needs docs, ledger context, or both.",
    walletConnected
      ? "Check wallet context — your address and network are passed to the agent for this turn."
      : needsWallet
        ? "Wallet context missing — I’ll still answer, but I’ll say when Pera Wallet is required for live Algorand data."
        : "Wallet optional for this prompt — I’ll use tools only if the question needs them.",
  ];

  if (route === "search") {
    return [
      ...base,
      "Select the search tool (curated sources; may be mock until MCP is live).",
      "Fetch snippets and rank them for the reply.",
      "Summarize what the sources support and what to verify on-chain.",
    ];
  }

  if (route === "blockchain_lookup" || route === "mixed") {
    return [
      ...base,
      `Select blockchain_lookup — Algorand-focused tool (demo structured output). Network in UI: ${net}.`,
      "Fetch Algorand-oriented evidence the model can quote.",
      "Summarize findings and point you to Indexer / dashboard for balances, txs, and operations.",
    ];
  }

  if (route === "wallet_check") {
    return [
      ...base,
      "Prefer wallet-aware phrasing and safe defaults without guessing your keys.",
      "If needed, describe how to refresh Indexer data in the dashboard.",
      "Return guidance you can act on in Pera Wallet.",
    ];
  }

  return [
    ...base,
    "Choose the lightest tool path (often none).",
    "Double-check claims that depend on live ledger state.",
    "Respond with clear next steps.",
  ];
}
