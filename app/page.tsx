'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Coins, Search, Wallet, ChartLine, Globe } from 'lucide-react';
import Link from 'next/link';
import { DemoSearchBar } from '@/components/demo/DemoSearchBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-cyan-950/10">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Requestly
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <Link href="/dashboard">
              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                Launch App
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

        <div className="container relative px-4">
          <div className="mx-auto max-w-4xl text-center">
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
              The first x402-powered MCP server that lets AI agents pay per Brave Search query.
              Try the demo below to see how AI agents pay for web search via <span className="text-cyan-400 font-medium">x402 micropayments</span>.
            </p>

            <div className="mx-auto max-w-3xl mb-12">
              <DemoSearchBar />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Secure x402 Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span>0.001 USDC / Query</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>100% Autonomous</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 border-t border-border">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why <span className="text-cyan-400">Requestly</span>?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to enable autonomous agentic payments.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: 'AI-Powered Search', desc: 'Agents get real-time web search results via Brave API.' },
              { icon: Wallet, title: 'Autonomous Payments', desc: 'Agents sign and settle 0.001 USDC micropayments.' },
              { icon: ChartLine, title: 'Real-Time Analytics', desc: 'Monitor agent spending and revenue in a dashboard.' },
              { icon: Globe, title: 'Multi-Chain Support', desc: 'Works on Algorand and Stellar blockchains.' },
            ].map((feature) => (
              <div key={feature.title} className="group rounded-xl border border-border bg-card/50 p-6 hover:border-cyan-500/50 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 border-t border-border">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It <span className="text-purple-400">Works</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four simple steps from request to settlement.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { step: '1', title: 'Challenge', desc: 'AI agent sends search request. Server returns 402 "Payment Required".' },
              { step: '2', title: 'Sign', desc: 'Agent signs Ed25519 proof off-chain.' },
              { step: '3', title: 'Retry', desc: 'Agent retries with PAYMENT-SIGNATURE header.' },
              { step: '4', title: 'Settle', desc: 'Facilitator settles on Algorand. Receipt returned.' },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-border bg-card/50 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-xl font-bold text-cyan-400">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-sm font-bold">Requestly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Requestly. Built for Brainwave 2026.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}