'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { useDemoFlow } from '@/hooks/useDemoFlow';
import { ChallengeModal } from './ChallengeModal';
import { SignModal } from './SignModal';
import { ResultsDisplay } from './ResultsDisplay';
import { ReceiptDisplay } from './ReceiptDisplay';

export function DemoSearchBar() {
  const [query, setQuery] = useState('');
  const { isLoading, startDemo, step, progress, results, receipt, resetDemo } = useDemoFlow();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    startDemo(query);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder='Ask me anything, e.g., "What is the latest AI news?"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full bg-background/50 pl-10 pr-4 text-base backdrop-blur-sm border-2 focus-visible:border-cyan-500/50"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>Search</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Progress Indicator */}
      {isLoading && (
        <div className="w-full">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className={step >= 1 ? 'text-cyan-400' : ''}>1. Challenge</span>
            <span className={step >= 2 ? 'text-cyan-400' : ''}>2. Sign</span>
            <span className={step >= 3 ? 'text-cyan-400' : ''}>3. Retry</span>
            <span className={step >= 4 ? 'text-green-400' : ''}>4. Settle</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-8">
        {/* The Demo Visuals */}
        <div className="relative min-h-[400px] rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
          {step === 1 && <ChallengeModal query={query} />}
          {step === 2 && <SignModal query={query} />}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-fade-in">
              <div className="rounded-full bg-cyan-500/20 p-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
              </div>
              <p className="text-lg font-medium">Retrying with Payment Signature...</p>
              <p className="text-sm text-muted-foreground">
                Submitting `PAYMENT-SIGNATURE` header to the server.
              </p>
            </div>
          )}
          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <ResultsDisplay results={results!} query={query} />
              <ReceiptDisplay receipt={receipt!} />
              <div className="flex justify-end">
                <button
                  onClick={resetDemo}
                  className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  Try Another Search
                </button>
              </div>
            </div>
          )}
          {step === 0 && (
            <div className="flex h-[400px] flex-col items-center justify-center text-center text-muted-foreground">
              <div className="rounded-full bg-muted/50 p-6">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="mt-4 max-w-sm text-lg font-medium text-foreground">
                Search above to start the x402 demo
              </p>
              <p className="text-sm">
                Watch the AI agent pay 0.001 USDC per query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
