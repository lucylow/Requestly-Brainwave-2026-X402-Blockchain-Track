import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Wallet, ChartLine, Globe, Bot, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'AI-Powered Search',
    description: 'Agents get real-time web search results via Brave API, paying only for what they use.',
  },
  {
    icon: Wallet,
    title: 'Autonomous Payments',
    description: 'Agents sign and settle 0.001 USDC micropayments via x402 without human intervention.',
  },
  {
    icon: ChartLine,
    title: 'Real-Time Analytics',
    description: 'Monitor agent spending, query volume, and revenue in a beautiful dashboard.',
  },
  {
    icon: Globe,
    title: 'Multi-Chain Support',
    description: 'Works on both Stellar and Algorand blockchains, with more coming soon.',
  },
  {
    icon: Bot,
    title: 'MCP Native',
    description: 'Built as an MCP server, compatible with Claude, Cursor, and any MCP client.',
  },
  {
    icon: ShieldCheck,
    title: 'Trustless & Verifiable',
    description: 'Every transaction includes an on-chain receipt for full auditability.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 border-t border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why <span className="text-cyan-400">Requestly</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to enable autonomous agentic payments.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:border-cyan-500/50 transition-colors bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
