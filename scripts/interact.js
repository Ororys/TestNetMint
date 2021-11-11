const hre = require("hardhat");
NFT=require('../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json')

async function main() {
  const [owner, acc2] = await ethers.getSigners();

  nftaddress = "0xa2F0a96B89eD33d82809ba3fa368fd9d03F91a11"
  let contract = new ethers.Contract(nftaddress, NFT.abi, owner)
  let tx = await contract.withdraw()
  // let tx = await contract.setBaseURI("https://ipfs.io/ipfs/QmS9usYyEnLXtozT9JEaLEktKYitErEAigQxkN6vZhWBUR/")
  // tx.wait()
  let uri = await contract.tokenURI(1)

  console.log(uri)

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
