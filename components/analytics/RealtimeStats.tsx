'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { mockAnalytics } from '@/lib/mockData';

export function RealtimeStats() {
  const [data, setData] = useState(mockAnalytics.realtime);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        ...data,
        timestamp: new Date().toISOString(),
        queriesInLastHour: data.queriesInLastHour + Math.floor(Math.random() * 3),
        revenueInLastHour: data.revenueInLastHour + Math.random() * 0.003,
        activeAgentsInLastHour: data.activeAgentsInLastHour + (Math.random() > 0.7 ? 1 : 0),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
              Live Stats
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-xs">
              🟢 Live
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(data.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <div>
            <p className="text-xs text-muted-foreground">Queries (1h)</p>
            <p className="text-2xl font-bold">{data.queriesInLastHour}</p>
            <p className="text-xs text-green-400">
              {data.successfulQueriesInLastHour} successful
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Revenue (1h)</p>
            <p className="text-2xl font-bold text-green-400">
              ${data.revenueInLastHour.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Active Agents</p>
            <p className="text-2xl font-bold">{data.activeAgentsInLastHour}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className={`text-2xl font-bold ${
              data.successRate >= 95 ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {data.successRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Queries/sec</p>
            <p className="text-2xl font-bold">{data.queriesPerSecond.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}