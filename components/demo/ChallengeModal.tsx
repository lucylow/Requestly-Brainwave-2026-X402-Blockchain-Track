'use client';

import { Shield, Clock, Coins } from 'lucide-react';

export function ChallengeModal({ query }: { query: string }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-start gap-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
        <div className="rounded-full bg-yellow-500/20 p-2 text-yellow-400">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-yellow-400">HTTP 402 Payment Required</h3>
          <p className="text-sm text-muted-foreground">The server requires payment to fulfill the request.</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-red-400">GET</span>
          <span className="text-muted-foreground">/api/search?q={query}</span>
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-muted-foreground">Status: <span className="text-yellow-400">402 Payment Required</span></p>
          <div className="flex items-center gap-2 text-xs">
            <Coins className="h-3 w-3 text-yellow-400" />
            <span>Amount: <span className="text-cyan-400 font-bold">0.001 USDC</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span>Expires in: <span className="text-foreground">60 seconds</span></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
        <span>Waiting for wallet authorization...</span>
      </div>
    </div>
  );
}
