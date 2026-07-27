import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, DollarSign, Users, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  data: {
    totalQueries: number;
    totalRevenue: number;
    activeAgents: number;
    successRate: number;
    averageResponseTime: number;
  };
}

export function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Queries',
      value: data.totalQueries.toLocaleString(),
      icon: Search,
      trend: '+12.5%',
      trendUp: true,
      color: 'text-cyan-400',
    },
    {
      title: 'Revenue',
      value: `$${data.totalRevenue.toFixed(4)}`,
      icon: DollarSign,
      trend: '+8.3%',
      trendUp: true,
      color: 'text-green-400',
    },
    {
      title: 'Active Agents',
      value: data.activeAgents,
      icon: Users,
      trend: '+23.1%',
      trendUp: true,
      color: 'text-purple-400',
    },
    {
      title: 'Success Rate',
      value: `${data.successRate.toFixed(1)}%`,
      icon: Activity,
      trend: data.successRate > 95 ? 'Excellent' : 'Good',
      trendUp: data.successRate > 95,
      color: data.successRate > 95 ? 'text-green-400' : 'text-yellow-400',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:border-cyan-500/30 transition-colors bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={cn('h-4 w-4', stat.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 text-xs">
              {stat.trend && (
                <span className={cn(
                  'flex items-center gap-1',
                  stat.trendUp ? 'text-green-400' : 'text-red-400'
                )}>
                  {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.trend}
                </span>
              )}
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}