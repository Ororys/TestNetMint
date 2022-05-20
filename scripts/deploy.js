// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
// const rarities = require('../rarities.json');

async function main() {
  const [owner, acc2] = await ethers.getSigners();


  const KnivesLegacy = await ethers.getContractFactory("KnivesLegacy");
  const knives_legacy = await KnivesLegacy.deploy("KnivesLegacy", "KNIVES","https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/","0xd9d2176F94135824Ba8D5768ba8edb61D08E21f4");
  await knives_legacy.deployed();
  console.log("NFT deployed to:", knives_legacy.address);
 
  // await knives_legacy.setRarities(rarities)
  // let rarity1 = await knives_legacy.getRarity(1)
  // let rarity2 = await knives_legacy.getRarity(2)
  // let rarity3 = await knives_legacy.getRarity(3)
  // let rarity65 = await knives_legacy.getRarity(65)
  // console.log(rarity2.toNumber())
  // console.log(rarity3.toNumber())
  // console.log(rarity65.toNumber())
  // await pony.setBaseURI("https://gateway.pinata.cloud/ipfs/QmVtfWfm5yPFEy7DoSasXFob2iuXtfyBbmpbLZkFDCD927/")
  //unpause
//   await pony.setMarketplaceState(marketAddress)
//   await market.setApprovedCollections(pony.address)
//   await pony.pause(false)
  // setMarketplaceState(nftMarket.address)
  // let listingPrice = await nftMarket.getListingPrice()
  // listingPrice = listingPrice.toString()
  //   // console.log(listingPrice)
  // for(let i = 0; i<10000; i++){
  //   console.log(i)
  //   let transaction = await nft.mint({gasLimit: 20000000, gasPrice: 20000000000})
  //   await transaction.wait()
  //   console.log("minted!")
  //   let j = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
  //   let price = ethers.utils.parseUnits(j.toString(), 'ether') 
  //   transaction = await nftMarket.createMarketItem(nft.address, i, price, {gasLimit: 20000000, gasPrice: 20000000000, value: listingPrice })
  //   await transaction.wait()
  //   console.log("listed!")
  //   }
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
