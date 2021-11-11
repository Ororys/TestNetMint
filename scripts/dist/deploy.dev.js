"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
var hre = require("hardhat"); // const rarities = require('../rarities.json');


function main() {
  var _ref, _ref2, owner, acc2, KnivesLegacy, knives_legacy;

  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ethers.getSigners());

        case 2:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 2);
          owner = _ref2[0];
          acc2 = _ref2[1];
          _context.next = 8;
          return regeneratorRuntime.awrap(ethers.getContractFactory("KnivesLegacy"));

        case 8:
          KnivesLegacy = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(KnivesLegacy.deploy("KnivesLegacy", "KNIVES", "https://kniveslegacy.s3.eu-west-2.amazonaws.com/metadata/", "0xcd23889A2dD59650295b4b7d417e71D0c7b4727d"));

        case 11:
          knives_legacy = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(knives_legacy.deployed());

        case 14:
          console.log("NFT deployed to:", knives_legacy.address); // await knives_legacy.setRarities(rarities)
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

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main().then(function () {
  return process.exit(0);
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});