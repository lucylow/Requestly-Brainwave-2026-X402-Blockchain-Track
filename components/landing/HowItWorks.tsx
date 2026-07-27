import { Shield, Fingerprint, RefreshCw, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Shield,
    title: '1. Challenge',
    description: 'The server returns an HTTP 402 Payment Required status with payment details.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Fingerprint,
    title: '2. Sign',
    description: 'The AI agent signs the payment authorization using its Ed25519 wallet.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: RefreshCw,
    title: '3. Retry',
    description: 'The agent retries the request with the signed PAYMENT-SIGNATURE header.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    icon: CheckCircle,
    title: '4. Settle',
    description: 'The server verifies the signature, settles on-chain, and returns the results.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The <span className="text-cyan-400">x402</span> Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A seamless 4-step process for autonomous agentic payments.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden lg:block" />
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border ${step.bg} ${step.color} group-hover:scale-110 transition-transform relative z-10 bg-background`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
