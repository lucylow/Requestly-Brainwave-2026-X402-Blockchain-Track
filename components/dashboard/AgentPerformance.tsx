import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AgentPerformanceProps {
  agents: Array<{
    agentId: string;
    agentName: string;
    queryCount: number;
  }>;
}

export function AgentPerformance({ agents }: AgentPerformanceProps) {
  const maxQueries = Math.max(...agents.map((a) => a.queryCount), 0);
  const rankColors = ['#FBBF24', '#A78BFA', '#60A5FA', '#34D399', '#F87171'];

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle>Top Performing Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No agent data available</p>
          ) : (
            agents.slice(0, 5).map((agent, index) => {
              const percentage = maxQueries > 0 ? (agent.queryCount / maxQueries) * 100 : 0;

              return (
                <div key={agent.agentId} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: rankColors[index % rankColors.length] }}
                      >
                        {index + 1}
                      </div>
                      <span className="font-medium">{agent.agentName}</span>
                      <Badge variant="outline" className="text-xs">
                        {agent.queryCount} queries
                      </Badge>
                    </div>
                    <span className="text-sm text-cyan-400">
                      {agent.queryCount}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}