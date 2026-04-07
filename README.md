# 🏥 Secure Electronic Health Records (EHR)

A blockchain-powered Electronic Health Record system built with **React**, **Solidity**, **Truffle**, and **IPFS (Pinata)**. Records are stored on IPFS and linked on-chain, ensuring tamper-proof, decentralized medical data management.

## ✨ Features

- 👤 **Patient Portal** — Register, upload medical records, grant/revoke doctor access
- 🩺 **Doctor Portal** — View authorized patients, access medical records
- 🔬 **Diagnostic Center** — Upload diagnostic reports linked to patients
- 📁 **IPFS Storage** — Files stored on Pinata Cloud (decentralized)
- 🔐 **Blockchain Security** — All records and permissions stored on Ethereum smart contracts
- 🦊 **MetaMask Integration** — Wallet-based authentication

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, CSS3 |
| Smart Contracts | Solidity 0.8.19 |
| Blockchain | Ganache (local) / Ethereum |
| Framework | Truffle v5 |
| File Storage | Pinata Cloud (IPFS) |
| Wallet | MetaMask |

## 🚀 Quick Start (One Command)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Truffle](https://trufflesuite.com/) (`npm install -g truffle`)
- [MetaMask](https://metamask.io/) browser extension

### 1. Clone & Install

```bash
git clone <https://github.com/ambrishraj06/Blockchain-in-EHR-.git>
cd Blockchain-in-EHR-
npm install
```

### 2. Configure Pinata (IPFS)

1. Create a free account at [pinata.cloud](https://www.pinata.cloud/)
2. Go to **API Keys** → **New Key** → Enable **Admin** access
3. Copy `.env.example` to `.env` and add your keys:

```bash
cp .env.example .env
```

```env
REACT_APP_PINATA_API_KEY=your_api_key
REACT_APP_PINATA_SECRET_KEY=your_secret_key
REACT_APP_PINATA_GATEWAY=https://gateway.pinata.cloud
```

### 3. Start Everything (Automated)

**Option A — Single npm command (recommended):**
```bash
npm run dev
```
This automatically:
- ✅ Starts Ganache blockchain on port 7546
- ✅ Deploys all smart contracts
- ✅ Launches the React frontend on port 3000

**Option B — Windows batch file:**
```bash
start.bat
```

**Option C — Manual steps:**
```bash
# Terminal 1: Start Ganache
npm run ganache

# Terminal 2: Deploy contracts
npm run deploy

# Terminal 3: Start frontend
cd src && npm start
```

### 4. Configure MetaMask

Add the Ganache network to MetaMask:

| Field | Value |
|-------|-------|
| Network Name | `Ganache` |
| RPC URL | `http://127.0.0.1:7546` |
| Chain ID | `5777` |
| Currency Symbol | `ETH` |

### 5. Open App

Visit **http://localhost:3000** 🎉

## 📁 Project Structure

```
Secure-Electronic-Health-Records/
├── public/                  # Static assets
├── scripts/
│   ├── start-ganache.js     # Programmatic Ganache startup
│   └── deploy-contracts.js  # Contract deployment script
├── src/
│   ├── build/contracts/     # Compiled contract ABIs
│   ├── components/          # React components
│   ├── contracts/           # Solidity smart contracts
│   ├── migrations/          # Truffle migrations
│   ├── pinata.js            # IPFS upload utilities
│   ├── truffle-config.js    # Truffle configuration
│   └── index.js             # App entry point
├── .env                     # Pinata API keys (not committed)
├── .env.example             # Template for .env
├── package.json
├── start.bat                # One-click Windows startup
└── README.md
```

## 📜 Smart Contracts

| Contract | Purpose |
|----------|---------|
| `PatientRegistration.sol` | Patient registration & details |
| `DoctorRegistration.sol` | Doctor registration, patient permissions |
| `DiagnosticRegistration.sol` | Diagnostic center registration |
| `UploadEhr.sol` | Medical record storage (per-patient IPFS CIDs) |

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | **Start everything** (Ganache + Deploy + Frontend) |
| `npm run ganache` | Start Ganache blockchain only |
| `npm run deploy` | Deploy contracts to running Ganache |
| `npm start` | Start React frontend only |
| `npm run build` | Build production bundle |
| `start.bat` | Windows one-click startup |

## 👥 User Roles

### Patient
1. Register with wallet address, personal details, and HH number
2. Upload medical records (stored on IPFS)
3. Grant/revoke doctor access using doctor's HH number
4. View all uploaded records

### Doctor
1. Register with professional details and HH number
2. View patients who have granted access
3. View patient medical records and details

### Diagnostic Center
1. Register center with details and HH number
2. Upload diagnostic reports linked to patient HH number
3. Reports automatically visible in patient's record view

## 📄 License

MIT
