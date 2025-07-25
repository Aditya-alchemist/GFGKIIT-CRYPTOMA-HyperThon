# 🎟️ NFT-Based Event Ticketing System

[contributors-shield]: https://img.shields.io/github/contributors/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon.svg?style=for-the-badge
[contributors-url]: https://github.com/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon.svg?style=for-the-badge
[forks-url]: https://github.com/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon/network/members
[stars-shield]: https://img.shields.io/github/stars/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon.svg?style=for-the-badge
[stars-url]: https://github.com/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon/stargazers
[issues-shield]: https://img.shields.io/github/issues/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon.svg?style=for-the-badge
[issues-url]: https://github.com/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon/issues
[license-shield]: https://img.shields.io/github/license/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon.svg?style=for-the-badge
[license-url]: https://github.com/Aditya-alchemist/GFGKIIT-CRYPTOMA-HyperThon/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555


This repository contains a smart contract and supporting details for an **NFT-based event ticketing system**. The project leverages **non-tradable NFTs** to create a secure, immutable, and transparent system for managing event tickets.

---

## 📝 Project Overview

This system implements the following key features:
- **Non-Tradable Tickets:** Each ticket is minted as a unique NFT that cannot be transferred or traded, ensuring authenticity and preventing ticket scalping.
- **Immutable Metadata:** Each ticket is associated with metadata (e.g., event details) stored on IPFS.
- **Minting Fee:** Users pay a fixed fee (`0.001 Ether`) to mint tickets.
- **Limited Supply:** A maximum of 50 tickets are available for minting.
- **Secure Withdrawals:** The contract owner can withdraw funds collected from ticket sales.

The deployed smart contract is available at:  
**Contract Address:** `0xcc953a40dfeb38d145710c43c1a9daec39dfa413`

---

## 🚀 Setup Instructions

### Prerequisites
Before you begin, ensure you have the following:
1. **Ethereum Wallet:** Install [MetaMask](https://metamask.io/).
2. **Node.js & npm:** Install from [Node.js official site](https://nodejs.org/).
3. **Ethereum Testnet Access:** Use Sepolia or Goerli test networks.

### Steps to Deploy and Use the Smart Contract

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/TicketNFT.git
   cd TicketNFT
   npm install

## 🌟 Features

- **Non-Tradable NFTs:**  
  Tickets are linked to the buyer’s wallet and cannot be resold or transferred, ensuring secure and fair distribution.

- **Fixed Minting Fee:**  
  Users pay `0.001 Ether` per ticket, making the system predictable and affordable.

- **Supply Limit:**  
  A maximum of 50 tickets ensures exclusivity.

- **Metadata Integration:**  
  Ticket details (e.g., event name, date, and seat number) are stored as metadata, uploaded to IPFS for decentralization.

- **Secure Withdrawals:**  
  Only the contract owner can withdraw funds from the contract.

## 🛠️ Tech Stack

### Blockchain
- **Solidity:** Programming language for smart contracts.
- **Ethereum:** Blockchain platform for deployment.
- **OpenZeppelin:** Libraries for ERC721 implementation.

### Frontend 
- **React.js:** Framework for building the user interface.
- **ethers.js:** Library for blockchain interactions.

### Decentralized Storage
- **IPFS/Pinata:** For storing ticket metadata and ensuring decentralization.

---

## 🔧 Contract Functions

### Public Functions:
- **mintTicket(string memory uri):**  
  Allows users to mint a ticket by paying 0.001 Ether.  
  `uri` contains metadata stored on IPFS.

- **getCurrentTicketCount():**  
  Returns the total number of tickets minted.

- **getLastBuyerInfo():**  
  Returns the last buyer's address and the last minted token ID.

- **tokenURI(uint256 tokenId):**  
  Retrieves the metadata URI for the given token ID.

### Owner-Only Functions:
- **withdraw():**  
  Allows the contract owner to withdraw funds from the contract balance.

- **getOwner():**  
  Returns the owner's wallet address.

### Non-Transferable Override:
- **Internal _update Function:**  
  Prevents the transfer of tickets to ensure they remain non-tradable.

---

## 💡 Advantages of Non-Tradable NFTs Over QR Codes

- **Security:**  
  NFTs are tied to a wallet address and cannot be duplicated, unlike QR codes which can be easily forged or shared.

- **Prevent Scalping:**  
  By making NFTs non-transferable, it ensures tickets cannot be resold at inflated prices.

- **Transparency:**  
  All transactions are recorded on the blockchain, ensuring traceability and preventing fraud.

- **Immutable Metadata:**  
  Event details stored in the NFT metadata are tamper-proof when hosted on decentralized storage (e.g., IPFS).

- **Reusable Identity:**  
  The same NFT-based system can be extended to include user privileges, loyalty programs, and access control.

---

## 📄 Example Usage

### Minting a Ticket
1. Connect your wallet using MetaMask.
2. Call the `mintTicket` function, passing the metadata URI as input.
3. Pay 0.001 Ether as the minting fee.
4. The minted ticket NFT will appear in your wallet.

### Withdrawing Funds
1. The owner calls the `withdraw` function to transfer all collected funds to their wallet.

### Viewing Ticket Metadata
1. Call the `tokenURI` function with a token ID to retrieve the metadata URL.

---

## 🤝 Contributors

- **Aditya:**  
  Smart Contract Development, Frontend Integration and Documentation.

-**Aryan Kumar**:

  Smart Contract Development, Frontend Integration and Documentation


  ## Working video


https://github.com/user-attachments/assets/344ba586-6121-4b24-b389-d2a32e197c55

## 🌟 Features of Video

- **Owner-Only Fund Withdrawal:**  
  Only the contract owner can withdraw funds from the contract balance, ensuring control over the funds.

- **Limited Supply of Tickets:**  
  A maximum of 50 tickets can be minted, ensuring exclusivity for the event.

- **Soulbound Tickets:**  
  Each ticket is **soulbound**, meaning it is **untradable and unsellable**, ensuring that tickets cannot be resold or transferred.

- **Decentralized Storage:**  
  Ticket metadata is stored on a **decentralized database** using **Pinata-IPFS**, ensuring data immutability and censorship resistance.

## Upcomming updates 

-**Sending function**
users can send nft to selected networks which will be implemented on hyperledger


