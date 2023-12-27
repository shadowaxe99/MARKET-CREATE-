// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import 
{Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title RoyaltyContract
 * @dev This contract allows creators to receive royalties for their assets.
 * It supports both ERC721 and ERC1155 NFT standards.
 */
contract RoyaltyContract is Ownable {
    using Counters for Counters.Counter;

    using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

    // Mapping from token ID to the creator's address
    mapping(uint256 => address) private _creators;

    // Mapping from token ID to the royalty percentage (using basis points for precision)
    mapping(uint256 => uint16) private _royalties;

    // Events
    event RoyaltySet(uint256 indexed tokenId, uint16 royaltyPercentage);
    event RoyaltyPaid(address indexed creator, uint256 amount);

    /**
     * @dev Sets the royalty information for a token.
     * @param tokenId The ID of the token
     * @param creator The address of the creator
     * @param royaltyPercentage The percentage of the sale price to be paid as royalties
     */
    function setRoyalty(uint256 tokenId, address creator, uint16 royaltyPercentage) external onlyOwner {
        require(creator != address(0), "RoyaltyContract: creator is the zero address");
        require(royaltyPercentage <= 10000, "RoyaltyContract: invalid royalty percentage");

        _creators[tokenId] = creator;
        _royalties[tokenId] = royaltyPercentage;

        emit RoyaltySet(tokenId, royaltyPercentage);
    }

    /**
     * @dev Pays royalties to the creator of the token.
     * @param tokenId The ID of the token
     * @param salePrice The sale price of the token
     */
    function payRoyalty(uint256 tokenId, uint256 salePrice) external payable {
        address creator = _creators[tokenId];
        require(creator != address(0), "RoyaltyContract: creator is the zero address");

        uint256 royaltyAmount = (salePrice * _royalties[tokenId]) / 10000;
        require(msg.value >= royaltyAmount, "RoyaltyContract: insufficient funds for royalty payment");

        payable(creator).transfer(royaltyAmount);

        emit RoyaltyPaid(creator, royaltyAmount);
    }

    /**
     * @dev Retrieves the royalty information for a token.
     * @param tokenId The ID of the token
     * @return creator The address of the creator
     * @return royaltyPercentage The royalty percentage
     */
    function getRoyaltyInfo(uint256 tokenId) external view returns (address creator, uint16 royaltyPercentage) {
        return (_creators[tokenId], _royalties[tokenId]);
    }
}