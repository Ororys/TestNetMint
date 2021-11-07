/* pages/create-item.js */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { useSelector } from 'react-redux';
// import Ponygif from '../public/pony_gif.gif';
// import vlxpunk from '../public/vlxpunk.png';
// import vpunk from '../public/vpunk.png';
// import vpunks from '../public/vpunks.png';

import knifepng from '../public/knife.png';
import knifepng1 from '../public/1.png';
import knifepng2 from '../public/2.png';
import knifepng3 from '../public/3.png';
import knifepng4 from '../public/4.png';
import knifepng5 from '../public/5.png';
import knifepng6 from '../public/6.png';
import knifepng7 from '../public/7.png';
// import vpunkgif from '../public/vpunkgif.gif';
// import Ponyata from '../public/ponyata.gif';
// import Ponyspeed from '../public/ponyspeed.gif';
import AlternateTimeline from "../timeline";
import Countdown from "react-countdown";
import dynamic from 'next/dynamic'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from 'next/image'
// import { VideoScroll } from 'react-video-scroll'
const VideoScroll = dynamic(() => import('react-video-scroll').then((module)=> module.VideoScroll), {
  ssr: false
});


import {
  nftaddress, contractChainId
} from '../config'

import NFT from '../artifacts/contracts/KnivesLegacy.sol/KnivesLegacy.json'

export default function CreateItem() {
  // const [fileUrl, setFileUrl] = useState(null)
  // const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  // const router = useRouter()
  const [counter, setCounter] = useState(3)
  const limit = 20
  const [userCounter, setUserCounter] = useState()
  const [loading, setLoading] = useState(false)
  const chainId = useSelector((state) => state.chainId);
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

  useEffect(() => {
    if (chainId == contractChainId) {
      checkMinted()
      // checkUserMinted()
    }
  }, [checkMinted])

  async function checkMinted(){
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(nftaddress, NFT.abi, provider)
    let tcounter = await contract.totalSupply()
    // console.log(tcounter)
    setCounter(counter => tcounter.toNumber())
  }

  // async function checkUserMinted(){
  //   const web3Modal = new Web3Modal()
  //   const connection = await web3Modal.connect()
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()
  //   const contract = new ethers.Contract(nftaddress, NFT.abi, signer)
  //   const available_mint = await contract.getAvaliableMint()
    
  //   setUserCounter(userCounter => available_mint.toNumber())
  // }
  // async function onChange(e) {
  //   const file = e.target.files[0]
  //   try {
  //     const added = await client.add(
  //       file,
  //       {
  //         progress: (prog) => console.log(`received: ${prog}`)
  //       }
  //     )
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     setFileUrl(url)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }  
  // }
  // async function mint() {
  //   const { name, description, price } = formInput
  //   if (!name || !description || !price || !fileUrl) return
  //   /* first, upload to IPFS */
  //   const data = JSON.stringify({
  //     name, description, image: fileUrl
  //   })
  //   try {
  //     const added = await client.add(data)
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
  //     createSale(url)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }  
  // }
  async function mint() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.mint()
    console.log("Mining...", transaction.hash)
    setLoading(loading => true)
    try {
      let receipt = await transaction.wait()
      console.log("Mined --", transaction.hash)
      setLoading(loading => false)
    } catch (e) {
      setLoading(loading => false)
    }
    const tcounter = await contract.getTokenCounter()
    setCounter(counter => tcounter.toNumber())
    // const available_mint = await contract.getAvaliableMint()
    // setUserCounter(userCounter => available_mint.toNumber())
  }

  
  const renderer = ({ days,hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <button className="self-center p-4 mt-4 font-bold transition duration-300 ease-out transform bg-white text-blue font-mlp hover:text-blue hover:bg-green hover:scale-110" onClick={mint}>
          Mint: 100 VLX
          </button>;
  } else {
    // Render a countdown
    return <span className="text-xl text-white font-mlp">{days}Days {hours}:{minutes}:{seconds}</span>;
  }
};
const setStyles = (wrapperEl, videoEl, playbackRate) => {
  wrapperEl.style.marginTop = `calc(180% - ${Math.floor(videoEl.duration) *
    playbackRate +
    'px'})`
  wrapperEl.style.marginBottom = `calc(180% - ${Math.floor(videoEl.duration) *
    playbackRate +
    'px'})`
}

const onScroll = (wrapperEl) => {
  wrapperEl.style.marginTop = window.pageYOffset
  // setState({ frame: Math.floor(currentFrame)})
}

const setFrame = (props) => {
  const { duration, playbackRate } = props
  return window.pageYOffset / 300
}
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

    <div>
      <video autoPlay loop muted>
        <source src="/MintingAnnounceFinal.mp4" type="video/mp4"/>
      </video>
      <div className="absolute flex flex-col transform -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2 font-mlp">
        <div className="flex ">
          <button className="px-6 py-4 text-white duration-300 transform bg-black border border-white hover:bg-white hover:text-black" onClick={decreaseCounter}>-</button>
          <div className="px-6 py-4 text-white bg-black border border-white ">{counter}</div>
          <button className="px-6 py-4 text-white duration-300 transform bg-black border border-white hover:bg-white hover:text-black" onClick={increaseCounter}>+</button>
          <button className="px-6 py-4 text-white duration-300 transform bg-black border border-white hover:scale-110 hover:bg-white hover:text-black">Mint Knives</button>
        </div>
        <div className="w-full py-4 text-xs text-center text-white bg-black border border-white">265/4,444 Knives have already found their Soldier</div>
      </div>
    </div>
    <div className="flex justify-between py-16 bg-black md:px-60">
      <div className="flex flex-col justify-center px-10 text-white md:w-1/2 font-mlp">
        <h1 className="mb-2 text-4xl text-red">4,444 unique Knives</h1>
        <h1 className="mb-6 text-4xl">which need Soldiers.</h1>
        <p className="mb-1 text-brown-knife">Knives Legacy is a collection of 4,444 generative Knives with hundreds of elements inspired by the CS:GO Knives universe.</p>
        <p className="text-brown-knife">Each artwork is original, with its own color palette and creation. <br></br> The objective was to make each Knife unique in order to prioritize quality over quantity.</p>
      </div>
      <div className="px-10 py-10 md:w-1/2">
      <Image src={knifepng} priority={true} alt="sideknife"></Image>
      </div>
    </div>
    <AliceCarousel mouseTracking items={items} responsive={responsive} autoPlay={true} animationDuration={800} infinite={true} disableDotsControls={true} disableButtonsControls={true}/>
    <div className="p-12"></div>
    <div className="p-12"></div>
    <div className="p-12"></div>
    <div className="p-12"></div>
    </div>
    // <div>
    // <div className="flex flex-col items-center justify-center">

      
    //    <div className="flex flex-col-reverse items-center p-10 md:mt-20 md:mb-12 md:w-3/4 md:flex-row">
      
    //     <div className="flex flex-col md:w-1/2">
    //       <p className="mb-2 text-2xl text-white md:text-4xl font-mlp">Welcome to Las Velas, the new home of the Velas Punks.</p>
    //       <p className="mt-5 mb-2 text-xl font-semibold text-white font-mlp">{counter}/10,777 VPunks</p>
    //       {/* <Countdown date="2021-11-15T15:00:00" renderer={renderer}/> */}
    //       <button className="self-start p-4 mt-4 font-bold transition duration-300 ease-out transform bg-green text-blue font-mlp hover:text-blue hover:bg-white hover:scale-110" onClick={mint}>
    //         Public Mint: Coming soon
    //       </button>
          
    //     </div>
    //      <div className="flex flex-col m-5">

    //       {/* <Image src={vpunkgif} alt="Picture of the author" height="480px" width="480px" className="rendering-pixelated"/> */}

    //     </div>

        
    //   </div>
    //   <div id="presale" className="flex flex-col items-center p-10 md:mt-20 md:mb-12 md:w-3/4 md:flex-row">
      
        
    //      <div className="flex flex-col m-5 md:w-1/2">

    //       {/* <Image src={vpunks} alt="Picture of the author"/> */}
    //     </div>
    //     <div className="flex flex-col m-5 md:w-1/2">
    //       <p className="mb-2 text-2xl text-white md:text-4xl font-mlp">Presale</p>
    //       <p className="mt-5 mb-2 font-semibold text-white font-mlp">Some punks are reserved for velas punks early adopters</p>
    //       <p className="mt-5 mb-2 text-xl font-semibold text-white font-mlp">{counter}/1000 VPunks</p>
    //       {/* <Countdown date="2021-11-15T13:00:00" renderer={renderer}/> */}
    //       <button className="self-start p-4 mt-4 font-bold transition duration-300 ease-out transform bg-green text-blue font-mlp hover:text-blue hover:bg-white hover:scale-110" onClick={mint}>
    //         Presale mint: Coming soon
    //       </button>
    //     </div>

        
    //   </div>
    //   </div>
    //   <h1 className="m-16 text-3xl text-center text-white font-mlp" id="roadmap">Roadmap</h1>
    //   <div className="m-auto mb-40 lg:w-1/2" ><AlternateTimeline /></div>
    
    // </div>
  )
}