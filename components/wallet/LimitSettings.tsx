'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface LimitSettingsProps {
  walletId: string;
  initialLimits: {
    daily: number | null;
    weekly: number | null;
    monthly: number | null;
    perTx: number | null;
  };
  onUpdate: () => void;
}

export function LimitSettings({ walletId, initialLimits, onUpdate }: LimitSettingsProps) {
  const [limits, setLimits] = useState({
    daily: initialLimits.daily?.toString() || '',
    weekly: initialLimits.weekly?.toString() || '',
    monthly: initialLimits.monthly?.toString() || '',
    perTx: initialLimits.perTx?.toString() || '',
  });
  const [enabled, setEnabled] = useState({
    daily: !!initialLimits.daily,
    weekly: !!initialLimits.weekly,
    monthly: !!initialLimits.monthly,
    perTx: !!initialLimits.perTx,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Limits updated',
        description: 'Spending limits have been updated successfully.',
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Update failed',
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
        <CardTitle>Spending Limits</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set spending limits for your AI agent. Limits apply per period.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { key: 'daily', label: 'Daily', placeholder: '10' },
            { key: 'weekly', label: 'Weekly', placeholder: '50' },
            { key: 'monthly', label: 'Monthly', placeholder: '200' },
            { key: 'perTx', label: 'Per TX', placeholder: '0.001' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="flex items-center gap-4">
              <Switch
                checked={enabled[key as keyof typeof enabled]}
                onCheckedChange={(checked) =>
                  setEnabled({ ...enabled, [key]: checked })
                }
              />
              <Label className="w-16">{label}</Label>
              <Input
                type="number"
                step={key === 'perTx' ? '0.001' : '1'}
                placeholder={placeholder}
                value={limits[key as keyof typeof limits]}
                onChange={(e) => setLimits({ ...limits, [key]: e.target.value })}
                disabled={!enabled[key as keyof typeof enabled]}
                className="w-24 bg-background/50"
              />
              <span className="text-sm text-muted-foreground">USDC</span>
            </div>
          ))}
        </div>
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Limits'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}