import { useState } from "react";
import { useAlgorandWallet } from "@/_core/context/AlgorandWalletContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, Copy, LogOut, Loader2, RefreshCw, Radio, AlertCircle, CreditCard } from "lucide-react";
import { truncateAddress } from "@shared/algorandFormat";
import { STELLAR_SEARCH_USES_MOCK } from "@shared/const";
import { blockchainSurfaceTitle } from "@shared/blockchainUiModel";
import { useReputation } from "@/_core/context/ReputationContext";
import { TierBadge, TrendGlyph } from "@/components/reputation/TrustPrimitives";
import type { SessionTrustMarker } from "@shared/reputationModel";
import { trpc } from "@/lib/trpc";

const SESSION_TRUST_LABEL: Record<SessionTrustMarker, string> = {
  new: "New",
  established: "Established",
  trusted: "Trusted",
  verified: "Verified",
  risky: "Risky",
};

export function WalletConnect() {
  const {
    status,
    isConnected,
    isAccountSyncing,
    isWalletReady,
    readinessLabel,
    publicKey,
    account,
    balance,
    network,
    providerName,
    error,
    refreshError,
    lastRefreshedAt,
    algorandWalletDetected,
    connectWallet,
    disconnectWallet,
    refreshAccount,
    setNetwork,
    blockchainSurface,
    hasPartialIndexerData,
    transactions,
    transactionsError,
    isFetchingTransactions,
    authEntrySigningAvailable,
  } = useAlgorandWallet();
  const [copied, setCopied] = useState(false);
  const { summary, sessionTrust, firstSeenAtIso, hydrated } = useReputation();

  const creditsQuery = trpc.payments.getBalance.useQuery(
    { walletAddress: publicKey ?? "" },
    { enabled: Boolean(publicKey), retry: 0 }
  );

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readyLabel = !isConnected
    ? "Not connected"
    : isAccountSyncing
      ? "Loading Algorand data…"
      : isWalletReady
        ? "Ready"
        : refreshError
          ? "Connected — refresh needed"
          : "Connected";
  const networkLabel = network === "mainnet" ? "Mainnet" : "Testnet";

  const xlmNum = account?.balance != null ? Number.parseFloat(account.balance) : NaN;
  const lowXlm = isConnected && Number.isFinite(xlmNum) && xlmNum < 1;
  const x402Ready =
    algorandWalletDetected === true &&
    isConnected &&
    Boolean(account) &&
    authEntrySigningAvailable &&
    !refreshError;
  const x402Label =
    algorandWalletDetected === false ? "x402 blocked" : x402Ready ? "x402 ready" : "x402 limited";

  const surfaceTitle = blockchainSurfaceTitle(blockchainSurface, network);
  const blockchainLookupAvailable = isWalletReady;
  const txLine = !isConnected
    ? "Transactions: connect wallet first"
    : isFetchingTransactions
      ? "Fetching recent transactions from Algorand…"
      : transactionsError
        ? `Transactions: ${transactionsError}`
        : transactions.length > 0
          ? `Transactions: ${transactions.length} recent row(s) loaded`
          : "Transactions: none in current Algorand indexer window";

  return (
    <Card className="app-card border border-[var(--border)] bg-[var(--surface-elevated)]/95 p-4 space-y-4">
      <div
        className="flex flex-wrap items-center gap-2"
        role="status"
        aria-live="polite"
        aria-label={`Wallet readiness: ${readinessLabel}`}
      >
        <h3 className="text-[var(--accent-primary)] font-semibold flex items-center gap-2 flex-1 min-w-[12rem] text-base">
          <Wallet className="w-4 h-4 shrink-0" aria-hidden />
          Algorand wallet
        </h3>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-200/90 text-[10px] uppercase tracking-wide">
            Algorand
          </Badge>
          <Badge variant="outline" className="border-purple-500/40 text-purple-200/90 text-[10px] uppercase tracking-wide">
            Pera Wallet
          </Badge>
          <Badge variant="outline" className="border-slate-500/50 text-slate-300 text-[10px] uppercase tracking-wide">
            {networkLabel}
          </Badge>
          <Badge variant="outline" className="border-sky-500/35 text-sky-200/90 text-[10px] uppercase tracking-wide">
            {surfaceTitle}
          </Badge>
          {hasPartialIndexerData ? (
            <Badge variant="outline" className="border-amber-500/40 text-amber-200 text-[10px]">
              Partial Indexer
            </Badge>
          ) : null}
          <Badge
            variant="outline"
            className={`text-[10px] uppercase tracking-wide ${
              isWalletReady
                ? "border-emerald-500/45 text-emerald-300"
                : isConnected
                  ? "border-cyan-500/35 text-cyan-200"
                  : "border-amber-500/40 text-amber-200"
            }`}
          >
            {readyLabel}
          </Badge>
          {STELLAR_SEARCH_USES_MOCK && (
            <Badge variant="outline" className="border-amber-500/35 text-amber-200/90 text-[10px]">
              Search mock
            </Badge>
          )}
          <Badge
            variant="outline"
            className={`text-[10px] ${
              x402Ready ? "border-emerald-500/40 text-emerald-200" : "border-amber-500/40 text-amber-200"
            }`}
            title="x402 on Algorand expects transaction signing in the browser; Pera Wallet or other providers expose signing when available."
          >
            {x402Label}
          </Badge>
          <Badge
            variant="outline"
            className={`text-[10px] ${
              authEntrySigningAvailable ? "border-teal-500/40 text-teal-200" : "border-slate-600/50 text-slate-400"
            }`}
            title="signTransactions on Algorand providers — required for x402 authorization."
          >
            Signing {authEntrySigningAvailable ? "API" : "n/a"}
          </Badge>
          {publicKey && (
            <Badge variant="outline" className="text-[10px] border-violet-500/35 text-violet-200" title="Prepaid credits (demo ledger)">
              Credits {creditsQuery.data?.balance ?? "—"}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-xs text-[var(--muted-text)] leading-relaxed">
        Connect Pera Wallet to view your Algorand account, sign x402 transactions (demo), and let the agent use
        your public key for personalized answers.
      </p>

      <div
        className="rounded-md border border-purple-500/20 bg-slate-900/35 px-3 py-2 text-xs space-y-1.5"
        aria-label="Session trust summary"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-wide text-slate-500">Session trust</span>
          <Badge variant="outline" className="text-[9px] border-purple-500/35 text-purple-200">
            {SESSION_TRUST_LABEL[sessionTrust]}
          </Badge>
          {hydrated ? (
            <>
              <TierBadge tier={summary.score.tier} />
              <TrendGlyph trend={summary.score.trend} />
              <span className="text-slate-500 tabular-nums">{summary.score.value}/100</span>
            </>
          ) : (
            <span className="text-slate-500">Loading…</span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          Reflects successful tools, searches, and ledger signals in this browser — not government ID.
        </p>
      </div>

      {algorandWalletDetected === true && (
        <div className="rounded-md border border-purple-500/20 bg-slate-900/40 px-3 py-2 text-[11px] text-slate-400 flex gap-2 items-start">
          <CreditCard className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" aria-hidden />
          <div className="space-y-1">
            <p className="text-slate-300 font-medium">x402 payment readiness</p>
            {x402Ready ? (
              <p>
                Signing API available, wallet on {networkLabel}, Indexer fresh — chat can run simulated x402 quotes with
                your address.
              </p>
            ) : !isConnected ? (
              <p>Connect the wallet to attach a payer address to simulated settlements.</p>
            ) : !authEntrySigningAvailable ? (
              <p>
                No signing API in this browser context — ensure your Algorand wallet is connected properly.
              </p>
            ) : refreshError ? (
              <p>Indexer could not refresh — try Refresh account. Signing may still work with your wallet.</p>
            ) : isAccountSyncing ? (
              <p>Loading live balance from Algorand…</p>
            ) : (
              <p>Waiting for account data from Algorand…</p>
            )}
          </div>
        </div>
      )}

      {status === "detecting" && (
        <div
          className="flex items-center gap-2 text-sm text-cyan-200/90"
          role="status"
          aria-live="polite"
          aria-label="Scanning for Algorand wallet"
        >
          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" aria-hidden />
          Scanning for Algorand Wallet…
        </div>
      )}

      {algorandWalletDetected === false && status !== "detecting" && (
        <Alert className="border-amber-500/35 bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <AlertTitle className="text-amber-200">Install Pera Wallet, then reload</AlertTitle>
          <AlertDescription className="text-amber-100/80 text-sm space-y-2">
            <p>
              Install the Pera Wallet or another Algorand wallet, refresh this page, tap Connect Wallet, then Refresh account to pull live Algorand data.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {error && (status === "error" || status === "connecting") && (
        <Alert variant="destructive" className="border-red-500/40 bg-red-950/25">
          <AlertTitle>Could not connect</AlertTitle>
          <AlertDescription className="text-sm">{error}</AlertDescription>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 border-red-400/40"
            onClick={() => void connectWallet()}
          >
            Retry connection
          </Button>
        </Alert>
      )}

      {refreshError && isConnected && (
        <Alert className="border-amber-500/35 bg-amber-950/20">
          <AlertTitle className="text-amber-200">Refresh issue</AlertTitle>
          <AlertDescription className="text-sm text-amber-100/85">{refreshError}</AlertDescription>
        </Alert>
      )}

      {isConnected && publicKey && (
        <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/90 p-3">
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-slate-500">Provider</span>
              <span className="text-slate-200 font-medium">{providerName ?? "—"}</span>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <span className="text-slate-500">Address</span>
              <div className="flex items-center gap-1 min-w-0">
                <code className="text-xs font-mono text-cyan-300 truncate max-w-[10rem] sm:max-w-[14rem]">
                  {truncateAddress(publicKey, 8, 6)}
                </code>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 text-cyan-400"
                  onClick={() => copyToClipboard(publicKey)}
                  aria-label={copied ? "Copied address" : "Copy full address"}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-slate-500">ALGO balance</span>
              <span className="font-mono text-cyan-300">{balance} ALGO</span>
            </div>
            <div className="flex justify-between gap-2 text-xs text-slate-500">
              <span>Network</span>
              <span className="text-slate-300">{networkLabel}</span>
            </div>
            {firstSeenAtIso && (
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                First seen in this app {new Date(firstSeenAtIso).toLocaleDateString()}
              </p>
            )}
            {lastRefreshedAt && (
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                Last refreshed {new Date(lastRefreshedAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-cyan-500/35"
              onClick={() => setNetwork(network === "testnet" ? "mainnet" : "testnet")}
              aria-label={`Switch to ${network === "testnet" ? "mainnet" : "testnet"}`}
            >
              <Radio className="w-3.5 h-3.5 mr-1" aria-hidden />
              Use {network === "testnet" ? "mainnet" : "testnet"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-cyan-500/35"
              onClick={() => void refreshAccount()}
              disabled={isAccountSyncing}
              aria-label="Refresh account from Indexer"
              aria-busy={isAccountSyncing}
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isAccountSyncing ? "animate-spin" : ""}`} aria-hidden />
              Refresh account
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-purple-500/30 text-purple-200"
              onClick={() => void refreshIndexerSidecar()}
              disabled={isFetchingTransactions}
              aria-label="Refresh transactions, operations, and network info"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isFetchingTransactions ? "animate-spin" : ""}`} aria-hidden />
              Refresh ledger activity
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-purple-300 ml-auto"
              onClick={disconnectWallet}
              aria-label="Disconnect wallet"
            >
              <LogOut className="w-4 h-4 mr-1" aria-hidden />
              Disconnect
            </Button>
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="space-y-2">
          <Button
            type="button"
            onClick={() => void connectWallet()}
            disabled={status === "connecting" || status === "detecting"}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-semibold focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-busy={status === "connecting"}
          >
            {status === "connecting" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Connecting…
              </span>
            ) : (
              "Connect Pera Wallet"
            )}
          </Button>
          {status === "disconnected" && freighterDetected && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full border-purple-500/35 text-purple-200"
              onClick={() => void connectWallet()}
            >
              Reconnect wallet
            </Button>
          )}
          <p className="text-[11px] text-[var(--muted-text)] text-center">
            Pera Wallet requires a supported desktop browser (Chrome, Firefox, Brave, Edge). Mobile in-app browsers are not
            supported.
          </p>
        </div>
      )}
    </Card>
  );
}
