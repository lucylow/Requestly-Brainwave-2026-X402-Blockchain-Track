'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function WithdrawForm({ walletId, onSuccess }: { walletId: string; onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a positive number.',
        variant: 'destructive',
      });
      return;
    }
    if (!destination.trim()) {
      toast({
        title: 'Invalid address',
        description: 'Please enter a destination address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: 'Withdrawal successful',
        description: `Withdrew ${numAmount} USDC to ${destination.slice(0, 10)}...`,
      });
      setAmount('');
      setDestination('');
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Withdrawal failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              step="0.001"
              min="0.001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              required
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="withdraw-destination">Destination Address</Label>
            <Input
              id="withdraw-destination"
              type="text"
              placeholder="0x... or G..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={loading}
              required
              className="bg-background/50 font-mono"
            />
          </div>
          <Button type="submit" className="w-full" variant="outline" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Withdraw'
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Funds will be sent to the address you provide.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}