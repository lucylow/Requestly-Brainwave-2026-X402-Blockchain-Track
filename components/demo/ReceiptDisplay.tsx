'use client';

import { CheckCircle, Copy, ExternalLink, Clock } from 'lucide-react';
import { useState } from 'react';

interface Receipt {
  transactionId: string;
  confirmedRound: number;
  network: string;
  amount: string;
  asset: string;
  status: 'confirmed';
  timestamp: string;
  blockExplorerUrl: string;
}

export function ReceiptDisplay({ receipt }: { receipt: Receipt }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(receipt.transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 animate-fade-in">
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <h4 className="font-medium text-green-400">Transaction Receipt</h4>
        </div>
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
          {receipt.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Transaction Hash</p>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="truncate text-cyan-300">{receipt.transactionId}</span>
            <button onClick={copyAddress} className="text-muted-foreground hover:text-foreground transition-colors">
              {copied ? <CheckCircle className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Network</p>
          <p className="font-mono text-xs">{receipt.network}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className="font-mono text-xs font-medium text-yellow-400">
            {parseInt(receipt.amount) / 1_000_000} {receipt.asset}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Block</p>
          <p className="font-mono text-xs">#{receipt.confirmedRound.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{new Date(receipt.timestamp).toLocaleString()}</span>
        </div>
        <a
          href={receipt.blockExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-cyan-400 hover:underline"
        >
          <span>View on Explorer</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
