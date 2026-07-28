import type { PaymentAsset, PaymentMode, PaymentPolicy, AlgorandPaymentNetwork } from "@shared/paymentTypes";
import { ENV } from "../env";

export const DEMO_PLACEHOLDER_PAYEE = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY57VWW6A";

export function defaultPaymentPolicy(payee: string): PaymentPolicy {
  return {
    serviceId: "agent.tools",
    defaultMode: "per_request",
    perRequestAmount: 0.001,
    asset: { id: ENV.usdcAssetId, code: "USDC" },
    payee,
    sessionMinCap: 0.05,
  };
}

export function assetDisplay(a: PaymentAsset): string {
  return `ASA:${a.id} (${a.code})`;
}

export function describeMode(mode: PaymentMode): string {
  switch (mode) {
    case "per_request":
      return "Per-request (x402-style HTTP-native)";
    case "prepaid_credits":
      return "Prepaid credits";
    case "session_streaming":
      return "Session / streaming (MPP-style channel intent)";
    case "demo_free":
      return "Demo — free";
    default:
      return mode;
  }
}

export function algorandInstructions(
  network: AlgorandPaymentNetwork,
  authEntryRequired: boolean
): string {
  const net = network === "mainnet" ? "Algorand Mainnet" : "Algorand Testnet";
  if (authEntryRequired) {
    return `${net}: approve Algorand transaction via your wallet.`;
  }
  return `${net}: connect an Algorand wallet for full x402 authorization when enabled.`;
}
