const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Knives Legacy", function () {
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

    it("Should mint two NFT for free to the owner", async function () {
      await knives_legacy.mint(2);
      expect(await knives_legacy.balanceOf(owner.address)).to.equal(2);
    });

    it("Should not mint an NFT for free to the sender", async function () {
      await expect(knives_legacy.connect(addr1).mint(1)).to.be.reverted;
      expect(await knives_legacy.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should mint two NFT for 1 ether to the sender", async function () {
      let n_nft = 2
      let cost_wei = await knives_legacy.cost()
      let total_cost_wei = n_nft * cost_wei
      total_cost_wei = total_cost_wei.toString()
      await knives_legacy.connect(addr1).mint(n_nft, { value: total_cost_wei });
      expect(await knives_legacy.balanceOf(addr1.address)).to.equal(2);
    });


    it("Should migrate a knife for owner and addr1", async function () {
      // the migrated knife from v1 is moved to the owner wallet. The user is then able to mint the same V2 knife for free.
      //addr1
      expect(await knives_legacy.balanceOf(addr1.address)).to.equal(2);
      let token_ids = await knives_legacy.connect(addr1).walletOfOwner()
      let token_id = token_ids[0].toNumber()
      await knives_legacy.connect(addr1).approve(knives_legacy_v2.address, token_id);
      await knives_legacy_v2.connect(addr1).migrate(token_id);
      expect(await knives_legacy.balanceOf(addr1.address)).to.equal(1);
      expect(await knives_legacy_v2.balanceOf(addr1.address)).to.equal(1);
      // owner
      expect(await knives_legacy.balanceOf(owner.address)).to.equal(3); // +1 from addr1
      token_ids = await knives_legacy.walletOfOwner()
      token_id = token_ids[0].toNumber()
      let token_id2 = token_ids[1].toNumber()
      await knives_legacy.approve(knives_legacy_v2.address, token_id);
      await knives_legacy.approve(knives_legacy_v2.address, token_id2);
      await knives_legacy_v2.migrate(token_id);
      await knives_legacy_v2.migrate(token_id2);
      expect(await knives_legacy.balanceOf(owner.address)).to.equal(3);
      expect(await knives_legacy_v2.balanceOf(owner.address)).to.equal(2);

    });
  });

  describe("Staking", function () {
    it("Should deposit two NFT in the contract, claim and earn locked rewards", async function () {
      let token_ids = await knives_legacy_v2.walletOfOwner()
      let token_ids_int = token_ids.map(i => i.toNumber())
      let token_id = token_ids[0].toNumber()
      let locked_amount = await legacy_token.lockOf(owner.address)
      locked_amount = locked_amount.toNumber()
      
      await knives_legacy_v2.setApprovalForAll(knives_staking.address, true)
      await knives_staking.depositSelected(token_ids_int);
      expect(await knives_staking.stakedAmount(owner.address)).to.equal(2)
      
     


      // token_ids = await knives_legacy_v2.walletOfOwner()
      // token_id = token_ids[0].toNumber()
      locked_amount = await legacy_token.lockOf(owner.address)
      console.log(ethers.utils.formatUnits(locked_amount, 18))

      

      // increase block number to simulate staking rewards
      // for (let index = 0; index < 1000; index++) {
      //   await ethers.provider.send('evm_mine');
      // }
      await ethers.provider.send("evm_increaseTime", [3600 *24 * 60])
      let knife_reward = await knives_staking.calculateReward(token_ids_int[0]);
      console.log("knifre reward", knife_reward.toNumber())
      await knives_staking.claimRewards();
      locked_amount = await legacy_token.lockOf(owner.address)

      console.log(ethers.utils.formatUnits(locked_amount, 18))

      await ethers.provider.send("evm_increaseTime", [3600 * 24 * 60])

      await knives_staking.claimRewards();
      locked_amount = await legacy_token.lockOf(owner.address)

      console.log(ethers.utils.formatUnits(locked_amount, 18))
      
      // await knives_legacy_v2.approve(knives_staking.address, token_id);
      // await knives_staking.deposit(token_id);
      // expect(await knives_staking.stakedAmount(owner.address)).to.equal(2)
    });

    it("Should claim again and earn locked rewards from 2 Knives", async function () {
    
      locked_amount = await legacy_token.lockOf(owner.address)
      console.log(ethers.utils.formatUnits(locked_amount, 18))



      // increase block number to simulate staking rewards
      // for (let index = 0; index < 1000; index++) {
      //   await ethers.provider.send('evm_mine');
      // }
      await ethers.provider.send("evm_increaseTime", [3600 * 24])
      let pending = await knives_staking.getPendingRewards(owner.address)

      console.log("before claiming - pending ", ethers.utils.formatUnits(pending, 18))
      await knives_staking.claimRewards();
      locked_amount = await legacy_token.lockOf(owner.address)

      console.log(ethers.utils.formatUnits(locked_amount, 18))
    });

    it("Should withdraw all NFT from the staking contract then redeposit one", async function () {
      let token_ids = await knives_staking.getDepositedTokens(owner.address)
      let token_ids_int = token_ids.map(i => i.toNumber())
      let token_id = token_ids[0].toNumber()
      let locked_amount = await legacy_token.lockOf(owner.address)
      let pending = await knives_staking.getPendingRewards(owner.address)
      
      console.log("before withdraw - lock ", ethers.utils.formatUnits(locked_amount, 18))
      console.log("before withdraw - pending ", ethers.utils.formatUnits(pending, 18))
      await ethers.provider.send("evm_increaseTime", [3600 * 24])
      pending = await knives_staking.getPendingRewards(owner.address)
      console.log("before withdraw after 24h- pending ", ethers.utils.formatUnits(pending, 18))
      expect(await knives_staking.stakedAmount(owner.address)).to.equal(2)
      await knives_staking.withdrawSelected(token_ids_int)
      locked_amount = await legacy_token.lockOf(owner.address)
      pending = await knives_staking.getPendingRewards(owner.address)
      console.log("after withdraw - lock ", ethers.utils.formatUnits(locked_amount, 18))
      console.log("after withdraw - pending ", ethers.utils.formatUnits(pending, 18))
      expect(await knives_staking.stakedAmount(owner.address)).to.equal(0)
      await knives_staking.depositSelected([token_ids_int[0]])  
      expect(await knives_staking.stakedAmount(owner.address)).to.equal(1)   
    });
    
    
  });
  describe("Missions", function () {
    it("Should run an item mission with a staked knife", async function () {
      expect(await knives_items.balanceOf(owner.address)).to.equal(0)
      let token_ids = await knives_staking.getDepositedTokens(owner.address)
      let token_id = token_ids[0].toNumber()
      await item_factory.mission(1, token_id)
      expect(await knives_items.balanceOf(owner.address)).to.equal(1)
    });
    it("Should equip the item and have a score of 8", async function () {
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(0)
      let token_ids = await knives_items.walletOfOwner()
      let token_id = token_ids[0].toNumber()
      await item_factory.equipItem(token_id)
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(8)
    });
    it("Should Unequip the item and have a score of 0", async function () {
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(8)
      let token_id = await item_factory.equipments(owner.address, 1)
      await item_factory.unequipItem(token_id, owner.address)
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(0)
    });

    it("Should make two more item missions and upgrade item boots to tier2", async function () {
      expect(await knives_items.balanceOf(owner.address)).to.equal(1)
      let lgcy_bal = await legacy_token.balanceOf(owner.address)
      lgcy_bal = ethers.utils.formatUnits(lgcy_bal, 18)
      let token_ids = await knives_staking.getDepositedTokens(owner.address)
      let token_id = token_ids[0].toNumber()
      token_ids = await knives_legacy_v2.walletOfOwner()
      token_ids_int = token_ids.map(i => i.toNumber())
      let token_id2 = token_ids[0].toNumber()
      await item_factory.mission(1, token_id)
      await item_factory.mission(1, token_id2)
      await item_factory.mission(1, token_ids_int[0])
      expect(await knives_items.balanceOf(owner.address)).to.equal(4)
      let item_ids = await knives_items.walletOfOwner()
      let item_ids_int = item_ids.map(i => i.toNumber())
      await legacy_token.approve(item_factory.address, ethers.utils.parseUnits("30"))
      // await knives_items.approve(item_factory.address, item_ids_int[0])
      // await knives_items.approve(item_factory.address, item_ids_int[1])
      // await knives_items.approve(item_factory.address, item_ids_int[2])
      await knives_items.setApprovalForAll(item_factory.address, true)
      await item_factory.upgradeItem(item_ids_int[0], item_ids_int[1], item_ids_int[2])
      expect(await knives_items.balanceOf(owner.address)).to.equal(2)
      let lgcy_bal_after = await legacy_token.balanceOf(owner.address)
      lgcy_bal_after = ethers.utils.formatUnits(lgcy_bal_after, 18)
      expect(~~lgcy_bal_after).to.equal(lgcy_bal  - 24)
    });
    it("Should equip the upgraded boots item and have a score of 24", async function () {
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(0)
      let token_ids = await knives_items.walletOfOwner()
      let token_id = token_ids[0].toNumber()
      await item_factory.equipItem(token_id)
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(24)
    });
    it("Should run the breastplate mission", async function () {
      expect(await knives_items.balanceOf(owner.address)).to.equal(2)
      let token_ids = await knives_staking.getDepositedTokens(owner.address)
      let token_id = token_ids[0].toNumber()
      await item_factory.mission(2, token_id)
      expect(await knives_items.balanceOf(owner.address)).to.equal(3)
    });
    it("Should equip the breastplate and increase score by 10", async function () {
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(24)
      let token_ids = await knives_items.walletOfOwner()
      let token_ids_int = token_ids.map(i => i.toNumber())
      console.log(token_ids_int)
      itemdata = await item_factory.tokenIdToItemData(6) // token Id 1 2 3 4 are the tier0 boots, token Id4 is the tier 1 boots, Id5 is the breastplate
      expect(itemdata.item_type.toNumber()).to.equal(2) // item type 2 => breast plate
      await item_factory.equipItem(6)
      expect(await item_factory.getUserEquipmentScore(owner.address)).to.equal(34)
    });

    it("Should run the lgcy mission with a knife from wallet & with a staked knife", async function () {
      // check locked & unlocked balances
      let lgcy_bal = await legacy_token.balanceOf(owner.address)
      lgcy_bal = ethers.utils.formatUnits(lgcy_bal, 18)
      let lk_lgcy_bal = await legacy_token.lockOf(owner.address)
      lk_lgcy_bal = ethers.utils.formatUnits(lk_lgcy_bal, 18)
      // run lgcy with a knife from the wallet
      let token_ids = await knives_legacy_v2.walletOfOwner()
      let token_id = token_ids[0].toNumber()
      let token_ids_int = token_ids.map(i => i.toNumber())
      await item_factory.LegacyMission(token_id)

      // run lgcy mission with a staked knife
      token_ids = await knives_staking.getDepositedTokens(owner.address)
      token_ids_int = token_ids.map(i => i.toNumber())
      token_id = token_ids[0].toNumber()
      await item_factory.LegacyMission(token_id)

      // check locked & unlocked balances after missions
      let lgcy_bal_after = await legacy_token.balanceOf(owner.address)
      lgcy_bal_after = ethers.utils.formatUnits(lgcy_bal_after, 18)
      let lk_lgcy_bal_after = await legacy_token.lockOf(owner.address)
      lk_lgcy_bal_after = ethers.utils.formatUnits(lk_lgcy_bal_after, 18)
      // expect(parseFloat(lgcy_bal_after)).to.equal(parseFloat(lgcy_bal) + 62.8) // 2 missions of 31.4 unlock
      // expect(parseFloat(lk_lgcy_bal_after)).to.equal(parseFloat(lk_lgcy_bal) - 62.8)
    });
  });
});
