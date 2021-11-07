// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner, acc2] = await ethers.getSigners();


  const KnivesLegacy = await ethers.getContractFactory("KnivesLegacy");
  const knives_legacy = await KnivesLegacy.deploy("KnivesLegacy", "KNIVES","baseuri.com","0x0","0x0");
  await knives_legacy.deployed();
  console.log("NFT deployed to:", knives_legacy.address);
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
