// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../MarketplaceContract.sol";
import "../AssetContract.sol";
import "../RoyaltyContract.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketplaceContractTest {
    MarketplaceContract private marketplaceContract;
    AssetContract private assetContract;
    RoyaltyContract private royaltyContract;

    event AssetListed(uint256 indexed assetId, address indexed owner, uint256 price);
    event AssetSold(uint256 indexed assetId, address indexed seller, address indexed buyer, uint256 price);

    struct Listing {
        uint256 assetId;
        address payable seller;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;

    constructor(address _assetContractAddress, address _royaltyContractAddress) {
        marketplaceContract = MarketplaceContract(_assetContractAddress, _royaltyContractAddress);
        assetContract = AssetContract(_assetContractAddress);
        royaltyContract = RoyaltyContract(_royaltyContractAddress);
    }

    function testListAsset(uint256 assetId, uint256 price) public {
        require(assetContract.ownerOf(assetId) == msg.sender, "Only asset owner can list");
        require(price > 0, "Price must be greater than zero");

        marketplaceContract.listAsset(assetId, price);

        emit AssetListed(assetId, msg.sender, price);
    }

    function testBuyAsset(uint256 assetId) public payable {
        Listing memory listing = marketplaceContract.listings(assetId);
        require(listing.isActive, "Asset is not for sale");
        require(msg.value >= listing.price, "Insufficient funds sent");

        marketplaceContract.buyAsset(assetId);

        emit AssetSold(assetId, listing.seller, msg.sender, listing.price);
    }

    function testCancelListing(uint256 assetId) public {
        require(listings[assetId].seller == msg.sender, "Only seller can cancel listing");
        listings[assetId].isActive = false;
    }

    function testUpdateListingPrice(uint256 assetId, uint256 newPrice) public {
        require(listings[assetId].seller == msg.sender, "Only seller can update price");
        require(newPrice > 0, "Price must be greater than zero");
        listings[assetId].price = newPrice;
    }
}
