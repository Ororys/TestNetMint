const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Knives Stakooor", function () {
    let KnivesLegacy;
    let KnivesLegacyV2;
    let KnivesItems;
    let KnivesStaking;
    let LegacyToken;
    let ItemFactory;
    let addr1;
    let addr2;
    let addr3;
    let knives_legacy;
    let knives_items;
    let legacy_token;
    let knives_staking;
    let item_factory;

    before(async function () {
        // Get the ContractFactory and Signers here.
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        KnivesLegacy = await ethers.getContractFactory("KnivesLegacy");
        knives_legacy = await KnivesLegacy.deploy("KnivesLegacy", "KNIVES", "https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", addr2.address);
        await knives_legacy.deployed();

        KnivesLegacyV2 = await ethers.getContractFactory("KnivesLegacyV2");
        knives_legacy_v2 = await KnivesLegacyV2.deploy("https://ipfs.io/ipfs/QmPng9SjXxB3Vsud6h2rZPPjnVgSWFN1eGKRaAJ8JfFVfd/", knives_legacy.address);
        await knives_legacy_v2.deployed();

        KnivesItems = await ethers.getContractFactory("KnivesItems");
        knives_items = await KnivesItems.deploy();
        await knives_items.deployed();

        LegacyToken = await ethers.getContractFactory("LegacyToken");
        legacy_token = await LegacyToken.deploy();
        await legacy_token.deployed();

        KnivesStaking = await ethers.getContractFactory("KnivesStaking");
        knives_staking = await KnivesStaking.deploy(knives_legacy_v2.address, legacy_token.address);
        await knives_staking.deployed();

        ItemFactory = await ethers.getContractFactory("ItemFactory");
        item_factory = await ItemFactory.deploy(knives_items.address, knives_legacy_v2.address, knives_staking.address, legacy_token.address);
        await knives_staking.deployed();

        await knives_items.setItemFactory(item_factory.address)

        await legacy_token.addAuthorized(knives_staking.address)
        await knives_items.addAuthorized(item_factory.address)
        await legacy_token.addAuthorized(item_factory.address)




    });
    describe("NFT", function () {
        it("Should unpause the contract", async function () {

            const setPauseTx = await knives_legacy.pause(false);

            // wait until the transaction is mined
            await setPauseTx.wait();

            expect(await knives_legacy.paused()).to.equal(false);
        });
        it("Should not allow addr1 to unpause", async function () {
            await expect(knives_legacy.connect(addr1).pause(true)).to.be.revertedWith("Ownable: caller is not the owner");
            expect(await knives_legacy.paused()).to.equal(false);
        });

        it("Should mint one NFT for free to the owner", async function () {
            await knives_legacy.mint(2);
            expect(await knives_legacy.balanceOf(owner.address)).to.equal(2);
        });



        it("Should migrate a knife for owner", async function () {
            
            // owner
            expect(await knives_legacy.balanceOf(owner.address)).to.equal(2); 
            token_ids = await knives_legacy.walletOfOwner()
            let token_id = token_ids[0].toNumber()
            await knives_legacy.setApprovalForAll(knives_legacy_v2.address, true);
            await knives_legacy_v2.migrate(token_id);
            await knives_legacy_v2.migrate(token_ids[1].toNumber());
            expect(await knives_legacy_v2.balanceOf(owner.address)).to.equal(2);

        });
    });

    
    describe("Staking", function () {
        

        it("Should stake a knife", async function () {
            expect(await knives_legacy_v2.balanceOf(owner.address)).to.equal(2)
            expect(await knives_staking.stakedAmount(owner.address)).to.equal(0)
            let token_ids = await knives_legacy_v2.walletOfOwner()
            token_ids = token_ids.map(i => i.toNumber())
            let locked_amount = await legacy_token.lockOf(owner.address)
            console.log("locked amount", ethers.utils.formatUnits(locked_amount, 18))
            await knives_legacy_v2.setApprovalForAll(knives_staking.address, true)
            await knives_staking.depositSelected(token_ids)
            expect(await knives_staking.stakedAmount(owner.address)).to.equal(2)
            expect(await knives_legacy_v2.balanceOf(owner.address)).to.equal(0)
            await ethers.provider.send("evm_increaseTime", [3600 * 24 * 60])
            await knives_legacy_v2.mint(1);
            let knife_reward = await knives_staking.calculateReward(token_ids[0]);
            console.log("knife reward", ethers.utils.formatUnits(knife_reward, 18))
            let pending = await knives_staking.getPendingRewards(owner.address)
            console.log("pending ", ethers.utils.formatUnits(pending, 18))
            locked_amount = await legacy_token.lockOf(owner.address)
            console.log("locked amount", ethers.utils.formatUnits(locked_amount, 18))
        });
        
    });
});
