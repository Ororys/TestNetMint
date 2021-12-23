/* pages/my-assets.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { useSelector } from 'react-redux';
import chameleon from '../public/chameleon.jpg';
import cyborg from '../public/cyborg.jpg';
import django from '../public/django.jpg';
import hector from '../public/hector.jpg';
import Image from 'next/image'


import {
 nftaddress, soldieraddress, contractChainId
} from '../config'

import NFT from '../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json'
import Soldier from '../artifacts/contracts/Soldiers.sol/Soldiers.json'

export default function Soldiers() {
  const [knifeId, setKnifeId] = useState()
  const [knifeId1, setKnifeId1] = useState()
  const [knifeId2, setKnifeId2] = useState()
  const [knifeId3, setKnifeId3] = useState()
  const [knifeId4, setKnifeId4] = useState()
  const [hasMinted, setHasMinted] = useState()
  const [knifeChecked, setKnifeChecked] = useState()
  const [loadingState, setLoadingState] = useState('not-loaded')
  // const [formInput, updateFormInput] = useState({ price: '' })
  const chainId = useSelector((state) => state.chainId);
  const account = useSelector((state) => state.account);
  useEffect(() => {
    if (chainId == contractChainId) {
    }
  }, [chainId])
 
async function checkKnife(){
    if (knifeId >= 1 && knifeId <= 4444){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const soldierContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
    let has_minted = await soldierContract.minted(knifeId)
    setHasMinted(has_minted)
    setKnifeChecked(true)
    } else {
      setKnifeChecked(false)
    }
}
async function mintSoldier1(){
    if (knifeId1 > 0 && knifeId1<= 1111){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const soldierContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
        let tx = await soldierContract.mintSoldier(knifeId1)
    }
    
}
async function mintSoldier2(){
    if (knifeId2 > 1111 && knifeId2<= 2222){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const soldierContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
        let tx = await soldierContract.mintSoldier(knifeId2)
    }
}
async function mintSoldier3(){
    if (knifeId3 > 2222 && knifeId3 <= 3333){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const soldierContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
        let tx = await soldierContract.mintSoldier(knifeId3)
    }
}
async function mintSoldier4(){
    if (knifeId4 > 3333 && knifeId4<= 4444){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const soldierContract = new ethers.Contract(soldieraddress, Soldier.abi, signer)
        let tx = await soldierContract.mintSoldier(knifeId4)
    }
}

//   async function listNft(nft) {
//     // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // const signer = provider.getSigner()
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection)
//     const signer = provider.getSigner()

//     /* next, create the item */
//     // let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
//     // let transaction = await contract.createToken(url)
//     // let tx = await transaction.wait()
//     // let event = tx.events[0]
//     // let value = event.args[2]
//     // let tokenId = value.toNumber()
//     // console.log(tokenId)
//     // console.log(nft.price)
//     const price = ethers.utils.parseUnits(nft.price, 'ether')

//     /* then list the item for sale on the marketplace */
//     const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
//     let listingPrice = await contract.getListingPrice()
//     listingPrice = listingPrice.toString()
//     // console.log(listingPrice)
      
//     let transaction = await contract.createMarketItem(nftaddress, nft.tokenId, price, { value: listingPrice })
    
//     await transaction.wait()
//     // emit MarketItemCreated(
//     //   itemId,
//     //   nftContract,
//     //   tokenId,
//     //   msg.sender,
//     //   address(0),
//     //   price,
//     //   false,
//     //   false
//     // );
    
       
//     loadNFTs()
//     // router.push('/')
//   }

//   async function updateKnifeId1(nft_index , price){
//     let newArr = [...nfts]; // copying the old datas array
//     newArr[nft_index].price = price;
//     setNfts(newArr);
//     // console.log(newArr)
//   }

//   async function approveNft(){
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection)
//     const signer = provider.getSigner()
//     const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
//     const nftContract = new ethers.Contract(nftaddress, NFT.abi, signer)
//     let tx = await nftContract.setApprovalForAll(nftmarketaddress, true)
//     await tx.wait()
//     setIsApproved(true)

//   }
//   if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl font-mlp">No Knives</h1>)
  return (
    <div className="flex flex-col items-center justify-center m-12">
      <div className="p-4">
      <h2 className="py-4 mb-6 text-4xl text-center text-white font-mlp">Soldiers</h2>
        <div className="flex items-center gap-3 justify-center mb-6">
        <p className="py-2 font-mlp text-white">Knife eligibility</p>
        <input
                      placeholder="Knife ID"
                      className="pt-2 pb-2 pl-2 pr-2 text-xs placeholder-black placeholder-opacity-50 bg-white border font-mlp focus:placeholder-transparent"
                      onChange={e => setKnifeId(e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
        <button className="py-1 px-2 text-black-light bg-white font-mlp transform transition ease-out hover:scale-110 duration-300" onClick={checkKnife}>Check</button>
        </div>
        {knifeChecked && hasMinted && <p className="text-center mb-6 text-xs text-red font-mlp">This Knife has already claimed its soldier.</p>}
        {knifeChecked && !hasMinted && <p className="text-center mb-6 text-xs text-green font-mlp">This Knife can claim its soldier.</p>}
      
        
        
        
        <div className="grid grid-cols-1 gap-10 pt-4 mx-auto md:grid-cols-4"> 
            <div className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-300 bg-grey">
                    <Image src={cyborg} />
                    <div className="p-4 bg-grey h-48 max-h-full">
                      <p className="mb-2 text-base text-white font-mlp">Cyborg</p>
                      <p className="text-xs text-white font-mlp">He is much more than a veteran. <br />
                      Despite the many scars from the war and the many times he nearly lost his life, he decided to accept CyTech's experiments to continue defending his country. <br />
                      His years of service make him the most experienced soldier the military has ever known. </p>
                    </div>
                    <div className="p-4 bg-grey h-24 max-h-full">
                      <h2 className="mb-2 text-sm text-white font-mlp">Favorite knife: Karambit </h2> 
                      <p className="mb-2 text-xs text-white font-mlp">
                      It is more than a knife to him. It has never let him down, after so many years, it has become his best comrade, his ally, his friend.</p>
                    </div>
                    <div className="bg-grey p-4">
                    <input
                      placeholder="Your Knife ID (from 1 to 1111)"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-white text-white placeholder-opacity-50 bg-transparent border font-mlp focus:placeholder-transparent"
                      onChange={e => setKnifeId1(e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <button className="w-full py-2 mt-2 text-white bg-black-light hover:bg-white hover:text-black font-mlp" onClick={mintSoldier1}>Claim</button>
                    </div>
                    
                </div>
            <div className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-300 bg-grey">
                    <Image src={hector} />
                    <div className="p-4 bg-grey h-48 max-h-full">
                    <p className="mb-2 text-base text-white font-mlp">Hector</p>
                    <p className="mb-2 text-xs text-white font-mlp">Commander "Hector" is a renowned marine. <br />
                    Known to be incorruptible, he has a true sense of duty and honor. <br />
                    All the missions he has led have ended in success. Soldiers are relieved to be under his command, even in the most perilous missions. </p>
                    </div>
                    <div className="p-4 bg-grey h-24 max-h-full">
                    <h2 className="mb-2 text-sm text-white font-mlp">Favorite knife: Tactical</h2> 
                    <p className="mb-2 text-xs text-white font-mlp">
                    Classic and reliable, wherever Hector goes his Tactical goes.</p>
                    </div>
                    <div className="bg-grey p-4">
                    <input
                      placeholder="Your Knife ID (from 1112 to 2222)"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-white text-white placeholder-opacity-50 bg-transparent border font-mlp focus:placeholder-transparent"
                      onChange={e => setKnifeId2(e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <button className="w-full py-2 mt-2 text-white bg-black-light hover:bg-white hover:text-black font-mlp" onClick={mintSoldier2}>Claim</button>
                    </div>
                    
                </div>
            <div className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-300 bg-grey">
                    <Image src={chameleon} />
                    <div className="p-4 bg-grey h-48 max-h-full">
                    <p className="mb-2 text-base text-white font-mlp">Chameleon</p>
                    <p className="mb-2 text-xs text-white font-mlp">The soldier "Chameleon" excels in the camouflage exercise. <br />
                    Regularly sent on delicate missions to secure strategic points, she is known for her coolness under pressure, and never misses her target. </p>
                    </div>
                    <div className="p-4 bg-grey h-24 max-h-full">
                    <h2 className="mb-2 text-sm text-white font-mlp">Favorite knife: Butterfly</h2> 
                    <p className="mb-2 text-xs text-white font-mlp">
                   Quick and efficient, with her knife, she always feels safe.</p>
                   </div>
                   <div className="bg-grey p-4">
                    <input
                      placeholder="Your Knife ID (from 2223 to 3333)"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-white text-white placeholder-opacity-50 bg-transparent border font-mlp focus:placeholder-transparent"
                      onChange={e => setKnifeId3(e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <button className="w-full py-2 mt-2 text-white bg-black-light hover:bg-white hover:text-black font-mlp" onClick={mintSoldier3}>Claim</button>
                    </div>
                    
                </div>
            <div className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-300 bg-grey">
                    <Image src={django} />
                    <div className="p-4 bg-grey h-48 max-h-full">
                    <p className="mb-2 text-base text-white font-mlp">Django</p>
                    <p className="mb-2 text-xs text-white font-mlp">He has no rank, no affiliation.  <br />
                    He is sent on secret missions to the Middle East. <br />
                    His reputation makes him one of the most admired soldiers. <br />
                    He always acts alone and does not depend on any hierarchy.He receives the missions and disappears until he succeeds.</p>
                    </div>
                    <div className="p-4 bg-grey h-24 max-h-full">
                    <h2 className="mb-2 text-sm text-white font-mlp">Favorite knife: Kunai</h2> 
                    <p className="mb-2 text-xs text-white font-mlp">
                   At short or long distance, he handles this knife to perfection. Those who have seen him use it are no longer here to talk about it.</p>
                   </div>
                   <div className="bg-grey p-4">
                    <input
                      placeholder="Your Knife ID (from 3334 to 4444)"
                      className="w-full pt-2 pb-2 pl-2 pr-2 mt-2 text-xs placeholder-white text-white placeholder-opacity-50 bg-transparent border font-mlp focus:placeholder-transparent"
                      onChange={e => setKnifeId4(e.target.value)}
                      // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <button className="w-full py-2 mt-2 text-white bg-black-light hover:bg-white hover:text-black font-mlp" onClick={mintSoldier4}>Claim</button>
                    </div>
                    
                    
                </div>
        </div>
       
        
      </div>

    </div>
  )
}