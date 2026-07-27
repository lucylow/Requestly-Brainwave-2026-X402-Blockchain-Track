'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  txHash: string;
  amount: number;
  fee: number;
  service: string;
  description: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REVERTED';
  createdAt: string;
  confirmedAt?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = transactions.filter((tx) =>
    tx.description.toLowerCase().includes(filter.toLowerCase()) ||
    tx.txHash.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusBadge = (status: Transaction['status']) => {
    const variants: Record<string, { label: string; className: string }> = {
      PENDING: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-400' },
      CONFIRMED: { label: 'Confirmed', className: 'bg-green-500/20 text-green-400' },
      FAILED: { label: 'Failed', className: 'bg-red-500/20 text-red-400' },
      REVERTED: { label: 'Reverted', className: 'bg-orange-500/20 text-orange-400' },
    };
    const v = variants[status] || { label: status, className: 'bg-gray-500/20 text-gray-400' };
    return <Badge className={v.className}>{v.label}</Badge>;
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 bg-background/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No transactions found</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {filtered.map((tx) => (
              <div
                key={tx.id}
                className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{tx.description}</span>
                      {getStatusBadge(tx.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{tx.service}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}</span>
                      {tx.txHash && (
                        <>
                          <span>•</span>
                          <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                            {tx.txHash.slice(0, 10)}...
                          </code>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={cn(
                        'font-medium',
                        tx.amount < 0 ? 'text-red-400' : 'text-green-400'
                      )}>
                        {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(6)}
                      </p>
                      {tx.fee > 0 && (
                        <p className="text-xs text-muted-foreground">Fee: ${tx.fee.toFixed(6)}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
                      className="rounded-full p-1 hover:bg-muted"
                    >
                      {expanded === tx.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {expanded === tx.id && (
                  <div className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Tx Hash:</span>
                        <code className="ml-2 rounded bg-muted px-1 py-0.5 text-xs font-mono">
                          {tx.txHash}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <span className="ml-2">{tx.status}</span>
                      </div>
                      {tx.confirmedAt && (
                        <div>
                          <span className="font-medium">Confirmed:</span>
                          <span className="ml-2">
                            {new Date(tx.confirmedAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}