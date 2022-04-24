/* pages/my-assets.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { useSelector } from 'react-redux';

import {
 nftaddress, contractChainId, soldieraddress
} from '../config'

import NFT from '../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json'
import Soldier from '../artifacts/contracts/Soldiers.sol/Soldiers.json'


export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [soldiers, setSoldiers] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [isApproved, setIsApproved] = useState(true)
  // const [formInput, updateFormInput] = useState({ price: '' })
  const chainId = useSelector((state) => state.chainId);
  const account = useSelector((state) => state.account);
  useEffect(() => {
    if (chainId == contractChainId) {
      loadNFTs()
      loadSoldiers()
    }
  }, [chainId])
 

async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer)
    const tokenids = await tokenContract.walletOfOwner()
    const items = await Promise.all(tokenids.map(async i => {
       const tokenUri = await tokenContract.tokenURI(i)
      //  console.log(tokenUri)
       const meta = await axios.get(tokenUri)
       let item = {
         tokenId: i.toNumber(),
         name: meta.data.name,
         image: meta.data.image,
         attributes: meta.data.attributes,
       }
       return item
      }))
    // console.log(items)
    setNfts(items)
    // setLoadingState('loaded') 
    // console.log("test")
  }

  async function loadSoldiers() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
    const tokenids = await tokenContract.walletOfOwner()
    const items = await Promise.all(tokenids.map(async i => {
       const tokenUri = await tokenContract.tokenURI(i)
       const meta = await axios.get(tokenUri)
       let item = {
         tokenId: i.toNumber(),
         name: meta.data.name,
         image: meta.data.image,
         attributes: meta.data.attributes,
       }
       return item
      }))
    setSoldiers(items)

  }

  async function transferNft(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await tokenContract["safeTransferFrom(address,address,uint256)"](account, nft.receiver, nft.tokenId)
    await transaction.wait()
    loadNFTs()

  }

  async function transferNftSoldier(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
    let transaction = await tokenContract["safeTransferFrom(address,address,uint256)"](account, nft.receiver, nft.tokenId)
    await transaction.wait()
    loadSoldiers()

  }
  async function updateReceiver(nft_index , receiver){
    let newArr = [...nfts]; // copying the old datas array
    newArr[nft_index].receiver = receiver;
    setNfts(newArr);
  }
  async function updateReceiverSoldier(nft_index , receiver){
    let newArr = [...soldiers]; // copying the old datas array
    newArr[nft_index].receiver = receiver;
    setSoldiers(newArr);
  }




  return (
    <div className="flex flex-col items-center justify-center m-12">
      <div className="p-4">
      
        <h2 className="py-4 mb-10 text-4xl text-center text-pink-mekaverse font-mlp">My Knives</h2>
        <div className="grid grid-cols-1 gap-10 pt-4 mx-auto md:grid-cols-6"> 
          {
            nfts.map((nft, i) => (
              <div key={i} className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-30">
                <img src={nft.image} />
                <div className="p-4 bg-black-light">
                <p className="mb-2 text-base text-white font-mlp">{nft.name}</p>
                <div className='h-48 max-h-full'>
                  {nft.attributes.map((attribute, j) => (
                    <p key={j} className="mb-2 text-xs text-white font-mlp">{attribute.trait_type}: {attribute.value}</p>
                  ))}
                </div>
                <div>
                  <input
                      placeholder="0x Wallet Address"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-black placeholder-opacity-50 bg-white border font-mlp focus:placeholder-transparent"
                      onChange={e => updateReceiver(i, e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    /><button className="w-full py-2 mt-2 text-black bg-white hover:bg-opacity-25 hover:text-black font-mlp" onClick={() => transferNft(nft)}>Transfer</button>
                  </div>
               



                  
        
                </div>
              </div>
              
            ))
          }
        </div>
       
        
      </div>
      <div className="p-4 mt-16">
      
        <h2 className="py-4 mb-10 text-4xl text-center text-pink-mekaverse font-mlp">My Soldiers</h2>
        
        {/* <div ="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-5"> */}
        <div className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-1 lg:grid-cols-4"> 
          {
            soldiers.map((nft, i) => (
              <div key={i} className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-30">
                <img src={nft.image} className="rendering-pixelated"/>
                <div className="p-4 bg-black-light">
                <p className="mb-2 text-base text-white font-mlp">{nft.name}</p>
                  {nft.attributes.map((attribute, j) => (
                    <p key={j} className="mb-2 text-xs text-white font-mlp">{attribute.trait_type}: {attribute.value}</p>
                  ))}
                  <div>
                  <input
                      placeholder="0x Wallet Address"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-black placeholder-opacity-50 bg-white border font-mlp focus:placeholder-transparent"
                      onChange={e => updateReceiverSoldier(i, e.target.value)}
                    /><button className="w-full py-2 mt-2 text-black bg-white hover:bg-opacity-25 hover:text-black font-mlp" onClick={() => transferNftSoldier(nft)}>Transfer</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
      </div>

    </div>
  )
}