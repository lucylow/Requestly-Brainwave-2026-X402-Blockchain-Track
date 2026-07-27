'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface QueryVolumeChartProps {
  data: Array<{ date: string; queries: number }>;
}

export function QueryVolumeChart({ data }: QueryVolumeChartProps) {
  const totalQueries = data.reduce((sum, d) => sum + d.queries, 0);
  const maxQueries = Math.max(...data.map((d) => d.queries), 0);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Query Volume</CardTitle>
          <div className="text-right">
            <p className="text-2xl font-bold">{totalQueries.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Queries</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => [value, 'Queries']}
              />
              <Bar dataKey="queries" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.queries === maxQueries ? '#FBBF24' : '#00F0FF'}
                    fillOpacity={entry.queries === maxQueries ? 1 : 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}