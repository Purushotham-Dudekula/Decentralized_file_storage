# Decentralized_file_storage

A Decentralized File Storage DApp built using Solidity smart contracts, Truffle, and a React.js frontend. The application allows users to upload a file, generate its hash, and store or retrieve the hash on the Ethereum blockchain — ensuring tamper-proof and secure records.

---

## ✅ Features

- Upload files and generate their hash
- Store file hash on Ethereum blockchain
- Retrieve stored file hashes from blockchain
- Immutable proof of file existence
- Full-stack decentralized application using Web3

---

## 🧠 Technologies Used

| Layer          | Tech Stack                          |
|----------------|--------------------------------------|
| Smart Contract | Solidity                             |
| Blockchain     | Ethereum (via Truffle / Ganache)     |
| Frontend       | React.js, JavaScript, Web3.js        |
| Tools          | Node.js, Truffle, Metamask           |

---

## 📁 Project Directory Structure

Decentralized_file_storage/
│
├── contracts/ # Solidity smart contracts
│ ├── Migrations.sol
│ └── storeHash.sol
│
├── migrations/ # Truffle migration scripts
│
├── src/ # React frontend
│ ├── App.js
│ ├── ImageRetrieval.js
│ ├── contractABI.js
│ └── ... (other React files)
│
├── build/ # (Auto-generated) Compiled contracts
├── test/ # Smart contract tests
├── public/ # Static assets & index.html
├── package.json
└── truffle-config.js

yaml
Copy code

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- Ganache (or any local Ethereum blockchain)
- Truffle
- Metamask browser extension

---

### Step-by-Step

1. **Clone the repository**
```bash
git clone https://github.com/your-username/Decentralized_file_storage.git
cd Decentralized_file_storage
Install dependencies

bash
Copy code
npm install
Compile and deploy smart contracts

bash
Copy code
truffle compile
truffle migrate --reset
Start the React application

bash
Copy code
npm start
Connect Metamask

Configure Metamask to the same network (Ganache)

Import an account using Ganache private key (optional)

💡 Future Improvements (Optional)
Integrate IPFS to actually store files, not just hashes

Add file preview and history

Deploy to a public Ethereum testnet (like Goerli or Sepolia)

