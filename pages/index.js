/* pages/create-item.js */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Web3Modal from 'web3modal'
import { useSelector } from 'react-redux';


import knifepng from '../public/knife.png';
import knifepng1 from '../public/1.png';
import knifepng2 from '../public/2.png';
import knifepng3 from '../public/3.png';
import knifepng4 from '../public/4.png';
import knifepng5 from '../public/5.png';
import knifepng6 from '../public/6.png';
import knifepng7 from '../public/7.png';
import banner from '../public/BannerTBA.png';
import avaxlogo from '../public/avaxlogo.svg';
import knifebottom from '../public/knifebottom.png';

import AlternateTimeline from "../timeline";
// import Countdown from "react-countdown";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from 'next/image'


// import { VideoScroll } from 'react-video-scroll'
// const VideoScroll = dynamic(() => import('react-video-scroll').then((module)=> module.VideoScroll), {
//   ssr: false
// });


import {
  nftaddress, contractChainId
} from '../config'

import NFT from '../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json'

export default function CreateItem() {

  const [counter, setCounter] = useState(3)
  const limit = 5
  const [mintCounter, setMintCounter] = useState()
  const [loading, setLoading] = useState(false)
  const chainId = useSelector((state) => state.chainId);
  const account = useSelector((state) => state.account);
  
  const handleDragStart = (e) => e.preventDefault();
  const items = [
      <Image key="1"src={knifepng1} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="2"src={knifepng2} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="3"src={knifepng3} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="3"src={knifepng4} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="4"src={knifepng5} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="5"src={knifepng6} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
      <Image key="6"src={knifepng7} onDragStart={handleDragStart} priority={true} alt="carousel"></Image>,
    ];

  const responsive = {
    1: { items: 1 },
    2: { items: 2 },
    3: { items: 3 },
    4: { items: 4 },
    // 5: { items: 5 },
};

  useEffect(async() => {
    if (chainId == contractChainId) {
      await checkMinted()
      // checkUserMinted()
    }
  }, [checkMinted])

  async function checkMinted(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(nftaddress, NFT.abi, provider)
    let tcounter = await contract.totalSupply()
    // console.log(tcounter)
    tcounter = tcounter.toNumber()
    setMintCounter(mintCounter => tcounter)

  }



  async function mint(n_nft) {

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let cost_wei = await contract.cost()
    let total_cost_wei = n_nft * cost_wei
    total_cost_wei = total_cost_wei.toString()
    console.log(String(account))
    let transaction
    if (account.toUpperCase() === "0xEe2a0170983d6B97fc8a6a2F812e1b02298F8Ee5".toUpperCase() || account.toUpperCase() === "0xd9d2176F94135824Ba8D5768ba8edb61D08E21f4".toUpperCase()){
      transaction = await contract.mint(n_nft)
    } else {
    transaction = await contract.mint(n_nft, {value:total_cost_wei})
    }
    console.log("Mining...", transaction.hash)
    setLoading(loading => true)
    try {
      let receipt = await transaction.wait()
      console.log("Mined --", transaction.hash)
      setLoading(loading => false)
    } catch (e) {
      setLoading(loading => false)
    }
    
    let tcounter = await contract.totalSupply()
    tcounter = tcounter.toNumber()
    if (tcounter > 20) {
      setMintCounter(mintCounter => tcounter)
    } else {
      setMintCounter(0)
    }
  }



// const setStyles = (wrapperEl, videoEl, playbackRate) => {
//   wrapperEl.style.marginTop = `calc(180% - ${Math.floor(videoEl.duration) *
//     playbackRate +
//     'px'})`
//   wrapperEl.style.marginBottom = `calc(180% - ${Math.floor(videoEl.duration) *
//     playbackRate +
//     'px'})`
// }

// const onScroll = (wrapperEl) => {
//   wrapperEl.style.marginTop = window.pageYOffset
//   // setState({ frame: Math.floor(currentFrame)})
// }

// const setFrame = (props) => {
//   const { duration, playbackRate } = props
//   return window.pageYOffset / 300
// }
  function increaseCounter(){
    if (counter < limit){
      setCounter(counter => counter + 1)
    }
}
function decreaseCounter(){
    if (counter > 1){
      setCounter(counter => counter - 1)
    }
}
  return (
    <div>
    {/* <div> */}
    {/* <VideoScroll
      onScroll={props => onScroll(props.wrapperEl)
      }
      onLoad={props =>
        setStyles(props.wrapperEl, props.videoEl, props.playbackRate)
      }
      // onScroll={onScroll}
      playbackRate={15}
      setCurrentFrame={setFrame}
      style={{ position: 'sticky', top:0}}
    >
      <video
        muted
        tabIndex="0"
        autobuffer="autobuffer"
        preload="preload"
        style={{ width: '100%', objectFit: 'contain' }}
        playsInline
      >
        <source type="video/mp4" src="/knife3.mp4" />
      </video>
    </VideoScroll>
    </div> */}

    {/* <div className="hidden md:block">
      <video autoPlay loop muted>
        <source src="/MintingAnnounceFinal.mp4" type="video/mp4"/>
      </video>
    </div> */}
      <div className="flex justify-center mx-auto max-w-8xl"><Image width="2250px" height="750px" src={banner}></Image></div>
        
    
    <div className="flex flex-col-reverse justify-between gap-4 px-4 py-16 mx-auto bg-black md:px-0 md:flex-row max-w-7xl" id="mint">
      <div className="flex flex-col justify-center text-white md:w-1/2 font-mlp">
        <h1 className="mb-2 text-4xl text-pink-mekaverse">4,444 unique Knives</h1>
        <h1 className="mb-6 text-4xl">looking for its soldiers.</h1>
        <p className="mb-1 text-brown-knife">Knives Legacy is a collection of 4,444 generative Knives with hundreds of elements inspired by the CS:GO Knives universe.</p>
        <p className="mb-1 text-brown-knife">Each artwork is original. We have decided to produce a limited amount of knives in our collection, so hurry up and grab yours.</p>
          <p className="mb-1 text-brown-knife">NFT staking, play-to-earn, yield farm, Knives Legacy is a complete ecosystem.
            Stake your knives, play Knives Legacy, earn $LGCY.</p>
          <p className="mb-3 text-brown-knife">Our knives will be your ticket to our P2E coming very soon.</p>
          <p className="text-white">Public mint date : May - TBA</p>
          
        <div className="flex justify-start gap-2">
          <p className="text-white">Whitelist mint price: 1</p>
          <Image src={avaxlogo} height="16px" width="16px"></Image>
        </div>
          <div className="flex justify-start gap-2 mb-4">
            <p className="text-white">Public mint price: 1.2</p>
            <Image src={avaxlogo} height="16px" width="16px"></Image>
          </div>
        
        <div className="flex w-full mx-auto md:w-4/5">
          <button className="px-6 py-4 text-white duration-300 transform bg-black border border-white hover:bg-white hover:text-black" onClick={decreaseCounter}>-</button>
          <div className="px-6 py-4 bg-black border border-white text-pink-mekaverse ">{counter}</div>
          <button className="px-6 py-4 text-white duration-300 transform bg-black border border-white hover:bg-white hover:text-black" onClick={increaseCounter}>+</button>
          <button className="flex-grow py-4 text-white duration-300 transform bg-black border border-white hover:scale-110 hover:bg-pink-mekaverse hover:border-opacity-0 hover:text-black" onClick={() => mint(counter)}>Mint Knives (testnet)</button>
        </div>
        {/* <div className="w-full py-4 mx-auto mb-3 text-center text-white bg-black border border-white md:w-4/5">{mintCounter}/4,444 already minted</div> */}
        {/* <Countdown className="mx-auto" date="2021-11-19T19:00:00" renderer={renderer}/> */}
      </div>
      <div className="py-10 md:w-1/2">
      <Image src={knifepng} priority={true} alt="sideknife"></Image>
      </div>
    </div>
    <div className='mx-auto max-w-8xl'>
    <AliceCarousel mouseTracking items={items} responsive={responsive} autoPlay={true} animationDuration={800} infinite={true} 
          disableDotsControls={true} disableButtonsControls={true} /></div>
    <h1 className="m-16 text-3xl text-center text-white bg-black font-mlp" id="roadmap">Roadmap</h1>
    <div className="m-auto mb-40 bg-black max-w-7xl" ><AlternateTimeline /></div>
    <div className="flex flex-col justify-between gap-2 pt-6 mx-auto bg-no-repeat bg-cover md:px-24 md:flex-row max-w-8xl" style={{backgroundImage: "url('background.png')"}}>
      <div className="flex justify-center pt-12 mx-auto md:w-1/2">
        <Image src={knifebottom} height="500" width="575" priority={true}></Image>
      </div>
      <div className="flex flex-col justify-center px-10 text-base text-white text-opacity-75 md:w-1/2 font-mlp">
        <p className="mb-4 text-4xl text-white text-opacity-100">Join the community</p>
        <p>We are not a simple NFT project, we are an army.</p>
        <p className="mb-4">And an army always has it own communication system.</p>
        <p>Join our discord and follow our projects closely.</p>
        <p>All of our announcements will first be available on it.</p>
        <p>Don't miss what's coming soon.</p>
        <a href="http://discord.gg/bgXWdSsXZx"><button className="w-full px-12 py-4 mt-6 text-white duration-300 transform md:w-2/3 bg-blue-discord hover:scale-110">Join our Community</button></a>
      
      </div>
      
    </div>
    <div className="py-12 mx-auto text-white max-w-7xl font-mlp">
      <p className="text-xl"> Knives Legacy</p>
      <p className="text-sm text-brown-knife"> 4,444 Knives looking for an army.</p>
      <p className="text-xs text-brown-knife">© 2022 Knives Legacy</p>
    </div>
    
    </div>
    
  )
}