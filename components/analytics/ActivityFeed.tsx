'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Search, DollarSign, Wallet, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { mockActivity } from '@/lib/mockData';

const eventTypeColors: Record<string, string> = {
  QUERY: 'bg-blue-500/20 text-blue-400',
  PAYMENT: 'bg-green-500/20 text-green-400',
  DEPOSIT: 'bg-yellow-500/20 text-yellow-400',
  WITHDRAWAL: 'bg-orange-500/20 text-orange-400',
  WALLET_CREATED: 'bg-purple-500/20 text-purple-400',
  ERROR: 'bg-red-500/20 text-red-400',
};

const eventTypeIcons: Record<string, React.ReactNode> = {
  QUERY: <Search className="h-4 w-4" />,
  PAYMENT: <DollarSign className="h-4 w-4" />,
  DEPOSIT: <Wallet className="h-4 w-4" />,
  WITHDRAWAL: <Wallet className="h-4 w-4" />,
  WALLET_CREATED: <CheckCircle className="h-4 w-4" />,
  ERROR: <AlertTriangle className="h-4 w-4" />,
};

export function ActivityFeed({ limit = 20 }: { limit?: number }) {
  const [events, setEvents] = useState(mockActivity.slice(0, limit));

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: `act-${Date.now()}`,
        eventType: ['QUERY', 'PAYMENT', 'DEPOSIT'][Math.floor(Math.random() * 3)] as any,
        agentId: `agent-${Math.floor(Math.random() * 5) + 1}`,
        agentName: ['Claude Assistant', 'Cursor Agent', 'Dev Assistant', 'Research Bot'][Math.floor(Math.random() * 4)],
        chainId: 'algorand',
        query: 'trending search query',
        txHash: `0x${Math.random().toString(36).slice(2, 10)}...`,
        amount: '1000',
        duration: Math.floor(Math.random() * 200) + 50,
        success: Math.random() > 0.05,
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, limit - 1)]);
    }, 8000);
    return () => clearInterval(interval);
  }, [limit]);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
          {events.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No recent activity</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className={`rounded-full p-1.5 ${eventTypeColors[event.eventType] || 'bg-gray-500/20'}`}>
                  {eventTypeIcons[event.eventType] || <Activity className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium truncate">
                      {event.agentName || `Agent ${event.agentId?.slice(0, 8)}`}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {event.eventType.toLowerCase()}
                    </Badge>
                    {event.success ? (
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground truncate">
                    {event.query && `"${event.query.slice(0, 40)}${event.query.length > 40 ? '...' : ''}"`}
                    {event.txHash && ` • ${event.txHash}`}
                    {event.chainId && ` • ${event.chainId}`}
                    {event.duration && ` • ${event.duration}ms`}
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</span>
                    {event.amount && (
                      <span className="font-medium text-green-400">
                        +${(parseInt(event.amount) / 1_000_000).toFixed(6)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}