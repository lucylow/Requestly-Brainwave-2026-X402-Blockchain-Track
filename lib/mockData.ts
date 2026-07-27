import { subDays, format } from 'date-fns';

// ============================================================
// MOCK WALLET DATA
// ============================================================
export const mockWallet = {
  id: 'wallet-123',
  agentId: 'agent-001',
  agentName: 'Claude Assistant',
  balance: 4.999,
  availableBalance: 4.998,
  locked: 0.001,
  currency: 'USDC',
  walletAddress: '0x7f8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
  limits: {
    daily: 10,
    weekly: 50,
    monthly: 200,
    perTx: 0.001,
  },
  spent: {
    daily: 0.001,
    weekly: 0.047,
    monthly: 0.321,
  },
  periodStart: {
    daily: '2024-01-15T00:00:00Z',
    weekly: '2024-01-13T00:00:00Z',
    monthly: '2024-01-01T00:00:00Z',
  },
};

// ============================================================
// MOCK TRANSACTION DATA
// ============================================================
export const mockTransactions = [
  {
    id: 'tx-001',
    txHash: '0x7f8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    amount: -0.001,
    fee: 0.00001,
    service: 'brave_search',
    description: 'Search: latest AI news',
    status: 'CONFIRMED' as const,
    createdAt: new Date().toISOString(),
    confirmedAt: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: 'tx-002',
    txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    amount: -0.001,
    fee: 0.00001,
    service: 'brave_search',
    description: 'Search: Bitcoin price',
    status: 'CONFIRMED' as const,
    createdAt: new Date(Date.now() - 60000).toISOString(),
    confirmedAt: new Date(Date.now() - 55000).toISOString(),
  },
  {
    id: 'tx-003',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    amount: 5.0,
    fee: 0.0001,
    service: 'deposit',
    description: 'Deposit of 5.0 USDC',
    status: 'CONFIRMED' as const,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    confirmedAt: new Date(Date.now() - 3595000).toISOString(),
  },
  {
    id: 'tx-004',
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    amount: -0.001,
    fee: 0.00001,
    service: 'brave_search',
    description: 'Search: AI trends 2026',
    status: 'PENDING' as const,
    createdAt: new Date(Date.now() - 2000).toISOString(),
  },
  {
    id: 'tx-005',
    txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    amount: -0.001,
    fee: 0.00001,
    service: 'brave_search',
    description: 'Search: Algorand news',
    status: 'CONFIRMED' as const,
    createdAt: new Date(Date.now() - 120000).toISOString(),
    confirmedAt: new Date(Date.now() - 115000).toISOString(),
  },
  {
    id: 'tx-006',
    txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e',
    amount: -0.001,
    fee: 0.00001,
    service: 'brave_search',
    description: 'Search: x402 protocol',
    status: 'FAILED' as const,
    createdAt: new Date(Date.now() - 180000).toISOString(),
    error: 'Insufficient balance',
  },
  {
    id: 'tx-007',
    txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    amount: -0.002,
    fee: 0.00002,
    service: 'translation',
    description: 'Translate: Hello world',
    status: 'CONFIRMED' as const,
    createdAt: new Date(Date.now() - 240000).toISOString(),
    confirmedAt: new Date(Date.now() - 235000).toISOString(),
  },
];

// ============================================================
// MOCK ANALYTICS DATA
// ============================================================
export const mockAnalytics = {
  overview: {
    totalQueries: 1247,
    totalRevenue: 1.247,
    activeAgents: 23,
    successfulQueries: 1240,
    failedQueries: 7,
    successRate: 99.44,
    averageResponseTime: 142,
    chainBreakdown: [
      { chainId: 'algorand', count: 1247, revenue: 1.247 },
      { chainId: 'stellar', count: 0, revenue: 0 },
    ],
    topAgents: [
      { agentId: 'agent-001', agentName: 'Claude Assistant', queryCount: 567 },
      { agentId: 'agent-002', agentName: 'Cursor Agent', queryCount: 345 },
      { agentId: 'agent-003', agentName: 'Dev Assistant', queryCount: 234 },
      { agentId: 'agent-004', agentName: 'Research Bot', queryCount: 101 },
    ],
  },
  trends: generateTrends(30),
  realtime: {
    timestamp: new Date().toISOString(),
    queriesInLastHour: 42,
    successfulQueriesInLastHour: 41,
    revenueInLastHour: 0.042,
    activeAgentsInLastHour: 5,
    successRate: 97.62,
    queriesPerSecond: 0.012,
  },
};

// ============================================================
// MOCK ACTIVITY DATA
// ============================================================
export const mockActivity = [
  {
    id: 'act-001',
    eventType: 'QUERY',
    agentId: 'agent-001',
    agentName: 'Claude Assistant',
    chainId: 'algorand',
    query: 'latest AI news 2026',
    txHash: '0x7f8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    amount: '1000',
    duration: 142,
    success: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'act-002',
    eventType: 'QUERY',
    agentId: 'agent-002',
    agentName: 'Cursor Agent',
    chainId: 'algorand',
    query: 'Bitcoin price today',
    txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    amount: '1000',
    duration: 98,
    success: true,
    createdAt: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: 'act-003',
    eventType: 'PAYMENT',
    agentId: 'agent-001',
    agentName: 'Claude Assistant',
    chainId: 'algorand',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    amount: '1000',
    success: true,
    createdAt: new Date(Date.now() - 12000).toISOString(),
  },
  {
    id: 'act-004',
    eventType: 'DEPOSIT',
    agentId: 'agent-001',
    agentName: 'Claude Assistant',
    chainId: 'algorand',
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
    amount: '5000000',
    success: true,
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'act-005',
    eventType: 'ERROR',
    agentId: 'agent-003',
    agentName: 'Dev Assistant',
    chainId: 'algorand',
    query: 'weather forecast',
    success: false,
    createdAt: new Date(Date.now() - 30000).toISOString(),
  },
];

// ============================================================
// MOCK SEARCH RESULTS
// ============================================================
export const mockSearchResults = [
  {
    title: 'AI Agents: The Future of Autonomous Commerce',
    url: 'https://example.com/ai-agents-future',
    snippet: 'Discover how AI agents are transforming digital commerce with autonomous payments and real-time decision making.',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: 'TechCrunch',
  },
  {
    title: 'x402 Protocol Reaches 165 Million Transactions',
    url: 'https://example.com/x402-milestone',
    snippet: 'The x402 protocol has processed over 165 million transactions, powering the next generation of agentic payments.',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: 'CoinDesk',
  },
  {
    title: 'Algorand: The Ideal Settlement Layer for AI Micropayments',
    url: 'https://example.com/algorand-ai-payments',
    snippet: 'Algorand\'s low fees, instant finality, and atomic transaction groups make it the perfect blockchain for AI agent micropayments.',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    source: 'Blockchain News',
  },
  {
    title: 'Circle Launches USDC Testnet Faucet for Developers',
    url: 'https://example.com/circle-usdc-faucet',
    snippet: 'Circle\'s new testnet faucet provides developers with free USDC for testing on multiple blockchains including Algorand.',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: 'Circle Blog',
  },
  {
    title: 'AI Agents and the Future of Machine-to-Machine Payments',
    url: 'https://example.com/m2m-payments-future',
    snippet: 'Machine-to-machine payments are expected to reach $50 billion by 2030, with AI agents leading the charge.',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: 'Forbes',
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function generateTrends(days: number) {
  const trends = [];
  let baseQueries = 20;
  let baseRevenue = 0.02;

  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayFactor = 1 + (days - i) / days * 0.5;
    const queries = Math.floor(baseQueries * dayFactor * (0.8 + Math.random() * 0.4));
    const revenue = baseRevenue * dayFactor * (0.8 + Math.random() * 0.4);
    const uniqueAgents = Math.floor(3 + (days - i) / days * 10);

    trends.push({
      date: format(date, 'yyyy-MM-dd'),
      queries,
      revenue: Number(revenue.toFixed(6)),
      uniqueAgents,
      successRate: 95 + Math.random() * 4.9,
    });
  }
  return trends;
}

// ============================================================
// API SIMULATION
// ============================================================
let searchCounter = 0;

export async function mockApiCall<T>(
  endpoint: string,
  data?: any
): Promise<{ success: boolean; data?: T; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));

  switch (endpoint) {
    case '/api/wallet':
      return { success: true, data: mockWallet as any };
    case '/api/wallet/transactions':
      return { success: true, data: mockTransactions as any };
    case '/api/analytics/overview':
      return { success: true, data: mockAnalytics.overview as any };
    case '/api/analytics/trends':
      return { success: true, data: mockAnalytics.trends as any };
    case '/api/analytics/realtime':
      return { success: true, data: mockAnalytics.realtime as any };
    case '/api/analytics/activity':
      return { success: true, data: mockActivity as any };
    case '/api/search':
      searchCounter++;
      if (searchCounter % 10 === 0) {
        // Simulate occasional failure for realism
        return { success: false, error: 'Search temporarily unavailable' };
      }
      return {
        success: true,
        data: {
          results: mockSearchResults,
          query: data?.query,
          timestamp: new Date().toISOString(),
        } as any,
      };
    default:
      return { success: false, error: 'Endpoint not found' };
  }
}

// ============================================================
// MOCK RECEIPT DATA
// ============================================================
export const mockReceipt = {
  transactionId: '0x7f8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
  confirmedRound: 34567890,
  network: 'Algorand Mainnet',
  amount: '1000',
  asset: 'USDC',
  status: 'confirmed' as const,
  timestamp: new Date().toISOString(),
  blockExplorerUrl: 'https://algoexplorer.io/tx/0x7f8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
};
