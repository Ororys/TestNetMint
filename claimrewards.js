// (a) on import useDispatch depuis react-redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import avaxlogo from './public/avaxlogo.svg';
import Image from 'next/image'
import Web3Modal from 'web3modal'

// import { connectRequest, connectSuccess, connectFailed, updateAccount, updateChainId, updateChainHex }  from './store';
import {
  royaltyaddress, contractChainId
} from './config'

import Royalty from './artifacts/contracts/KnivesRoyalties.sol/KnivesRoyalties.json'
export function ClaimRewards() {
  // (b) on utilise le hooks useDispatch dans notre composant
  // pour récupérer la fonction dispatch de redux
    const account = useSelector((state) => state.account);
    const chainId = useSelector((state) => state.chainId);
    const [rewards, setRewards] = useState()
    // const errMsg = useSelector((state) => state.errorMsg);

    // const dispatch = useDispatch();
    useEffect(() => {
        loadRewards()
    }, [])

    async function loadRewards(){
       const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
       const contract = new ethers.Contract(royaltyaddress, Royalty.abi, signer)
       let rewards = await contract.getUserRewards(signer.getAddress())
       let rewards_eth = ethers.utils.formatEther(rewards)
       rewards_eth = (+rewards_eth).toFixed(4);
       setRewards(rewards_eth)
    }

  

    
    //   };
//   return <button className="px-12 py-2 font-bold text-white bg-pink-500 rounded" onClick={connect}>Connect</button>
    // if (account.length > 0){
    //     if (chainId == contractChainId){
    //         return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:bg-pink-mekaverse hover:scale-110">{String(account).substring(0, 6) +
    //       "..." +
    //       String(account).substring(38)}</button>
    //     } else {
    //         return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:scale-110 hover:border-opacity-0 hover:bg-pink-mekaverse" onClick={switchNetwork}>Switch to Avalanche</button>
    //     }
    // } else {
    //      return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:scale-110 hover:border-opacity-0 hover:bg-pink-mekaverse" onClick={connect}><span>Connect Wallet</span></button>
    // }

    async function claimMarket(){
        const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
       const contract = new ethers.Contract(royaltyaddress, Royalty.abi, signer)
       let tx = await contract.claimUserRewards(signer.getAddress())
       tx.wait()
       loadRewards()
    }

    return <div className=''>
    {/* <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:bg-pink-mekaverse" onClick={claimMint}>Mint Rewards: 2.3 <Image src={avaxlogo} height="12px" width="12px"></Image></button> */}
    <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:bg-pink-mekaverse" onClick={claimMarket}>Market Rewards: {rewards} <Image src={avaxlogo} height="12px" width="12px"></Image></button></div>
//     if (chainId != contractChainId && account.length > 0) return (<button className="px-12 py-2 font-bold text-white bg-pink-500 rounded" onClick={switchNetwork}>Switch to Avalanche</button>)
//   return <button className="px-12 py-2 font-bold text-white bg-pink-500 rounded" onClick={connect}>
//           {account.length > 0 ? (
//           String(account).substring(0, 6) +
//           "..." +
//           String(account).substring(38)
//         ) : (
//           <span>Connect Wallet 🦊</span>
//         )}
//         </button>
}