const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Elysium Marketplace Smart Contract Tests', function () {
  let AssetContract;
  let RoyaltyContract;
  let MarketplaceContract;
  let assetContract;
  let royaltyContract;
  let marketplaceContract;
  let owner;
  let user1;
  let user2;
  let users;

  before(async function () {
    AssetContract = await ethers.getContractFactory('AssetContract');
    RoyaltyContract = await ethers.getContractFactory('RoyaltyContract');
    MarketplaceContract = await ethers.getContractFactory('MarketplaceContract');
    [owner, user1, user2, ...users] = await ethers.getSigners();
  });

  beforeEach(async function () {
    assetContract = await AssetContract.deploy();
    royaltyContract = await RoyaltyContract.deploy();
    marketplaceContract = await MarketplaceContract.deploy(assetContract.address, royaltyContract.address);
    await assetContract.deployed();
    await royaltyContract.deployed();
    await marketplaceContract.deployed();
  });

  describe('Asset Creation', function () {
    it('should allow users to create a new asset', async function () {
      const tx = await assetContract.connect(user1).createAsset("Test Asset", "TEST", "test-uri", 10);
      await tx.wait();

      const asset = await assetContract.assets(0);
      expect(asset.name).to.equal("Test Asset");
      expect(asset.symbol).to.equal("TEST");
      expect(asset.uri).to.equal("test-uri");
      expect(asset.totalSupply.toNumber()).to.equal(10);
    });
  });

  describe('Marketplace Transactions', function () {
    it('should allow users to list and buy assets', async function () {
      // User1 creates an asset
      let tx = await assetContract.connect(user1).createAsset("Test Asset", "TEST", "test-uri", 10);
      await tx.wait();

      // User1 approves the marketplace to handle their asset
      tx = await assetContract.connect(user1).setApprovalForAll(marketplaceContract.address, true);
      await tx.wait();

      // User1 lists the asset on the marketplace
      const assetId = 0;
      const price = ethers.utils.parseEther("1");
      tx = await marketplaceContract.connect(user1).listItem(assetId, price);
      await tx.wait();

      // User2 buys the asset
      tx = await marketplaceContract.connect(user2).purchaseItem(assetId, { value: price });
      await tx.wait();

      // Verify the ownership of the asset
      const ownerOfAsset = await assetContract.ownerOf(assetId);
      expect(ownerOfAsset).to.equal(user2.address);
    });
  });

  describe('Royalty Payments', function () {
    it('should distribute royalties on asset resale', async function () {
      // User1 creates an asset and lists it on the marketplace
      let tx = await assetContract.connect(user1).createAsset("Royalty Asset", "ROYAL", "royalty-uri", 5);
      await tx.wait();
      tx = await assetContract.connect(user1).setApprovalForAll(marketplaceContract.address, true);
      await tx.wait();
      const assetId = 0;
      const initialPrice = ethers.utils.parseEther("1");
      tx = await marketplaceContract.connect(user1).listItem(assetId, initialPrice);
      await tx.wait();

      // User2 buys the asset
      tx = await marketplaceContract.connect(user2).purchaseItem(assetId, { value: initialPrice });
      await tx.wait();

      // User2 lists the asset at a higher price
      const resalePrice = ethers.utils.parseEther("2");
      tx = await marketplaceContract.connect(user2).listItem(assetId, resalePrice);
      await tx.wait();

      // User1's balance before the resale
      const balanceBefore = await ethers.provider.getBalance(user1.address);

      // User3 buys the asset, triggering royalty payment
      tx = await marketplaceContract.connect(users[0]).purchaseItem(assetId, { value: resalePrice });
      await tx.wait();

      // User1's balance after the resale should be higher due to royalty
      const balanceAfter = await ethers.provider.getBalance(user1.address);
      expect(balanceAfter).to.be.above(balanceBefore);
    });
  });

  // Additional tests for security features, compliance, and other contract functions can be added here
});