// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../RoyaltyContract.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RoyaltyContractTest is RoyaltyContract {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    function testSetRoyalty(uint256 tokenId, address creator, uint16 royaltyPercentage) public {
        require(creator != address(0), "RoyaltyContractTest: creator is the zero address");
        require(royaltyPercentage <= 10000, "RoyaltyContractTest: invalid royalty percentage");

        setRoyalty(tokenId, creator, royaltyPercentage);
    }

    function testPayRoyalty(uint256 tokenId, uint256 salePrice) public payable {
        payRoyalty(tokenId, salePrice);
    }

    function testGetRoyaltyInfo(uint256 tokenId) public view returns (address creator, uint16 royaltyPercentage) {
        return getRoyaltyInfo(tokenId);
    }
}
