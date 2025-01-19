import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";


const CONTRACT_ADDRESS = "0xcc953a40dfeb38d145710c43c1a9daec39dfa413";
const PINATA_API_KEY = "223553f88ea60420fae4";
const PINATA_SECRET_KEY = "36b531be959f28db2b3a9b8672fe4243dd82ccf518624ebbffd1b5b1280ec78d";

const TICKET_IMAGES = [
  {
    id: 1,
    name: "VIP Ticket",
    description: "VIP Access with exclusive perks",
    price: "0.001",
    imageCID: "bafybeihhaivmosip2cjsmitl7c4kravijycx7vcroi6khymgmykn2oc6m4", 
  },
  {
    id: 2,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafybeicz3iot2pcpdgfcj3ay2m6vv2xgj4adbs7c6swq4gzta64xdwd7ha", 
  },
  {
    id: 3,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafkreieqtyraljoiaq6yrzmmh3jjljaoqmd2upr2xrkvea2yltcpfhtr5m", 
  },
  {
    id: 4,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafkreibnjbhrz6crn6s4qba3dcnxocdxz3lmpp4zdr4lcr25mvwgf744p4",
  }
];

const TICKET_NFT_ABI =[
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "TicketMinted",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "MAX_TICKETS",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "MINT_FEE",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getCurrentTicketCount",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getLastBuyerInfo",
      "outputs": [
          {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          }
      ],
      "name": "mintTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "lastBuyer",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "lastTokenId",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [metadataHash, setMetadataHash] = useState("");

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (err) {
        console.error("Error checking wallet:", err);
      }
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      setAccount(account);

      const prov = new ethers.BrowserProvider(window.ethereum);
      const sign = await prov.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, TICKET_NFT_ABI, sign);

      setProvider(prov);
      setSigner(sign);
      setContract(nftContract);

      
      const owner = await nftContract.owner();
      setIsOwner(owner.toLowerCase() === account.toLowerCase());

      const count = await nftContract.getCurrentTicketCount();
      setTicketCount(Number(count));

      window.ethereum.on("accountsChanged", handleAccountChange);
    } catch (err) {
      setError("Failed to connect wallet: " + err.message);
    }
  };

  const handleAccountChange = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      if (contract) {
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
      }
    } else {
      setAccount("");
      setIsOwner(false);
    }
  };

  const createMetadata = async (ticket) => {
    const metadata = {
      name: ticket.name,
      description: ticket.description,
      image: `https://gateway.pinata.cloud/ipfs/${ticket.imageCID}`,
      attributes: [
        {
          trait_type: "Ticket Type",
          value: ticket.name,
        },
        {
          trait_type: "Price",
          value: ticket.price + " ETH",
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );

      return response.data.IpfsHash;
    } catch (err) {
      console.error("Error uploading to Pinata:", err);
      throw new Error("Failed to upload metadata to Pinata");
    }
  };

  const mintTicket = async () => {
    if (!selectedTicket) {
      setError("Please select a ticket type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const metadataHash = await createMetadata(selectedTicket);
      setMetadataHash(metadataHash);

      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

      const tx = await contract.mintTicket(metadataUrl, {
        value: ethers.parseEther(selectedTicket.price),
      });

      await tx.wait();

      const newCount = await contract.getCurrentTicketCount();
      setTicketCount(Number(newCount));

      alert(`Ticket minted successfully!\nMetadata IPFS Hash: ${metadataHash}`);
    } catch (err) {
      setError("Failed to mint ticket: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const withdrawFunds = async () => {
    if (!isOwner) {
      setError("Only owner can withdraw funds");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      alert("Funds withdrawn successfully!");
    } catch (err) {
      setError("Failed to withdraw: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>NFT Event Tickets</h1>

      {!account ? (
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      ) : (
        <div className="content">
          <div className="account-info">
            <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
            {isOwner && <p className="owner-badge">Owner</p>}
          </div>

          <p className="ticket-count">Tickets Minted: {ticketCount}/50</p>

          <div className="ticket-grid">
            {TICKET_IMAGES.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-card ${selectedTicket?.id === ticket.id ? "selected" : ""}`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${ticket.imageCID}`}
                  alt={ticket.name}
                />
                <h3>{ticket.name}</h3>
                <p>{ticket.description}</p>
                <p className="price">{ticket.price} ETH</p>
              </div>
            ))}
          </div>

          {error && <p className="error">{error}</p>}

          <button
            onClick={mintTicket}
            disabled={loading || !selectedTicket}
            className="mint-button"
          >
            {loading ? "Processing..." : `Mint Ticket (${selectedTicket?.price || "0.001"} ETH)`}
          </button>

          {isOwner && (
            <button
              onClick={withdrawFunds}
              disabled={loading}
              className="withdraw-button"
            >
              {loading ? "Processing..." : "Withdraw Funds"}
            </button>
          )}

          {metadataHash && (
            <div className="metadata-info">
              <h3>Last Minted Ticket Metadata</h3>
              <p>IPFS Hash: {metadataHash}</p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${metadataHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on IPFS
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

