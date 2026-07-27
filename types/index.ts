export interface Wallet {
  id: string;
  agentId: string;
  agentName: string;
  balance: number;
  availableBalance: number;
  locked: number;
  currency: string;
  walletAddress: string;
  limits: {
    daily: number | null;
    weekly: number | null;
    monthly: number | null;
    perTx: number | null;
  };
  spent: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  periodStart: {
    daily: string;
    weekly: string;
    monthly: string;
  };
}

export interface Transaction {
  id: string;
  txHash: string;
  amount: number;
  fee: number;
  service: string;
  description: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REVERTED';
  createdAt: string;
  confirmedAt?: string;
}

export interface AnalyticsOverview {
  totalQueries: number;
  totalRevenue: number;
  activeAgents: number;
  successfulQueries: number;
  failedQueries: number;
  successRate: number;
  averageResponseTime: number;
  chainBreakdown: Array<{ chainId: string; count: number; revenue: number }>;
  topAgents: Array<{ agentId: string; agentName: string; queryCount: number }>;
}

export interface DailyTrend {
  date: string;
  queries: number;
  revenue: number;
  uniqueAgents: number;
  successRate: number;
}

export interface RealtimeStats {
  timestamp: string;
  queriesInLastHour: number;
  successfulQueriesInLastHour: number;
  revenueInLastHour: number;
  activeAgentsInLastHour: number;
  successRate: number;
  queriesPerSecond: number;
}

export interface ActivityEvent {
  id: string;
  eventType: 'QUERY' | 'PAYMENT' | 'DEPOSIT' | 'WITHDRAWAL' | 'WALLET_CREATED' | 'ERROR';
  agentId: string | null;
  agentName: string | null;
  chainId: string | null;
  query: string | null;
  txHash: string | null;
  amount: string | null;
  duration: number | null;
  success: boolean;
  createdAt: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  publishedAt?: string;
  source?: string;
}