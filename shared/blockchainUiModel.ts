/**
 * Unified vocabulary for wallet + Indexer + blockchain lookup UI.
 * Map wallet hook fields and optional chat lookup flags into one surface state.
 */

import type { WalletStatus } from "./appConnectionModel";



/** Aggregate UI state across wallet, Indexer fetches, and optional agent lookup */
export type BlockchainSurfaceState =
  | "idle"
  | "wallet_detecting"
  | "wallet_connected"
  | "wallet_disconnected"
  | "fetching_account"
  | "fetching_transactions"
  | "fetching_operations"
  | "fetching_network"
  | "blockchain_lookup_running"
  | "blockchain_lookup_completed"
  | "blockchain_lookup_failed"
  | "waiting_for_wallet"
  | "waiting_for_refresh";

/** Documented event vocabulary (for logs / future analytics) */
export type BlockchainUiEventType =
  | "wallet_connected"
  | "wallet_disconnected"
  | "account_refreshed"
  | "transactions_loaded"
  | "operations_loaded"
  | "network_info_loaded"
  | "blockchain_lookup_started"
  | "blockchain_lookup_completed"
  | "blockchain_lookup_failed";

export type DeriveBlockchainSurfaceInput = {
  walletStatus: WalletStatus;
  algorandWalletDetected: boolean | null;
  publicKey: string | null;
  isAccountSyncing: boolean;
  account: any | null;
  refreshError: string | null;
  isFetchingTransactions: boolean;
  isFetchingOperations: boolean;
  isFetchingNetwork: boolean;
  txsError: string | null;
  opsError: string | null;
  networkError: string | null;
  /** From agent chat: blockchain tool in flight */
  agentBlockchainLookup?: "idle" | "running" | "completed" | "failed";
  /** Chat / dashboard: user asked for on-chain context without a key */
  needsWalletForLiveIndexer?: boolean;
};

/**
 * Primary surface state for headers and status strips.
 * When multiple conditions apply, the most user-visible wins (lookup > fetch > wallet).
 */
export function deriveBlockchainSurfaceState(i: DeriveBlockchainSurfaceInput): BlockchainSurfaceState {
  if (i.agentBlockchainLookup === "running") return "blockchain_lookup_running";
  if (i.agentBlockchainLookup === "completed") return "blockchain_lookup_completed";
  if (i.agentBlockchainLookup === "failed") return "blockchain_lookup_failed";

  if (i.needsWalletForLiveIndexer && !i.publicKey) return "waiting_for_wallet";

  if (i.walletStatus === "detecting") return "wallet_detecting";
  if (i.algorandWalletDetected === false && i.walletStatus === "disconnected") return "wallet_disconnected";
  if (i.publicKey && i.refreshError && !i.account) return "waiting_for_refresh";
  if (
    i.publicKey &&
    !i.account &&
    !i.isAccountSyncing &&
    !i.refreshError &&
    i.walletStatus === "connected"
  ) {
    return "waiting_for_refresh";
  }

  if (i.walletStatus === "connected" && i.publicKey && !i.algorandWalletDetected) {
    return "wallet_connected";
  }
  if (i.walletStatus === "connected" && i.publicKey) {
    if (i.isAccountSyncing) return "fetching_account";
    if (i.isFetchingTransactions) return "fetching_transactions";
    if (i.isFetchingOperations) return "fetching_operations";
    if (i.isFetchingNetwork) return "fetching_network";
    return "wallet_connected";
  }

  if (i.walletStatus === "idle" && i.algorandWalletDetected) return "idle";
  if (i.walletStatus === "disconnected" || i.algorandWalletDetected === false) return "wallet_disconnected";

  return "idle";
}

export function blockchainSurfaceTitle(
  state: BlockchainSurfaceState,
  network: string
): string {
  const net = network === "mainnet" ? "Mainnet" : "Testnet";
  switch (state) {
    case "wallet_detecting":
      return "Checking for Algorand Wallet";
    case "wallet_disconnected":
      return "Wallet not available";
    case "waiting_for_wallet":
      return "Connect wallet for Algorand data";
    case "waiting_for_refresh":
      return "Account data needs a refresh";
    case "fetching_account":
      return `Loading account from Algorand Network (${net})`;
    case "fetching_transactions":
      return "Fetching recent transactions from Algorand Network";
    case "fetching_operations":
      return "Fetching recent operations from Algorand Network";
    case "fetching_network":
      return "Fetching network status from Algorand Network";
    case "blockchain_lookup_running":
      return "Blockchain lookup in progress";
    case "blockchain_lookup_completed":
      return "Blockchain lookup finished";
    case "blockchain_lookup_failed":
      return "Blockchain lookup failed";
    case "wallet_connected":
      return `Wallet connected · ${net}`;
    case "idle":
    default:
      return "Ready to connect";
  }
}
