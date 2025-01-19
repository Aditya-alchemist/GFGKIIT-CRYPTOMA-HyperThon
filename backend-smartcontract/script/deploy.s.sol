// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/nft.sol";

contract DeployTicketNFT is Script {
    function run() external {
        vm.startBroadcast();

    
        TicketNFT ticketNFT = new TicketNFT("NFTTICKET", "NFTT");

    
        console.log("TicketNFT deployed at:", address(ticketNFT));

    
        vm.stopBroadcast();
    }
}