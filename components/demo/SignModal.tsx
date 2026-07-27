'use client';

import { Fingerprint, Check, Wallet, Sparkles } from 'lucide-react';

export function SignModal({ query }: { query: string }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-start gap-4 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
        <div className="rounded-full bg-purple-500/20 p-2 text-purple-400">
          <Fingerprint className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-purple-400">Ed25519 Signature Required</h3>
          <p className="text-sm text-muted-foreground">The AI agent is signing the payment authorization.</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Wallet Status</span>
          <span className="flex items-center gap-1 text-xs text-green-400">
            <Wallet className="h-3 w-3" />
            Connected
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded bg-background p-2 font-mono text-xs">
          <Sparkles className="h-3 w-3 text-cyan-400" />
          <span className="text-muted-foreground">Signing payload:</span>
          <span className="truncate text-cyan-300">0x7f8a3b9c4d5e6f...</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
          <Check className="h-3 w-3" />
          <span>Authorization signed successfully</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span>Retrying request with `PAYMENT-SIGNATURE` header...</span>
      </div>
    </div>
  );
}
