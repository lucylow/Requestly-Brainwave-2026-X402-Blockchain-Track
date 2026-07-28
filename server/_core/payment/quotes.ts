import type { PaymentChallenge, PaymentMode, PaymentQuote, AlgorandPaymentNetwork } from "@shared/paymentTypes";
import { getPaymentStore, type InMemoryPaymentStore } from "./store";
import { defaultPaymentPolicy } from "./modes";
import { algorandInstructions } from "./modes";
import { pushPaymentEvent } from "./events";
import { isPaidMode } from "./routing";
import { ENV } from "../env";

export type CreateQuoteParams = {
  serviceId: string;
  requestId: string;
  idempotencyKey: string;
  payer: string | null;
  network: AlgorandPaymentNetwork;
  mode: PaymentMode;
  amount?: number;
  payee: string;
  serviceDescription: string;
  authEntrySigningRequired: boolean;
  quoteTtlMs?: number;
  /** When mode is session_streaming, tie quote to an open channel */
  sessionId?: string;
};

export function buildPaymentQuote(
  store: InMemoryPaymentStore,
  params: CreateQuoteParams
): { challenge: PaymentChallenge; reused: boolean } {
  const policy = defaultPaymentPolicy(params.payee);
  const amount = params.amount ?? policy.perRequestAmount;
  const ttl = params.quoteTtlMs ?? 5 * 60 * 1000;
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  const existing = store.getByIdempotency(params.idempotencyKey);
  if (existing && existing.quote.status !== "expired") {
    const exp = new Date(existing.quote.expiresAt).getTime();
    if (exp > now && existing.status === "pending") {
      pushPaymentEvent("quote_created", "Reused quote for idempotent retry", {
        mode: existing.quote.mode,
        challengeId: existing.challengeId,
        payer: params.payer ?? undefined,
        meta: { idempotencyKey: params.idempotencyKey },
      });
      return {
        challenge: {
          challengeId: existing.challengeId,
          quoteId: existing.quote.id,
          quote: existing.quote,
          validUntil: existing.quote.expiresAt,
        },
        reused: true,
      };
    }
  }

  const { quoteId, challengeId, replayKey } = store.newIds();
  const expiresAt = new Date(now + ttl).toISOString();

  // Use CAIP-2 for Algorand TestNet if requested
  const network = params.network === "testnet" ? ENV.algorandTestnetCaip2 : params.network;

  const quote: PaymentQuote = {
    id: quoteId,
    mode: params.mode,
    status: isPaidMode(params.mode) ? "quote" : "none",
    amount,
    asset: policy.asset,
    payer: params.payer,
    payee: params.payee,
    serviceId: params.serviceId,
    requestId: params.requestId,
    sessionId: params.sessionId,
    network,
    expiresAt,
    createdAt: nowIso,
    updatedAt: nowIso,
    replayKey,
    idempotencyKey: params.idempotencyKey,
    serviceDescription: params.serviceDescription,
    authEntrySigningRequired: params.authEntrySigningRequired,
    instructions: algorandInstructions(network, params.authEntrySigningRequired),
  };

  const stored = {
    challengeId,
    quote,
    payerHint: params.payer,
    status: "pending" as const,
    consumedIdempotencyKey: params.idempotencyKey,
    usedReplayKey: false,
  };
  store.challenges.set(challengeId, stored);
  store.rememberIdempotency(params.idempotencyKey, challengeId);

  pushPaymentEvent("quote_created", `Quote for ${params.serviceDescription}`, {
    mode: params.mode,
    challengeId,
    payer: params.payer ?? undefined,
    meta: { amount, serviceId: params.serviceId },
  });
  pushPaymentEvent("challenge_issued", challengeId, {
    mode: params.mode,
    challengeId,
    payer: params.payer ?? undefined,
  });

  return {
    challenge: {
      challengeId,
      quoteId,
      quote,
      validUntil: expiresAt,
    },
    reused: false,
  };
}

export function createQuote(params: CreateQuoteParams): { challenge: PaymentChallenge; reused: boolean } {
  return buildPaymentQuote(getPaymentStore(), params);
}
