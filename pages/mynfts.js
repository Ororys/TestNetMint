/* pages/my-assets.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { useSelector } from 'react-redux';

import {
 nftaddress, contractChainId
} from '../config'

import NFT from '../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [isApproved, setIsApproved] = useState(true)
  // const [formInput, updateFormInput] = useState({ price: '' })
  const chainId = useSelector((state) => state.chainId);
  const account = useSelector((state) => state.account);
  useEffect(() => {
    if (chainId == contractChainId) {
      loadNFTs()
    }
  }, [chainId])
 

async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer)
    const tokenids = await tokenContract.walletOfOwner()
    // const data = await marketContract.fetchItemsPurchased()
    const items = await Promise.all(tokenids.map(async i => {
       const tokenUri = await tokenContract.tokenURI(i)
      //  console.log(tokenUri)
       const meta = await axios.get(tokenUri)
       let item = {
         tokenId: i.toNumber(),
         name: meta.data.name,
         image: meta.data.image,
         nattr0: meta.data.attributes[0].trait_type,
         nattr1: meta.data.attributes[1].trait_type,
         nattr2: meta.data.attributes[2].trait_type,
         nattr3: meta.data.attributes[3].trait_type,
         nattr4: meta.data.attributes[4].trait_type,
         nattr5: meta.data.attributes[5].trait_type,
         nattr6: meta.data.attributes[6].trait_type,
         attr0: meta.data.attributes[0].value,
         attr1: meta.data.attributes[1].value,
         attr2: meta.data.attributes[2].value,
         attr3: meta.data.attributes[3].value,
         attr4: meta.data.attributes[4].value,
         attr5: meta.data.attributes[5].value,
         attr6: meta.data.attributes[6].value,
       }
       return item
      }))
    // console.log(items)
    setNfts(items)
    // setLoadingState('loaded') 
    // console.log("test")
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

//   async function updatePrice(nft_index , price){
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
      
        <h2 className="py-4 mb-10 text-4xl text-center text-pink-mekaverse font-mlp">My Knives</h2>
        <div className="grid grid-cols-1 gap-10 pt-4 mx-auto md:grid-cols-6"> 
          {
            nfts.map((nft, i) => (
              <div key={i} className="overflow-hidden transition ease-out transform shadow-2xl hover:scale-110 duration-30">
                <img src={nft.image} />
                <div className="p-4 bg-black-light">
                <p className="mb-2 text-base text-white font-mlp">{nft.name}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr0}: {nft.attr0}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr1}: {nft.attr1}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr2}: {nft.attr2}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr3}: {nft.attr3}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr4}: {nft.attr4}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr5}: {nft.attr5}</p>
                <p className="mb-2 text-xs text-white font-mlp">{nft.nattr6}: {nft.attr6}</p>




                  
        
                </div>
              </div>
            ))
          }
        </div>
       
        
      </div>
    </div>
  )
}