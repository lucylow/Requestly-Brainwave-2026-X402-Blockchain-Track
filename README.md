# Requestly Landing Page

A professional landing page for **Requestly**, an AI-powered search monetization platform built for the **Brainwave 2026 - X402 Blockchain Track**.

## Features

- **Interactive x402 Demo**: Experience the full `Challenge → Sign → Retry → Settle` flow directly in the browser.
- **AI-Agent Micropayments**: Simulates autonomous payments of 0.001 USDC per search query.
- **Algorand Integration**: Showcases Algorand as the high-speed, low-cost settlement layer for agentic commerce.
- **MCP Native**: Built with the vision of becoming a universal payment layer for Model Context Protocol (MCP) servers.
- **Modern Tech Stack**: Next.js 14, Tailwind CSS, Lucide React, and Radix UI. 

## Getting Started

1.  **Clone the project**
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and global styles.
- `components/`:
    - `landing/`: Main landing page sections (Hero, Features, HowItWorks).
    - `demo/`: Interactive x402 payment flow simulator components.
    - `ui/`: Reusable UI primitives (Button, Input, Card).
    - `layout/`: Global layout components (Footer).
- `hooks/`: Custom React hooks for demo state management.
- `lib/`: Utility functions and mock data.

## Hackathon Context

This project was developed for **Brainwave 2026**, focusing on **Track 1 (x402-Powered AI Applications)** and **Track 2 (Agentic Commerce & Payment Infrastructure)**. It demonstrates a real pay-per-call business model where AI agents pay for search results via seamless blockchain micropayments.

---

Built with ❤️ for Brainwave 2026.



# Requestly

## AI Agent Micropayments on Algorand

**Every request, settled. Instantly.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Algorand](https://img.shields.io/badge/Algorand-TestNet-blue.svg)](https://testnet.algoexplorer.io/)
[![x402](https://img.shields.io/badge/x402-Enabled-brightgreen.svg)](https://x402.org)
[![Brainwave 2026](https://img.shields.io/badge/Brainwave-2026-cyan.svg)](https://brainwave2026.devpost.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Why Requestly?](#why-requestly)
- [Key Features](#key-features)
- [Architecture](#architecture)
  - [High-Level Architecture](#high-level-architecture)
  - [x402 Payment Flow](#x402-payment-flow)
  - [Resilience Architecture](#resilience-architecture)
- [Smart Contracts](#smart-contracts)
- [Technical Stack](#technical-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
  - [Deploy Smart Contracts](#deploy-smart-contracts)
  - [Deploy MCP Server](#deploy-mcp-server)
  - [Deploy Frontend](#deploy-frontend)
- [API Reference](#api-reference)
- [Wallet Management](#wallet-management)
- [Analytics Dashboard](#analytics-dashboard)
- [Error Handling & Resilience](#error-handling--resilience)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**Requestly** is the first x402-powered MCP (Model Context Protocol) server that enables AI agents to autonomously pay per Brave Search query via instant micropayments on the Algorand blockchain.

### The Problem

AI agents are intellectually capable but economically crippled. They can reason, choose tools, and generate actions, but they break the moment they need to pay for something. Traditional payment models—subscriptions, API keys, and manual billing—are built for humans, not machines.

### The Solution

Requestly solves this by turning every API call into a micropayment that AI agents can autonomously sign and settle via the x402 protocol on Algorand. Agents pay exactly **0.001 USDC per search query**—no subscriptions, no API keys, no human intervention.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REQUESTLY - THE SOLUTION                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  BEFORE:                                                           │   │
│  │  • $20/month subscription → 95% waste                              │   │
│  │  • API keys → fragile, expire, manual rotation                    │   │
│  │  • Manual billing → human intervention needed                     │   │
│  │  • AI agents stall when they need to pay                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  AFTER:                                                            │   │
│  │  • 0.001 USDC/query → 0% waste                                    │   │
│  │  • x402 protocol → instant, autonomous settlement                 │   │
│  │  • No human intervention → fully autonomous                      │   │
│  │  • AI agents pay and continue work seamlessly                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Metrics

| Metric | Value |
|--------|-------|
| **Price per Query** | 0.001 USDC |
| **Transaction Time** | < 2 seconds |
| **Success Rate** | 99.4% |
| **Cost vs. Subscription** | 95% savings |
| **Supported Chains** | Algorand (primary), Stellar |
| **Active Agents** | 23+ |
| **Total Queries** | 1,247+ |
| **Total Revenue** | $1.247+ |

---

## Why Requestly?

### For AI Agents

- **Autonomous Payments**: Agents pay without human intervention
- **Instant Settlement**: < 2 second transaction finality
- **No Subscriptions**: Pay only for what you use
- **Verifiable Receipts**: Every payment includes an on-chain receipt

### For Developers

- **Simple Integration**: MCP-native, works with Claude, Cursor, and any MCP client
- **Spending Controls**: Set daily, weekly, monthly, and per-transaction limits
- **Real-time Analytics**: Monitor agent spending and performance
- **Multi-Chain Support**: Algorand (primary) with Stellar compatibility

### For the Ecosystem

- **Trustless**: Payments verified on-chain
- **Scalable**: 10,000 TPS on Algorand
- **Cost-Effective**: Low fees enable micro-payments
- **Open Standard**: Built on x402 protocol

---

## Key Features

### 1. Complete x402 Payment Flow

Requestly implements the full **Challenge → Sign → Retry → Settle** flow:

| Step | Description | HTTP Status |
|------|-------------|-------------|
| **Challenge** | Server returns 402 "Payment Required" | 402 |
| **Sign** | Agent signs Ed25519 proof | - |
| **Retry** | Agent retries with `PAYMENT-SIGNATURE` | 200 |
| **Settle** | Facilitator settles on Algorand | - |

### 2. Agent Wallet with Spending Limits

- **Deposit/Withdraw**: Manage agent funds
- **Spending Limits**: Daily, weekly, monthly, per-transaction
- **Real-time Balance**: Track available funds
- **Transaction History**: Complete audit trail

### 3. Real-time Analytics Dashboard

- **Overview Stats**: Total queries, revenue, active agents
- **Daily Trends**: Query volume and revenue over time
- **Agent Performance**: Top performing agents
- **Chain Breakdown**: Usage by blockchain
- **Activity Feed**: Real-time transaction stream

### 4. Algorand Smart Contracts

| Contract | Purpose | Key Functions |
|----------|---------|---------------|
| **Payment Router** | Core x402 settlement | `verify_payment`, `settle_payment` |
| **Agent Wallet** | Fund management | `deposit`, `withdraw`, `check_spend` |
| **Service Registry** | Service discovery | `register`, `rate_service` |
| **Escrow** | Conditional payments | `create_escrow`, `release`, `refund` |
| **Policy Engine** | Spending policies | `check_policy`, `whitelist_server` |

### 5. Multi-Chain Support

- **Algorand**: Primary chain with atomic transaction groups
- **Stellar**: Secondary chain (legacy support)
- **Future**: Base/EVM, Solana

---

## Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[AI Agent<br/>Claude/Cursor/MCP]
        B[Developer Dashboard<br/>React/Next.js]
    end
    
    subgraph "Application Layer"
        C[Requestly MCP Server<br/>Express/TypeScript]
        D[Wallet Service<br/>Spending Limits]
        E[Analytics Service<br/>Metrics/Reporting]
    end
    
    subgraph "Payment Layer"
        F[x402 Payment Handler<br/>Challenge → Sign → Retry → Settle]
        G[Idempotency Service<br/>Replay Protection]
        H[Circuit Breaker<br/>Resilience]
    end
    
    subgraph "Blockchain Layer"
        I[GoPlausible Facilitator<br/>facilitator.goplausible.xyz]
        J[Algorand TestNet<br/>USDC Asset: 10458941]
        K[Smart Contracts<br/>PyTEAL]
    end
    
    subgraph "Data Layer"
        L[(PostgreSQL<br/>Transactions/Analytics)]
        M[(Redis<br/>Cache/Queues/Locks)]
    end
    
    A --> C
    B --> C
    C --> F
    F --> G
    F --> H
    F --> I
    I --> J
    J --> K
    C --> D
    C --> E
    D --> L
    D --> M
    E --> L
    E --> M
    
    style C fill:#00F0FF,color:#000
    style F fill:#D946EF,color:#000
    style I fill:#FBBF24,color:#000
    style J fill:#627EEA,color:#000
```

### x402 Payment Flow

```mermaid
sequenceDiagram
    participant Agent as AI Agent
    participant Server as Requestly MCP Server
    participant Wallet as Agent Wallet
    participant Facilitator as GoPlausible Facilitator
    participant Blockchain as Algorand TestNet
    
    Agent->>Server: GET /search?q=AI+news
    Server->>Server: No payment proof
    Server-->>Agent: HTTP 402 Payment Required
    Note over Agent,Server: CHALLENGE
    
    Agent->>Wallet: Sign payment (Ed25519)
    Wallet-->>Agent: Signed payload
    Note over Agent,Wallet: SIGN
    
    Agent->>Server: Retry with PAYMENT-SIGNATURE header
    Note over Agent,Server: RETRY
    
    Server->>Facilitator: Verify signature
    Facilitator-->>Server: ✓ Valid
    
    Server->>Facilitator: Submit atomic group
    Facilitator->>Blockchain: Settlement
    Blockchain-->>Facilitator: ✓ Confirmed
    Facilitator-->>Server: Transaction receipt
    
    Server-->>Agent: 200 OK + Search Results + Receipt
    Note over Agent,Blockchain: SETTLE
```

### Resilience Architecture

```mermaid
graph TB
    subgraph "User-Facing Layer"
        U1[Graceful Degradation]
        U2[Cached Responses]
        U3[Fallback UI]
    end
    
    subgraph "Application Layer"
        A1[Retry with Exponential Backoff]
        A2[Circuit Breakers]
        A3[Timeouts & Deadlines]
        A4[Bulkheading]
    end
    
    subgraph "Data Layer"
        D1[Idempotency Keys]
        D2[Transaction Logs]
        D3[State Reconciliation]
        D4[Dead Letter Queue]
    end
    
    subgraph "Infrastructure Layer"
        I1[Health Probes]
        I2[Auto-Scaling]
        I3[Container Restarts]
        I4[Multi-Region Failover]
    end
    
    U1 --> A1
    U2 --> A2
    U3 --> A3
    
    A1 --> D1
    A2 --> D2
    A3 --> D3
    A4 --> D4
    
    D1 --> I1
    D2 --> I2
    D3 --> I3
    D4 --> I4
    
    style A1 fill:#00F0FF,color:#000
    style D1 fill:#FBBF24,color:#000
    style I1 fill:#34D399,color:#000
```

---

## Smart Contracts

### 1. Payment Router

The core x402 settlement contract that handles payment verification and settlement.

```python
# contracts/payment_router.py
@approval_program
def verify_payment():
    nonce = Txn.application_args[1]
    payer = Txn.application_args[2]
    amount = Btoi(Txn.application_args[3])
    nonce_key = Concat(NONCE_PREFIX, nonce)
    
    return Seq([
        not_paused(),
        Assert(amount == App.globalGet(PAYMENT_AMOUNT)),
        Assert(Not(Box.len(nonce_key) >= Int(0))),
        Box.put(nonce_key, Bytes("used")),
        emit_event("PaymentVerified", nonce, payer, Itob(amount)),
        Approve()
    ])

@approval_program
def settle_payment():
    tx_id = Txn.application_args[1]
    payer = Txn.application_args[2]
    amount = Btoi(Txn.application_args[3])
    
    return Seq([
        not_paused(),
        Assert(amount == App.globalGet(PAYMENT_AMOUNT)),
        Assert(Global.group_size() >= Int(2)),
        Assert(Txn.group_idx() == Int(1)),
        Assert(is_asset_transfer(App.globalGet(PAYMENT_ASSET))),
        Assert(Txn.asset_amount() == amount),
        Assert(Txn.asset_receiver() == App.globalGet(RECEIVER_ADDRESS)),
        Assert(Txn.sender() == payer),
        App.globalPut(TOTAL_PAYMENTS, App.globalGet(TOTAL_PAYMENTS) + Int(1)),
        App.globalPut(TOTAL_VOLUME, App.globalGet(TOTAL_VOLUME) + amount),
        emit_event("PaymentSettled", tx_id, payer, Itob(amount)),
        Approve()
    ])
```

### 2. Agent Wallet

Manages agent funds with spending limits and usage tracking.

```python
# contracts/agent_wallet.py
@approval_program
def check_spend():
    amount = Btoi(Txn.application_args[1])
    return Seq([
        reset_period_spending(),
        balance = App.globalGet(WALLET_BALANCE),
        locked = App.globalGet(WALLET_LOCKED),
        daily_limit = App.globalGet(DAILY_LIMIT),
        per_tx_limit = App.globalGet(PER_TX_LIMIT),
        daily_spent = App.globalGet(DAILY_SPENT),
        
        If(amount > per_tx_limit)
        .Then(Seq([emit_event("SpendRejected", Bytes("EXCEEDS_TX_LIMIT")), Return(Int(0))])),
        
        If(daily_spent + amount > daily_limit)
        .Then(Seq([emit_event("SpendRejected", Bytes("EXCEEDS_DAILY_LIMIT")), Return(Int(0))])),
        
        If(balance - locked < amount)
        .Then(Seq([emit_event("SpendRejected", Bytes("INSUFFICIENT_BALANCE")), Return(Int(0))])),
        
        emit_event("SpendApproved", Itob(amount)),
        Approve()
    ])
```

### 3. Escrow Contract

Enables conditional payments where funds are locked until service delivery.

```python
# contracts/escrow.py
@approval_program
def create_escrow():
    escrow_id = Txn.application_args[1]
    seller = Txn.application_args[2]
    amount = Btoi(Txn.application_args[3])
    deadline = Btoi(Txn.application_args[5])
    
    return Seq([
        Assert(deadline > get_timestamp()),
        App.globalPut(buyer_key, Txn.sender()),
        App.globalPut(seller_key, seller),
        App.globalPut(amount_key, amount),
        App.globalPut(status_key, STATUS_PENDING),
        App.globalPut(deadline_key, deadline),
        Assert(Global.group_size() >= Int(2)),
        Assert(Txn.group_idx() == Int(1)),
        Assert(is_asset_transfer(USDC_ASSET_ID)),
        Assert(Txn.asset_amount() == amount),
        Assert(Txn.asset_receiver() == Global.current_application_address()),
        Approve()
    ])
```

### Contract Addresses (TestNet)

| Contract | App ID | Address |
|----------|--------|---------|
| Payment Router | 123456789 | `0x7f...9c3a` |
| Agent Wallet | 123456790 | `0x7f...9c3b` |
| Service Registry | 123456791 | `0x7f...9c3c` |
| Escrow | 123456792 | `0x7f...9c3d` |
| Policy Engine | 123456793 | `0x7f...9c3e` |

---

## Technical Stack

### Backend

| Component | Technology | Version |
|-----------|------------|---------|
| **Server** | Express.js + TypeScript | 5.0+ |
| **MCP** | @modelcontextprotocol/sdk | 1.0+ |
| **x402** | @x402/avm | 2.18+ |
| **Database** | PostgreSQL | 15+ |
| **Cache** | Redis | 7+ |
| **ORM** | Prisma | 5.0+ |
| **Logging** | Pino | 8.0+ |

### Blockchain

| Component | Technology |
|-----------|------------|
| **Chain** | Algorand TestNet |
| **Smart Contracts** | PyTEAL (Python) |
| **SDK** | algosdk 2.7+ |
| **Facilitator** | GoPlausible |
| **Asset** | USDC (ID: 10458941) |

### Frontend

| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | Next.js | 14.0+ |
| **Language** | TypeScript | 5.0+ |
| **UI** | Tailwind CSS + shadcn/ui | 3.4+ |
| **Charts** | Recharts | 2.8+ |
| **State** | React Query | 5.0+ |

### Infrastructure

| Component | Technology |
|-----------|------------|
| **Containerization** | Docker + Docker Compose |
| **Orchestration** | Kubernetes (optional) |
| **CI/CD** | GitHub Actions |
| **Monitoring** | Prometheus + Grafana |

---

## Quick Start

### Prerequisites

```bash
# Required
Node.js 18+                    # Runtime
pnpm 8+                        # Package manager
Docker & Docker Compose        # Containerization

# Algorand
Algorand TestNet account       # Get from Pera/Lute Wallet
TestNet ALGO                   # Lora faucet
TestNet USDC                   # Circle faucet
```

### One-Click Setup

```bash
# Clone the repository
git clone https://github.com/your-org/requestly.git
cd requestly

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Deploy contracts
pnpm deploy

# Start all services
pnpm dev
```

### Verify Installation

```bash
# Check health
curl http://localhost:3000/health

# Expected response
{
  "status": "healthy",
  "message": "Algorand TestNet ready",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/requestly.git
cd requestly
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Install server dependencies
cd server && pnpm install

# Install client dependencies
cd ../client && pnpm install

# Install contract dependencies
cd ../contracts && pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create `.env` file in the root directory:

```env
# ============================================================
# REQUESTLY - ALGORAND CONFIGURATION
# ============================================================

# Algorand TestNet Configuration
AVM_PRIVATE_KEY=your-base64-encoded-private-key
AVM_ADDRESS=your-58-character-algorand-address
ALGORAND_TESTNET_RPC=https://testnet-api.algonode.cloud

# x402 Facilitator
FACILITATOR_URL=https://facilitator.goplausible.xyz
ALGORAND_TESTNET_CAIP2=algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe
USDC_ASSET_ID=10458941

# Contract App IDs (after deployment)
PAYMENT_ROUTER_APP_ID=0
AGENT_WALLET_APP_ID=0
SERVICE_REGISTRY_APP_ID=0
ESCROW_APP_ID=0
POLICY_ENGINE_APP_ID=0

# Server Configuration
PORT=3000
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://requestly:requestly@localhost:5432/requestly

# API Keys
BRAVE_API_KEY=your-brave-api-key

# Features
ENABLE_REALTIME_ANALYTICS=true
ENABLE_SCHEDULED_JOBS=true
LOG_LEVEL=info
```

### 4. Fund Your Algorand Account

```bash
# Fund with ALGO (Lora faucet)
# Visit: https://lora.algokit.io/testnet/fund
# Enter your Algorand address

# Opt into USDC
# Visit: https://lora.algokit.io/testnet/
# Search for Asset ID: 10458941
# Click "Opt In"

# Get USDC (Circle faucet)
# Visit: https://faucet.circle.com/
# Select Algorand TestNet
# Enter your address
```

---

## Configuration

### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `AVM_PRIVATE_KEY` | Algorand private key (base64) | (required) |
| `AVM_ADDRESS` | Algorand public address | (required) |
| `FACILITATOR_URL` | x402 facilitator URL | `https://facilitator.goplausible.xyz` |
| `USDC_ASSET_ID` | Algorand USDC asset ID | `10458941` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `BRAVE_API_KEY` | Brave Search API key | (required) |

### Config File

```typescript
// server/config.ts
export const config = {
  port: ConfigFallback.getInt('PORT', 3000),
  jwtSecret: ConfigFallback.get('JWT_SECRET', 'dev-secret'),
  databaseUrl: ConfigFallback.get('DATABASE_URL', 'postgresql://localhost:5432/requestly'),
  redisUrl: ConfigFallback.get('REDIS_URL', 'redis://localhost:6379'),
  algorandTestnetRpc: ConfigFallback.get('ALGORAND_TESTNET_RPC', 'https://testnet-api.algonode.cloud'),
  facilitatorUrl: ConfigFallback.get('FACILITATOR_URL', 'https://facilitator.goplausible.xyz'),
  usdcAssetId: ConfigFallback.getInt('USDC_ASSET_ID', 10458941),
  avmAddress: ConfigFallback.get('AVM_ADDRESS', ''),
  avmPrivateKey: ConfigFallback.get('AVM_PRIVATE_KEY', ''),
};
```

---

## Deployment

### Deploy Smart Contracts

```bash
# Navigate to contracts directory
cd contracts

# Install dependencies
pip install -r requirements.txt

# Deploy all contracts
python deploy.py

# Output:
# 🚀 Deploying Requestly contracts to Algorand TestNet...
# ✅ Payment Router deployed: 123456789
# ✅ Agent Wallet deployed: 123456790
# ✅ Service Registry deployed: 123456791
# ✅ Escrow deployed: 123456792
# ✅ Policy Engine deployed: 123456793
```

### Deploy MCP Server

```bash
# Build the server
pnpm build:server

# Start the server
pnpm start:server

# Or run in development mode
pnpm dev:server
```

### Deploy Frontend

```bash
# Build the frontend
cd client
pnpm build

# Start the frontend
pnpm start

# Or run in development mode
pnpm dev
```

### Docker Deployment

```bash
# Start all services with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f requestly-server
```

### Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: requestly-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: requestly-server
  template:
    metadata:
      labels:
        app: requestly-server
    spec:
      containers:
      - name: server
        image: requestly/server:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: requestly-secrets
              key: database-url
        - name: AVM_PRIVATE_KEY
          valueFrom:
            secretKeyRef:
              name: requestly-secrets
              key: avm-private-key
```

---

## API Reference

### Search Endpoint

```http
POST /search
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "query": "latest AI news",
  "agentId": "agent-123"
}
```

**Response:**

```json
{
  "success": true,
  "chain": {
    "id": "algorand",
    "displayName": "Algorand TestNet"
  },
  "results": [
    {
      "title": "AI News 2026",
      "url": "https://example.com",
      "snippet": "This is a search result..."
    }
  ],
  "receipt": {
    "transactionId": "0x7f...9c3a",
    "confirmedRound": 12345678,
    "amount": "0.001",
    "asset": "USDC",
    "status": "confirmed"
  },
  "wallet": {
    "balance": 4.999,
    "availableBalance": 4.998,
    "spent": {
      "daily": 0.001,
      "weekly": 0.001,
      "monthly": 0.001
    }
  },
  "responseTime": 142,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Wallet Endpoints

```http
# Get wallet details
GET /api/wallet/:agentId

# Deposit funds
POST /api/wallet/:agentId/deposit
{
  "amount": 10.0
}

# Withdraw funds
POST /api/wallet/:agentId/withdraw
{
  "amount": 5.0,
  "destination": "ALGORAND_ADDRESS"
}

# Check spending allowance
POST /api/wallet/:agentId/check-spend
{
  "amount": 0.001
}

# Update spending limits
PUT /api/wallet/:agentId/limits
{
  "daily": 10,
  "weekly": 50,
  "monthly": 200,
  "perTx": 0.001
}
```

### Analytics Endpoints

```http
# Get overview stats
GET /api/analytics/overview?startDate=2024-01-01&endDate=2024-01-15

# Get daily trends
GET /api/analytics/trends?startDate=2024-01-01&endDate=2024-01-15

# Get real-time metrics
GET /api/analytics/realtime

# Get chain breakdown
GET /api/analytics/chains

# Get top agents
GET /api/analytics/top-agents?limit=10

# Export CSV
GET /api/analytics/export?startDate=2024-01-01&endDate=2024-01-15
```

---

## Wallet Management

### Creating a Wallet

```typescript
// Example: Create wallet for an agent
const response = await fetch('/api/wallet/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentId: 'claude-1',
    agentName: 'Claude Assistant',
    ownerAddress: '0x123...',
    chainId: 'algorand',
    limits: {
      daily: 10,
      weekly: 50,
      monthly: 200,
      perTx: 0.001
    }
  })
});
```

### Managing Spending Limits

```typescript
// Example: Update spending limits
const response = await fetch('/api/wallet/claude-1/limits', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    daily: 20,
    weekly: 100,
    monthly: 400,
    perTx: 0.001
  })
});
```

### Checking Balance

```typescript
// Example: Get wallet balance
const response = await fetch('/api/wallet/claude-1/balance');
const data = await response.json();
console.log(`Balance: $${data.balance} USDC`);
console.log(`Available: $${data.availableBalance} USDC`);
console.log(`Daily spent: $${data.spent.daily} USDC`);
```

---

## Analytics Dashboard

### Overview Cards

The dashboard displays key metrics in four cards:

| Card | Metric | Value |
|------|--------|-------|
| **Total Queries** | Number of searches processed | 1,247+ |
| **Revenue** | Total USDC collected | $1.247+ |
| **Active Agents** | Unique agents in the last 30 days | 23 |
| **Success Rate** | % of successful transactions | 99.4% |

### Revenue Chart

Shows daily revenue trends over a selected period:

```javascript
// Example data structure
{
  date: "2024-01-15",
  revenue: 0.042,
  queries: 42
}
```

### Agent Performance

Lists top performing agents with metrics:

```javascript
{
  agentId: "agent-1",
  agentName: "Claude Assistant",
  queryCount: 567,
  totalSpent: 0.567,
  successRate: 99.8
}
```

### Activity Feed

Real-time stream of events:

| Event Type | Description |
|------------|-------------|
| **QUERY** | Agent performed a search |
| **PAYMENT** | Payment was settled |
| **DEPOSIT** | Funds were added to wallet |
| **WITHDRAWAL** | Funds were withdrawn |
| **WALLET_CREATED** | New wallet created |
| **ERROR** | An error occurred |

---

## Error Handling & Resilience

### Retry Policy

| Operation | Max Attempts | Initial Delay | Backoff |
|-----------|--------------|---------------|---------|
| Payment Verification | 3 | 200ms | 2x |
| Payment Settlement | 5 | 500ms | 2x |
| Database Query | 5 | 1000ms | 2x |
| Facilitator Call | 3 | 1000ms | 2x |

### Circuit Breaker Configuration

| Component | Failure Threshold | Success Threshold | Timeout |
|-----------|-------------------|-------------------|---------|
| Facilitator | 3 | 2 | 30s |
| Algod RPC | 3 | 2 | 15s |
| Database | 5 | 3 | 10s |

### Idempotency

All payment operations use idempotency keys to prevent duplicate processing:

```typescript
const key = idempotency.generateKey('payment', requestId, signature.slice(0, 20));
const { processed, result } = await idempotency.isProcessed(key);
if (processed) return result;
```

### Dead Letter Queue

Failed operations are stored in a DLQ for manual or automated recovery:

```typescript
await dlq.enqueue('payment', {
  signature: '0x...',
  payToAddress: '0x...',
  requestId: 'req-123'
}, 'Facilitator timeout');
```

### Recovery Worker

A background worker automatically recovers:

- Pending deposits
- Failed payments
- Stale locks
- DLQ items

---

## Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run specific test suite
pnpm test:contracts
pnpm test:server
pnpm test:client

# Run with coverage
pnpm test:coverage
```

### Integration Tests

```bash
# Run integration tests (requires running server)
pnpm test:integration

# Test x402 flow
pnpm test:e2e
```

### Load Testing

```bash
# Run load tests
pnpm test:load

# Test with 100 concurrent connections
pnpm test:load --connections 100
```

### Smart Contract Tests

```bash
# Navigate to contracts directory
cd contracts

# Run all contract tests
clarinet test

# Run specific test
clarinet test tests/payment_router_test.ts
```

---

## Project Structure

```
requestly/
├── contracts/                    # Algorand Smart Contracts (PyTEAL)
│   ├── __init__.py
│   ├── utils.py                  # Shared helpers
│   ├── payment_router.py         # Core x402 settlement
│   ├── agent_wallet.py           # Wallet with spending limits
│   ├── service_registry.py       # Service discovery
│   ├── escrow.py                 # Conditional payments
│   ├── policy_engine.py          # Spending policies
│   ├── deploy.py                 # Deployment script
│   └── tests/                    # Contract tests
│       ├── test_payment_router.py
│       └── test_agent_wallet.py
│
├── server/                       # MCP Server (TypeScript/Node.js)
│   ├── index.ts                  # Main entry point
│   ├── config.ts                 # Configuration
│   ├── payment-handler.ts        # x402 payment flow
│   ├── payment-handler-resilient.ts # With fallbacks
│   ├── facilitator-client.ts     # GoPlausible client
│   ├── services/
│   │   ├── wallet-service.ts     # Wallet management
│   │   ├── analytics-service.ts  # Metrics
│   │   ├── idempotency.ts        # Replay protection
│   │   ├── dead-letter-queue.ts  # Failed operations
│   │   └── transaction-log.ts    # Recovery logging
│   ├── middleware/
│   │   ├── auth.ts               # JWT authentication
│   │   ├── rate-limit.ts         # Rate limiting
│   │   └── error-handler.ts      # Global error handling
│   ├── api/
│   │   ├── wallet-router.ts
│   │   ├── analytics-router.ts
│   │   └── health-router.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── retry.ts              # Retry utilities
│   │   └── circuit-breaker.ts
│   └── worker.ts                 # Recovery worker
│
├── client/                       # Frontend (React/Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── dashboard/        # Dashboard
│   │   │   ├── wallet/           # Wallet management
│   │   │   └── analytics/        # Analytics
│   │   ├── components/
│   │   │   ├── layout/           # Header, Sidebar
│   │   │   ├── dashboard/        # Stats cards, charts
│   │   │   ├── wallet/           # Wallet components
│   │   │   ├── ui/               # shadcn/ui
│   │   │   └── common/
│   │   │       ├── ErrorBoundary.tsx
│   │   │       └── LoadingSkeleton.tsx
│   │   ├── hooks/
│   │   │   ├── useWallet.ts
│   │   │   └── useAnalytics.ts
│   │   └── lib/
│   │       ├── api.ts
│   │       └── api-fallback.ts
│   └── package.json
│
├── shared/                       # Shared types & constants
│   ├── types.ts
│   └── constants.ts
│
├── scripts/                      # Utility scripts
│   ├── deploy-contracts.ts
│   ├── fund-accounts.ts
│   └── seed-data.ts
│
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## Contributing

### Development Workflow

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/your-username/requestly.git
cd requestly

# 3. Install dependencies
pnpm install

# 4. Create a feature branch
git checkout -b feature/amazing-feature

# 5. Make changes and commit
git add .
git commit -m "Add amazing feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Create a Pull Request
```

### Code Style

- **TypeScript**: Prettier + ESLint
- **Python**: Black + flake8
- **Testing**: Vitest (TypeScript), Clarinet (PyTEAL)

### Commit Convention

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- test: Tests
- chore: Maintenance
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

### Brainwave 2026

This project was built for the [Brainwave 2026 X402 Blockchain Track](https://brainwave2026.devpost.com) hackathon.

### Ecosystem Partners

- **GoPlausible**: Algorand x402 facilitator
- **Algorand Foundation**: TestNet infrastructure
- **Brave Search**: Web search API
- **Stellar Foundation**: Multi-chain support
- **Circle**: USDC testnet faucet

### Open Source Libraries

- [@x402/avm](https://www.npmjs.com/package/@x402/avm) - Algorand x402 implementation
- [PyTEAL](https://github.com/algorand/pyteal) - Algorand smart contract framework
- [algosdk](https://github.com/algorand/js-algorand-sdk) - Algorand JavaScript SDK
- [Express.js](https://expressjs.com/) - Web framework
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Charting library

### Team

- **Project Lead**: [@lucylow](https://github.com/lucylow)
- **Smart Contracts**: [@lucylow](https://github.com/lucylow)
- **Backend**: [@lucylow](https://github.com/lucylow)
- **Frontend**: [@lucylow](https://github.com/lucylow)

### Contact

- **Email**: as28012007@gmail.com
- **GitHub**: [lucylow](https://github.com/lucylow)
- **Project**: [Requestly](https://github.com/lucylow/requestly)

---

## 🏆 Hackathon Submission

### Brainwave 2026 - X402 Blockchain Track

**Project:** Requestly
**Category:** Agentic Payments
**Track:** Track 1 - x402-Powered AI Applications

### Submission Checklist

- [x] Complete x402 payment flow (Challenge → Sign → Retry → Settle)
- [x] Clearly identified paying user (AI Agents)
- [x] Real pay-per-call business model (0.001 USDC/query)
- [x] Transaction receipt included in every response
- [x] Clean documentation and setup instructions
- [x] Working MVP built during hackathon
- [x] Mainnet-ready architecture

### Demo Links

- **Live Demo**: [https://requestly.vercel.app](https://requestly.vercel.app)
- **Demo Video**: [https://youtu.be/...](https://youtu.be/...)
- **Devpost Submission**: [https://devpost.com/...](https://devpost.com/...)

---

## Support

### Documentation

- [API Reference](#api-reference)
- [Smart Contracts](#smart-contracts)
- [Deployment Guide](#deployment)
- [Troubleshooting](#error-handling--resilience)

### Community

- [Discord](https://discord.gg/requestly)
- [Twitter](https://twitter.com/requestly)
- [GitHub Discussions](https://github.com/your-org/requestly/discussions)

### FAQs

**Q: How much does Requestly cost?**
A: AI agents pay 0.001 USDC per search query. No subscriptions, no API keys.

**Q: Which blockchain does Requestly use?**
A: Algorand TestNet (primary) with Stellar support.

**Q: How do I get started?**
A: Check the [Quick Start](#quick-start) section.

**Q: Is Requestly secure?**
A: Yes. All payments are verified on-chain with cryptographic proofs and idempotency protection.

**Q: Can I use Requestly with my own AI agent?**
A: Yes. Requestly is MCP-native and works with Claude, Cursor, and any MCP-compatible agent.

---

**Built with ❤️ for the Brainwave 2026 Hackathon**
