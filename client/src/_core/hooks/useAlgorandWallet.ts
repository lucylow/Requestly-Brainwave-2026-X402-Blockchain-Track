/**
 * Wallet lifecycle (explicit UI states):
 * - idle: Wallet detected, user has not connected this session.
 * - detecting: First paint — probing extension APIs.
 * - connecting: User clicked connect.
 * - connected: Address known.
 * - disconnected: No extension, or user disconnected.
 * - error: User-facing connect failure.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import algosdk from "algosdk";
import type { AlgorandPaymentNetwork as AlgorandNetworkMode } from "@shared/paymentTypes";
import type { WalletStatus } from "@shared/appConnectionModel";

const STORAGE_CONNECTED = "algorand_wallet_connected";
const STORAGE_NETWORK = "algorand_network_mode";

function loadNetwork(): AlgorandNetworkMode {
  if (typeof window === "undefined") return "testnet";
  const v = window.localStorage.getItem(STORAGE_NETWORK);
  return v === "mainnet" ? "mainnet" : "testnet";
}

export function useAlgorandWalletState() {
  const [status, setStatus] = useState<WalletStatus>("idle");
  const [network, setNetworkState] = useState<AlgorandNetworkMode>(loadNetwork);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);
  const [isAccountSyncing, setIsAccountSyncing] = useState(false);
  const [algorandWalletDetected, setAlgorandWalletDetected] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for Algorand wallet (e.g., Pera, MyAlgo, etc.)
    // For now, we'll just mock the detection
    setAlgorandWalletDetected(true);
  }, []);

  const cancelledRef = useRef(false);
  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const refreshAccount = useCallback(async () => {
    if (!publicKey) return;
    setIsAccountSyncing(true);
    try {
      // Mock balance fetch for Algorand
      setBalance("1250.00");
    } catch (err) {
      console.error("[useAlgorandWallet] refreshAccount", err);
    } finally {
      setIsAccountSyncing(false);
    }
  }, [publicKey]);

  const connectWallet = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    try {
      // Mock Pera Wallet / Algorand connection
      const mockAddress = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY57VWW6A";
      setPublicKey(mockAddress);
      window.localStorage.setItem(STORAGE_CONNECTED, "true");
      setStatus("connected");
      await refreshAccount();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }, [refreshAccount]);

  const disconnectWallet = useCallback(() => {
    window.localStorage.removeItem(STORAGE_CONNECTED);
    setPublicKey(null);
    setStatus("disconnected");
  }, []);

  useEffect(() => {
    const wasConnected = window.localStorage.getItem(STORAGE_CONNECTED) === "true";
    if (wasConnected) {
      void connectWallet();
    }
  }, [connectWallet]);

  return {
    status,
    lifecycle: status,
    isConnecting: status === "connecting",
    isConnected: status === "connected",
    publicKey,
    balance,
    network,
    networkLabel: network === "mainnet" ? "Mainnet" : "Testnet",
    error,
    connectWallet,
    disconnectWallet,
    refreshAccount,
    isAccountSyncing,
    isWalletReady: status === "connected",
    authEntrySigningAvailable: true,
    providerName: "Pera Wallet",
    algorandWalletDetected,
    setNetwork: setNetworkState,
    account: publicKey ? { address: publicKey, amount: parseFloat(balance) } : null,
    transactions: [],
    isFetchingTransactions: false,
    refreshIndexerSidecar: refreshAccount,
    blockchainSurface: {
      status,
      address: publicKey,
      network,
    }
  };
}
