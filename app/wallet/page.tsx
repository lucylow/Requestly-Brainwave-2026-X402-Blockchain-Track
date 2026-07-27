'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { WalletOverview } from '@/components/wallet/WalletOverview';
import { DepositForm } from '@/components/wallet/DepositForm';
import { WithdrawForm } from '@/components/wallet/WithdrawForm';
import { LimitSettings } from '@/components/wallet/LimitSettings';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { mockWallet, mockTransactions } from '@/lib/mockData';

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(mockWallet);
  const [transactions, setTransactions] = useState(mockTransactions);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setWallet({
        ...mockWallet,
        balance: mockWallet.balance - 0.001,
        availableBalance: mockWallet.availableBalance - 0.001,
        spent: {
          ...mockWallet.spent,
          daily: mockWallet.spent.daily + 0.001,
        },
      });
      setTransactions([
        {
          id: `tx-${Date.now()}`,
          txHash: `0x${Math.random().toString(36).slice(2, 10)}...`,
          amount: -0.001,
          fee: 0.00001,
          service: 'brave_search',
          description: 'Search: refreshed data',
          status: 'CONFIRMED' as const,
          createdAt: new Date().toISOString(),
          confirmedAt: new Date().toISOString(),
        },
        ...mockTransactions,
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
              <p className="text-muted-foreground">
                Manage your AI agent's funds and spending limits.
              </p>
            </div>
            <Button onClick={refresh} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <WalletOverview wallet={wallet} />

          <div className="grid gap-6 md:grid-cols-2">
            <DepositForm walletId={wallet.id} onSuccess={refresh} />
            <WithdrawForm walletId={wallet.id} onSuccess={refresh} />
          </div>

          <LimitSettings
            walletId={wallet.id}
            initialLimits={wallet.limits}
            onUpdate={refresh}
          />

          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="analytics">Spending Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <TransactionHistory transactions={transactions} />
            </TabsContent>
            <TabsContent value="analytics">
              <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
                <p>Spending analytics coming soon</p>
                <p className="text-sm">Track your agent's spending patterns over time</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}