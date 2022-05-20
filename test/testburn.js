// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Knives Legacy Test2", function () {
//     let KnivesLegacy;
//     let KnivesLegacyV2;
//     let KnivesItems;
//     let KnivesStaking;
//     let LegacyToken;
//     let ItemFactory;
//     let addr1;
//     let addr2;
//     let addr3;
//     let knives_legacy;
//     let knives_items;
//     let legacy_token;
//     let knives_staking;
//     let item_factory;

//     before(async function () {
//         // Get the ContractFactory and Signers here.
//         [owner, addr1, addr2, addr3] = await ethers.getSigners();
//         KnivesLegacy = await ethers.getContractFactory("KnivesLegacy");
//         knives_legacy = await KnivesLegacy.deploy("KnivesLegacy", "KNIVES", "https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", addr2.address);
//         await knives_legacy.deployed();

//         KnivesLegacyV2 = await ethers.getContractFactory("KnivesLegacyV2");
//         knives_legacy_v2 = await KnivesLegacyV2.deploy("https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", knives_legacy.address);
//         await knives_legacy_v2.deployed();

//         KnivesItems = await ethers.getContractFactory("KnivesItems");
//         knives_items = await KnivesItems.deploy();
//         await knives_items.deployed();

//         LegacyToken = await ethers.getContractFactory("LegacyToken");
//         legacy_token = await LegacyToken.deploy();
//         await legacy_token.deployed();

//         KnivesStaking = await ethers.getContractFactory("KnivesStaking");
//         knives_staking = await KnivesStaking.deploy(knives_legacy_v2.address, legacy_token.address);
//         await knives_staking.deployed();

//         ItemFactory = await ethers.getContractFactory("ItemFactory");
//         item_factory = await ItemFactory.deploy(knives_items.address, knives_legacy_v2.address, knives_staking.address, legacy_token.address);
//         await knives_staking.deployed();

//         await knives_items.setItemFactory(item_factory.address)

//         await legacy_token.addAuthorized(knives_staking.address)
//         await knives_items.addAuthorized(item_factory.address)
//         await legacy_token.addAuthorized(item_factory.address)




//     });
//     describe("NFT", function () {
//         it("Should unpause the contract", async function () {

//             const setPauseTx = await knives_legacy.pause(false);

//             // wait until the transaction is mined
//             await setPauseTx.wait();

//             expect(await knives_legacy.paused()).to.equal(false);
//         });
//         it("Should not allow addr1 to unpause", async function () {
//             await expect(knives_legacy.connect(addr1).pause(true)).to.be.revertedWith("Ownable: caller is not the owner");
//             expect(await knives_legacy.paused()).to.equal(false);
//         });

//         it("Should mint two NFT for free to the owner", async function () {
//             await knives_legacy.mint(2);
//             expect(await knives_legacy.balanceOf(owner.address)).to.equal(2);
//         });

//         it("Should not mint an NFT for free to the sender", async function () {
//             await expect(knives_legacy.connect(addr1).mint(1)).to.be.reverted;
//             expect(await knives_legacy.balanceOf(addr1.address)).to.equal(0);
//         });

//         it("Should mint two NFT for 1 ether to the sender", async function () {
//             let n_nft = 2
//             let cost_wei = await knives_legacy.cost()
//             let total_cost_wei = n_nft * cost_wei
//             total_cost_wei = total_cost_wei.toString()
//             await knives_legacy.connect(addr1).mint(n_nft, { value: total_cost_wei });
//             expect(await knives_legacy.balanceOf(addr1.address)).to.equal(2);
//         });


//         it("Should migrate a knife for owner and addr1", async function () {
//             // the migrated knife from v1 is moved to the owner wallet. The user is then able to mint the same V2 knife for free.
//             //addr1
//             expect(await knives_legacy.balanceOf(addr1.address)).to.equal(2);
//             let token_ids = await knives_legacy.connect(addr1).walletOfOwner()
//             let token_id = token_ids[0].toNumber()
//             await knives_legacy.connect(addr1).approve(knives_legacy_v2.address, token_id);
//             await knives_legacy_v2.connect(addr1).migrate(token_id);
//             expect(await knives_legacy.balanceOf(addr1.address)).to.equal(1);
//             expect(await knives_legacy_v2.balanceOf(addr1.address)).to.equal(1);
//             // owner
//             expect(await knives_legacy.balanceOf(owner.address)).to.equal(3); // +1 from addr1
//             token_ids = await knives_legacy.walletOfOwner()
//             token_id = token_ids[0].toNumber()
//             let token_id2 = token_ids[1].toNumber()
//             await knives_legacy.approve(knives_legacy_v2.address, token_id);
//             await knives_legacy.approve(knives_legacy_v2.address, token_id2);
//             await knives_legacy_v2.migrate(token_id);
//             await knives_legacy_v2.migrate(token_id2);
//             await knives_legacy_v2.mint(1);
//             expect(await knives_legacy.balanceOf(owner.address)).to.equal(3);
//             expect(await knives_legacy_v2.balanceOf(owner.address)).to.equal(3);

//         });
//     });

    
//     describe("Missions", function () {
//         // it("Should run an item mission with a staked knife", async function () {
//         //     expect(await knives_items.balanceOf(owner.address)).to.equal(0)
//         //     let token_ids = await knives_staking.getDepositedTokens(owner.address)
//         //     let token_id = token_ids[0].toNumber()
//         //     await item_factory.mission(1, token_id)
//         //     expect(await knives_items.balanceOf(owner.address)).to.equal(1)
//         // });
//         // it("Should equip the item and have a score of 8", async function () {
//         //     expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(0)
//         //     let token_ids = await knives_items.walletOfOwner()
//         //     let token_id = token_ids[0].toNumber()
//         //     await item_factory.equipItem(token_id)
//         //     expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(8)
//         // });
//         // it("Should Unequip the item and have a score of 0", async function () {
//         //     expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(8)
//         //     let token_id = await item_factory.equipments(owner.address, 1)
//         //     await item_factory.unequipItem(token_id, owner.address)
//         //     expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(0)
//         // });

//         it("Should make 3 item missions and upgrade item boots to tier2", async function () {
//             expect(await knives_items.balanceOf(owner.address)).to.equal(0)
//             let lgcy_bal = await legacy_token.balanceOf(owner.address)
//             lgcy_bal = ethers.utils.formatUnits(lgcy_bal, 18)
//             // let token_ids = await knives_legacy_v2.walletOfOwner()
//             // let token_id = token_ids[0].toNumber()
//             token_ids = await knives_legacy_v2.walletOfOwner()
//             token_ids_int = token_ids.map(i => i.toNumber())
//             let token_id2 = token_ids[0].toNumber()
//             await item_factory.mission(1, token_ids_int[0])
//             await item_factory.mission(1, token_ids_int[0])
//             await item_factory.mission(1, token_ids_int[0])
//             expect(await knives_items.balanceOf(owner.address)).to.equal(3)
//             let item_ids = await knives_items.walletOfOwner()
//             let item_ids_int = item_ids.map(i => i.toNumber())
//             await legacy_token.approve(item_factory.address, ethers.utils.parseUnits("100"))
//             await knives_items.setApprovalForAll(item_factory.address, true)
//             await item_factory.upgradeItem(item_ids_int[0], item_ids_int[1], item_ids_int[2])
//             expect(await knives_items.balanceOf(owner.address)).to.equal(1)
//             let lgcy_bal_after = await legacy_token.balanceOf(owner.address)
//             lgcy_bal_after = ethers.utils.formatUnits(lgcy_bal_after, 18)
//             expect(~~lgcy_bal_after).to.equal(lgcy_bal - 24)
//         });
        
//     });
// });
