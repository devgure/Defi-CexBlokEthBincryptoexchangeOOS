# Sunny Platform

## Overview
Sunny is an All-in-One CEX + DeFi platform integrating centralized exchange with decentralized finance on an EVM-compatible PoS/DPoS blockchain.

## Features
- **CEX**: Spot, Margin, Futures trading
- **DeFi**: AMM DEX, Lending/Borrowing, Staking, Cross-chain Bridges
- **Fiat Gateway**: Instant on-ramp/off-ramp with KYC/AML
- **NFT Marketplace**: Trade, stake, and loan NFTs
- **Multi-Asset Wallet**: Support for SNY, stablecoins, BTC, ETH, etc.

## Architecture
- **Blockchain**: EVM-compatible PoS/DPoS chain using Solidity and Go/Cosmos SDK
- **Backend**: Node.js/NestJS for APIs, Python for ML fraud detection
- **Frontend**: React.js/TypeScript with Web3Modal
- **Database**: MongoDB for data, Redis for caching
- **Matching Engine**: Rust for high-performance order matching

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.20+
- Rust 1.70+
- Docker & Docker Compose
- MongoDB & Redis

### Installation
1. Clone the repo
2. Install dependencies:
   ```bash
   cd smart-contracts && npm install
   cd ../backend && npm install
   cd ../frontend && npm install
   cd ../blockchain-core && go mod download
   cd ../matching-engine && cargo build
   ```
3. Start local dev environment:
   ```bash
   cd deployment && docker-compose up
   ```

### API Documentation
- REST API: [OpenAPI Spec](api-specs/openapi.yaml)
- WebSocket: [WebSocket Spec](api-specs/websocket-spec.md)

## Deployment
- Local: `docker-compose up`
- VPS: Use Ansible playbook or Terraform scripts in `deployment/`

## Security
- HSM for key management
- Multi-sig wallets
- KYC/AML compliance
- Real-time fraud detection

## Contributing
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
See LICENSE file.
