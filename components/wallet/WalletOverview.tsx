import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface WalletOverviewProps {
  wallet: {
    id: string;
    agentName: string;
    balance: number;
    availableBalance: number;
    currency: string;
    walletAddress: string;
    limits: { daily: number | null; weekly: number | null; monthly: number | null };
    spent: { daily: number; weekly: number; monthly: number };
  };
}

export function WalletOverview({ wallet }: WalletOverviewProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dailyLimit = wallet.limits.daily || 0;
  const dailyProgress = dailyLimit > 0 ? (wallet.spent.daily / dailyLimit) * 100 : 0;

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-cyan-500/20">
      <CardHeader>
        <CardTitle>Wallet Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Agent</p>
            <p className="text-lg font-semibold">{wallet.agentName}</p>
            <div className="mt-2 flex items-center gap-2">
              <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                {wallet.walletAddress.slice(0, 10)}...{wallet.walletAddress.slice(-6)}
              </code>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
                {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-3xl font-bold text-green-400">
              ${wallet.balance.toFixed(6)} {wallet.currency}
            </p>
            <p className="text-sm text-muted-foreground">
              Available: ${wallet.availableBalance.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Daily Spending</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                ${wallet.spent.daily.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                / ${dailyLimit.toFixed(2)}
              </span>
            </div>
            <Progress value={dailyProgress} className="h-2" />
            <p className="mt-1 text-xs text-muted-foreground">
              {dailyProgress > 80 ? '⚠️ Approaching limit' : 'Healthy'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}