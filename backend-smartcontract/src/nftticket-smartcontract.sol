// SPDX-License-Identifier: MIT

pragma solidity 0.8.28; 

//deployed at 0xcc953a40dfeb38d145710c43c1a9daec39dfa413

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract TicketNFT is ERC721URIStorage, Ownable {
    uint256 public constant MINT_FEE = 0.001 ether;
    uint256 public constant MAX_TICKETS = 50;

    uint256 private _currentTokenId;
    address public lastBuyer;
    uint256 public lastTokenId;

    event TicketMinted(address indexed buyer, uint256 tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function mintTicket(string memory uri) public payable {
        require(msg.value == MINT_FEE, "Incorrect fee");
        require(_currentTokenId < MAX_TICKETS, "All tickets have been minted");

        uint256 tokenId = _currentTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        lastBuyer = msg.sender;
        lastTokenId = tokenId;

        _currentTokenId++;

        emit TicketMinted(msg.sender, tokenId);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function getCurrentTicketCount() external view returns (uint256) {
        return _currentTokenId;
    }

    function getLastBuyerInfo() external view returns (address buyer, uint256 tokenId) {
        return (lastBuyer, lastTokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "NFT is non-transferable");
        return super._update(to, tokenId, auth);
    }

    function getOwner() external view returns (address) {
        return owner();
    }


    function tokenURI(uint256 tokenId) 
        public 
        view 
        virtual 
        override 
        returns (string memory) 
    {
        return super.tokenURI(tokenId);
    }
}