const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const AssetContract = await hre.ethers.getContractFactory("AssetContract");
  const assetContract = await AssetContract.deploy();
  await assetContract.deployed();
  console.log("AssetContract deployed to:", assetContract.address);

  const RoyaltyContract = await hre.ethers.getContractFactory("RoyaltyContract");
  const royaltyContract = await RoyaltyContract.deploy();
  await royaltyContract.deployed();
  console.log("RoyaltyContract deployed to:", royaltyContract.address);

  const MarketplaceContract = await hre.ethers.getContractFactory("MarketplaceContract");
  const marketplaceContract = await MarketplaceContract.deploy();
  await marketplaceContract.deployed();
  console.log("MarketplaceContract deployed to:", marketplaceContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });