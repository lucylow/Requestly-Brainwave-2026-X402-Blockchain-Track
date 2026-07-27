'use client';

import { useState, useCallback } from 'react';
import { mockSearchResults, mockReceipt } from '@/lib/mockData';

export type DemoStep = 0 | 1 | 2 | 3 | 4;

interface DemoState {
  step: DemoStep;
  isLoading: boolean;
  query: string;
  results: typeof mockSearchResults | null;
  receipt: typeof mockReceipt | null;
  progress: number;
}

export function useDemoFlow() {
  const [state, setState] = useState<DemoState>({
    step: 0,
    isLoading: false,
    query: '',
    results: null,
    receipt: null,
    progress: 0,
  });

  const handleRetry = useCallback(() => {
    setState((prev) => ({ ...prev, step: 3, progress: 75 }));

    // Step 3: Retry (Simulate network request with payment header)
    setTimeout(() => {
      // Step 4: Settle (Simulate on-chain settlement)
      setState((prev) => ({
        ...prev,
        step: 4,
        progress: 100,
        results: mockSearchResults,
        receipt: mockReceipt,
        isLoading: false,
      }));
    }, 2000);
  }, []);

  const handleSign = useCallback(() => {
    setState((prev) => ({ ...prev, step: 2, progress: 50 }));

    // Step 2: Sign (Simulate wallet signing)
    setTimeout(() => {
      // Automatically proceed to step 3 after signing
      handleRetry();
    }, 2000);
  }, [handleRetry]);

  const startDemo = useCallback((query: string) => {
    // Reset everything and start the demo
    setState({
      step: 1,
      isLoading: true,
      query,
      results: null,
      receipt: null,
      progress: 5,
    });

    // Step 1: Challenge (Simulate 402 response)
    setTimeout(() => {
      setState((prev) => ({ ...prev, progress: 25 }));
      // Automatically proceed to step 2 after showing the challenge
      setTimeout(() => handleSign(), 1500);
    }, 1000);
  }, [handleSign]);

  const resetDemo = useCallback(() => {
    setState({
      step: 0,
      isLoading: false,
      query: '',
      results: null,
      receipt: null,
      progress: 0,
    });
  }, []);

  return {
    ...state,
    startDemo,
    resetDemo,
    handleSign,
    handleRetry,
  };
}
