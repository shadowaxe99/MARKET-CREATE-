// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AssetContract.sol";
import "./RoyaltyContract.sol";

contract MarketplaceContract is ReentrancyGuard, Ownable {
    /**
     * @dev Market for listing and purchasing assets.
     */
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
        assetContract = AssetContract(_assetContractAddress);
        royaltyContract = RoyaltyContract(_royaltyContractAddress);
    }

    function listAsset(uint256 assetId, uint256 price) external nonReentrant {
        require(assetContract.exists(assetId), "Asset does not exist");
        require(assetContract.ownerOf(assetId) == msg.sender, "Only asset owner can list");
        require(price > 0, "Price must be greater than zero");
        require(assetContract.ownerOf(assetId) == msg.sender, "Only asset owner can list");
        require(price > 0, "Price must be greater than zero");

        listings[assetId] = Listing({
            assetId: assetId,
            seller: payable(msg.sender),
            price: price,
            isActive: true
        });

        emit AssetListed(assetId, msg.sender, price);
    }

    function buyAsset(uint256 assetId) external payable nonReentrant {
        Listing memory listing = listings[assetId];
        require(listing.isActive, "Asset is not for sale");
        require(msg.value >= listing.price, "Insufficient funds sent");

        // Transfer funds to the seller
        listing.seller.transfer(listing.price);
        emit AssetSold(assetId, listing.seller, msg.sender, listing.price);

        // Transfer ownership of the asset to the buyer
        assetContract.safeTransferFrom(listing.seller, msg.sender, assetId);

        // Pay royalties if applicable
        if (royaltyContract.hasRoyalties(assetId)) {
            uint256 royaltyAmount = royaltyContract.calculateRoyalty(assetId, listing.price);
            address payable creator = royaltyContract.getCreator(assetId);
            creator.transfer(royaltyAmount);
        }

        // Mark the listing as inactive
        listings[assetId].isActive = false;

        emit AssetSold(assetId, listing.seller, msg.sender, listing.price);
    }

    function cancelListing(uint256 assetId) external nonReentrant {
        require(listings[assetId].seller == msg.sender, "Only seller can cancel listing");
        listings[assetId].isActive = false;
    }

    function updateListingPrice(uint256 assetId, uint256 newPrice) external nonReentrant {
        require(listings[assetId].seller == msg.sender, "Only seller can update price");
        require(newPrice > 0, "Price must be greater than zero");
        listings[assetId].price = newPrice;
    }

    // Additional functions like updateAssetContractAddress and updateRoyaltyContractAddress
    // can be added to manage contract dependencies and ensure the marketplace remains up to date
    // with the latest contract addresses.
}