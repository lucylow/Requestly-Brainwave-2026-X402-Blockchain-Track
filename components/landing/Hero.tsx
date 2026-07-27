'use client';

import { DemoSearchBar } from '@/components/demo/DemoSearchBar';
import { Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 border-b border-border/40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

      <div className="container relative px-4 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400 animate-pulse">
          <Zap className="h-3 w-3" />
          <span>AI Agents pay 0.001 USDC per search</span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gradient-cyan">Every Request,</span>
          <br />
          <span className="text-foreground">Settled. Instantly.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Try the demo below to see how AI agents pay for web search via <span className="text-cyan-400 font-medium">x402 micropayments</span>.
          No subscriptions. No API keys. Just instant settlement.
        </p>

        {/* Interactive Demo Area */}
        <div className="mx-auto max-w-3xl">
          <DemoSearchBar />
        </div>
      </div>
    </section>
  );
}
