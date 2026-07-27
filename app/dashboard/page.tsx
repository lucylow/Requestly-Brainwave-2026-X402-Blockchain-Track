'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { QueryVolumeChart } from '@/components/dashboard/QueryVolumeChart';
import { AgentPerformance } from '@/components/dashboard/AgentPerformance';
import { RealtimeStats } from '@/components/analytics/RealtimeStats';
import { ActivityFeed } from '@/components/analytics/ActivityFeed';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAnalytics } from '@/lib/mockData';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(mockAnalytics.overview);
  const [trends, setTrends] = useState(mockAnalytics.trends);

  useEffect(() => {
    // Simulate loading
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
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your AI agent's performance and revenue in real-time.
            </p>
          </div>

          <RealtimeStats />

          <ErrorBoundary>
            <StatsCards data={overview} />
          </ErrorBoundary>

          <div className="grid gap-4 md:grid-cols-2">
            <ErrorBoundary>
              <RevenueChart data={trends} />
            </ErrorBoundary>
            <ErrorBoundary>
              <QueryVolumeChart data={trends} />
            </ErrorBoundary>
          </div>

          <Tabs defaultValue="agents">
            <TabsList>
              <TabsTrigger value="agents">Top Agents</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="agents">
              <ErrorBoundary>
                <AgentPerformance agents={overview.topAgents} />
              </ErrorBoundary>
            </TabsContent>
            <TabsContent value="activity">
              <ErrorBoundary>
                <ActivityFeed limit={10} />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}