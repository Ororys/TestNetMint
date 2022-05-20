NFT = require('../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json')
NFTV2 = require('../artifacts/contracts/KnivesLegacyV2.sol/KnivesLegacyV2.json')
const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const [owner, acc2] = await ethers.getSigners();
  let failed_idx = []
  let total_cached = 0
  // const KnivesLegacyV2 = await ethers.getContractFactory("KnivesLegacyV2");
  // const knives_legacy_v2 = await KnivesLegacyV2.deploy("https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", "0x7be6026396eb71465A78154C3dcEdA5B5b5b4269");
  // await knives_legacy_v2.deployed();
  // console.log("NFT collection deployed to:", knives_legacy_v2.address);

  nftaddress = "0x7be6026396eb71465A78154C3dcEdA5B5b5b4269"
  nftaddressv2 = "0x0C7f3Cb9Ae91aa555B94573F3d0AE2843D2fB330"
  const provider = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc")
  let contract = new ethers.Contract(nftaddress, NFT.abi, provider)
  let knives_legacy_v2 = new ethers.Contract(nftaddressv2, NFTV2.abi, owner)
  for (let i = 3677; i < 3685; i++) {
    console.log(i)
    try {
      let cache = await contract.cache(i)
      cache = cache.toNumber()
      let cache2 = await knives_legacy_v2.cache(i)
      cache2 = cache2.toNumber()
      if (cache != cache2) {

        await knives_legacy_v2.setCache(i, cache)
        console.log("cache[", i, "] = ", cache)
        total_cached += 1
        console.log("total-cached ", total_cached)
      }

      // all.push(i)
// 653 total cached 31

//1109  +20
//1849 +35
//4444 +123 -1 + 1 error

    } catch {
      console.log("error ", i)
      failed_idx.push(i)
      let items_s = JSON.stringify(failed_idx);
      fs.writeFileSync('failed_idx.json', items_s);
    }
  }

  let items_s = JSON.stringify(failed_idx);
  fs.writeFileSync('failed_idx.json', items_s);



}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
