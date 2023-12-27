import { ethers } from "ethers";

async function deployContracts() {
  // We get the contract to deploy
  const AssetContract = await ethers.getContractFactory("ERC721");
  const assetContract = await AssetContract.deploy();
  await assetContract.deployed();
  console.log("AssetContract deployed to:", assetContract.address);

  const RoyaltyContract = await ethers.getContractFactory("Ownable");
  const royaltyContract = await RoyaltyContract.deploy();
  await royaltyContract.deployed();
  console.log("RoyaltyContract deployed to:", royaltyContract.address);

  const MarketplaceContract = await ethers.getContractFactory("MarketplaceContract");
  const marketplaceContract = await MarketplaceContract.deploy();
  await marketplaceContract.deployed();
  console.log("MarketplaceContract deployed to:", marketplaceContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployContracts()
  .then(() => console.log('Contracts deployed successfully!'))
  .catch((error) => {
    console.error('Error deploying contracts:', error);
    process.exit(1);
  });