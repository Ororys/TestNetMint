// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/finance/PaymentSplitter.sol";

contract KnivesRoyalties is Ownable {
  mapping (address => uint256) rewards;

  constructor() {
    
  }
    
  receive() external payable {}

  // Fallback function is called when msg.data is not empty (receive funds).
  fallback() external payable {}

  // modifier updateReward(address account) {
  //       rewardPerTokenStored = rewardPerToken();
  //       lastUpdateTime = block.timestamp;

  //       rewards[account] = earned(account);
  //       userRewardPerTokenPaid[account] = rewardPerTokenStored;
  //       _;
  //   }
  // function getReward() external updateReward(msg.sender) {
  //     uint reward = rewards[msg.sender];
  //     rewards[msg.sender] = 0;
  //     rewardsToken.transfer(msg.sender, reward);

  // }

}
