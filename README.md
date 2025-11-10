# 🪶 HorneroHub - Decentralized Hackathon Platform

**Where builders nest ideas.**

> A transparent, automated, and fair hackathon platform built on Stellar's Soroban smart contracts.

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-09B3AF?style=for-the-badge&logo=stellar)](https://stellar.org)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![DoraHacks](https://img.shields.io/badge/DoraHacks-Scaffold%20Stellar-orange?style=for-the-badge)](https://dorahacks.io/hackathon/scaffoldstellar)

---

## 🌟 Overview

**HorneroHub** is a decentralized application (dApp) that revolutionizes how hackathons are organized, judged, and rewarded in the Web3 ecosystem. Built on Stellar's Soroban platform, HorneroHub eliminates intermediaries, manual payment processing, and opaque voting systems.

### The Problem

Traditional hackathon platforms face several challenges:
- 💸 **Manual prize distribution** - Delays and payment errors
- 📝 **Opaque judging** - Lack of transparency in voting
- 🏦 **Centralized control** - Trust required in organizers
- 💰 **High fees** - Platform cuts and payment processing costs
- ⏰ **Time-consuming administration** - Manual spreadsheets and reconciliation

### Our Solution

HorneroHub leverages blockchain technology to create a trustless, automated system where:
- ✅ Smart contracts handle all prize distributions automatically
- ✅ Votes are transparent and verifiable on-chain
- ✅ Funds are held securely in a decentralized treasury
- ✅ Winners receive payments instantly to their wallets
- ✅ Minimal platform fees (3%) with no hidden costs

---

## 🏗️ Architecture

HorneroHub is built using a modular architecture with five key layers:

```
┌─────────────────────────────────────────────┐
│           🖥️  Frontend (React)              │
│   theahaco/scaffold-stellar Template        │
│   User Interface for Teams & Judges         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│      ⚙️  Backend / Indexer (Optional)       │
│   Node.js/Rust + Supabase                   │
│   Metadata Storage & Event Indexing         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│     🧠  Smart Contract (Soroban/Rust)       │
│   HorneroContract - Core Logic              │
│   Voting, Registration, Distribution        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        💰  Treasury (On-Chain Wallet)       │
│   USDC/XLM Prize Pool Management            │
│   Automated Distribution Logic              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        🌐  DAO Governance (Future)          │
│   Token-based Decision Making               │
│   Community-driven Protocol Upgrades        │
└─────────────────────────────────────────────┘
```

### Layer Breakdown

#### 1️⃣ **Smart Contract Layer** (Soroban)
The brain of the system - all critical logic lives on-chain:
- Project registration with ownership tracking
- Judge assignment and vote verification
- Vote tallying with anti-fraud measures (1 vote per judge per project)
- Results calculation and ranking
- Event emissions for transparency

**Contract Address (Testnet):**  
`GAA4LWDEHA3Z6TTTCPW5P4LIUPFM4LDWUMHCHAV2636OKD5ZMTZRAWVG`

[View on Stellar.Expert →](https://stellar.expert/explorer/testnet/account/GAA4LWDEHA3Z6TTTCPW5P4LIUPFM4LDWUMHCHAV2636OKD5ZMTZRAWVG)

#### 2️⃣ **Frontend Layer** (Scaffold-Stellar)
Built with [theahaco/scaffold-stellar](https://github.com/theahaco/scaffold-stellar):
- React + Vite + Tailwind CSS
- Wallet integration (Freighter, Albedo)
- Real-time transaction signing
- Responsive design for mobile/desktop
- Pre-configured Soroban SDK integration

#### 3️⃣ **Backend/Indexer** (Optional)
Enhances user experience without compromising decentralization:
- Stores rich metadata (project descriptions, images, slides)
- Indexes blockchain events for fast querying
- Caches leaderboards and analytics

#### 4️⃣ **Treasury Management**
On-chain fund custody and distribution:
- Holds hackathon prize pool (USDC/XLM)
- Automated payouts based on voting results
- Platform fee retention (configurable, default 3%)
- Multi-team splits with custom share percentages

#### 5️⃣ **DAO Governance** (Roadmap)
Future community-driven features:
- JURY governance tokens
- Protocol parameter voting
- Treasury allocation decisions
- Hackathon format proposals

---

## 🚀 Features

### For Organizers
- 🎯 **One-Click Hackathon Creation** - Deploy a new hackathon in minutes
- 👨‍⚖️ **Judge Management** - Add/remove judges with on-chain verification
- 💵 **Automated Payouts** - No manual transfers needed
- 📊 **Real-Time Analytics** - Track participation and voting progress
- 🔒 **Secure Treasury** - Funds locked in smart contract until completion

### For Teams/Builders
- 📝 **Simple Registration** - Connect wallet and submit project details
- 👥 **Team Shares** - Define custom percentage splits among members
- 🔗 **IPFS Integration** - Decentralized hosting for project assets
- 💰 **Direct Payments** - Receive winnings instantly to your wallet
- 🏆 **NFT Badges** - Commemorative achievements on-chain

### For Judges
- ⚖️ **Transparent Voting** - All votes recorded immutably
- 🎯 **Point-Based System** - Flexible scoring (1-5 points)
- ✅ **Vote Verification** - Prevents double-voting automatically
- 📱 **Mobile-Friendly** - Vote from anywhere with wallet signature

---

## 💡 How It Works

### The Happy Path

```
┌──────────────────────────┐
│ 🧱 Organizer Creates      │
│    Hackathon              │
│ • Sets judge list         │
│ • Deposits prize pool     │
│   (USDC/XLM)              │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ 👩‍💻 Teams Register         │
│ • Project name & details  │
│ • Team wallet addresses   │
│ • Share percentages       │
│ • IPFS metadata link      │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ ⚖️ Judges Vote On-Chain   │
│ • 1-5 points per project  │
│ • Wallet signature req'd  │
│ • Votes publicly visible  │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ 🧮 Contract Calculates    │
│    Winner                 │
│ • Sums all judge scores   │
│ • Verifies vote integrity │
│ • Orders final ranking    │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ 💸 Treasury Distributes   │
│    Funds Automatically    │
│ • USDC sent to winners    │
│ • Respects team shares    │
│ • Retains platform fee    │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ 🎉 Results Published      │
│ • Winner announcements    │
│ • Full leaderboard        │
│ • Project links & demos   │
└──────────────────────────┘
```

---

## 🛠️ Technical Stack

| Component | Technology |
|-----------|-----------|
| **Smart Contracts** | Rust + Soroban SDK |
| **Blockchain** | Stellar Testnet/Mainnet |
| **Frontend Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Wallet Integration** | Freighter, Albedo |
| **Backend (Optional)** | Node.js/Axum + Supabase |
| **Storage** | IPFS (via Pinata/Web3.Storage) |
| **Deployment** | Vercel / GitHub Pages |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js >= 18.14.1
- Rust >= 1.71.0
- Stellar CLI (soroban-cli)
- Freighter Wallet Extension

### Quick Start

1. **Clone the Repository**
```bash
git clone https://github.com/theahaco/scaffold-stellar.git
cd scaffold-stellar
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Network**
```bash
stellar network add --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"
```

4. **Generate Identity**
```bash
stellar keys generate --global your-key-name --network testnet
stellar keys address your-key-name
```

5. **Fund Your Account**
Visit [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test) to get testnet lumens.

6. **Build & Deploy Contract**
```bash
cd contracts/hornero-contract
cargo build --target wasm32-unknown-unknown --release

stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hornero_contract.wasm \
  --network testnet \
  --source your-key-name
```

7. **Initialize Contract**
```bash
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source your-key-name \
  --network testnet \
  -- initialize \
  --admin YOUR_WALLET_ADDRESS
```

8. **Start Frontend**
```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 🎮 Usage Examples

### Register a Project

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source builder-wallet \
  --network testnet \
  -- register_project \
  --owner BUILDER_ADDRESS \
  --name "My Awesome dApp"
```

### Add a Judge

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source admin-wallet \
  --network testnet \
  -- add_judge \
  --admin ADMIN_ADDRESS \
  --judge JUDGE_ADDRESS
```

### Cast a Vote

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source judge-wallet \
  --network testnet \
  -- vote \
  --judge JUDGE_ADDRESS \
  --project_id 1 \
  --points 5
```

### Get Results

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --network testnet \
  -- get_results
```

---

## 💰 Revenue Model

HorneroHub is designed to be sustainable while remaining affordable:

| Revenue Stream | Description | Example |
|----------------|-------------|---------|
| 💸 **On-Chain Fee** | % of prize pool | 3% of $10,000 = $300 |
| 🎟️ **Registration Fee** | Per hackathon created | $50 USDC |
| 🤝 **Sponsorships** | Corporate partnerships | Logo placement, featured tracks |
| 🪩 **NFT Trophies** | Commemorative badges | "Hornero Builder 2025" - $5 |
| 🧑‍💼 **White-Label** | Custom deployments | University/corporate instances |

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- [x] Core smart contract development
- [x] Basic frontend with Scaffold-Stellar
- [x] Wallet integration (Freighter)
- [x] Testnet deployment
- [ ] Security audit

### Phase 2: Enhanced Features
- [ ] IPFS metadata integration
- [ ] Multi-token support (USDC, XLM, custom tokens)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Mobile-responsive design improvements

### Phase 3: DAO Governance
- [ ] JURY governance token launch
- [ ] On-chain voting for platform decisions
- [ ] Treasury management by token holders
- [ ] Proposal submission system

### Phase 4: Ecosystem Expansion
- [ ] White-label solutions for enterprises
- [ ] Integration with other hackathon platforms
- [ ] Cross-chain bridge support
- [ ] Educational content and tutorials

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **theahaco** - For the amazing [scaffold-stellar](https://github.com/theahaco/scaffold-stellar) template
- **Stellar Development Foundation** - For Soroban and developer resources
- **DoraHacks** - For hosting the Scaffold-Stellar hackathon
- **The Hornero Bird** 🪶 - Inspiration for our collaborative building philosophy

---

<div align="center">
  
**Built with ❤️ for the Stellar ecosystem**

*Just like the hornero bird builds its nest brick by brick, we're building the future of hackathons—one block at a time.*

[Get Started](#-installation--setup) • [View Demo](#) • [Read Docs](#)

</div>