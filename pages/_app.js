/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { store, connect } from "../store";
import { Provider } from "react-redux";
import { ConnectWallet } from "../connectwallet";
import { ClaimRewards } from "../claimrewards";
// import { Display } from "../display";
// import { ContractBalance } from '../contract-balance';
import twitter from '../public/twitter.svg';
import discord from '../public/discord.svg';
import logo from '../public/logoknife.png';

// import gitbook from '../public/gitbook.svg';
import Image from 'next/image'
import Head from 'next/head'
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

// import { PickWinners } from '../pick-winners';
// import { PonyataPower } from '../ponyata-power';




function MyApp({ Component, pageProps }) {
  // const dispatch = useDispatch();
  // const wa = useSelector((state) => state.blockchain);
  // const [hidden,setHidden] = useState("hidden")
  
  // function changeHidden(){
  //   if (hidden){
  //     setHidden("")
  //   } else{
  //     setHidden("hidden")
  //   }
  // }

  return (
    <Provider store={store}>
    {/* <div className="bg-fixed bg-cover bg-gradient-to-r from-blue via-yellow to-pink"> */}
    <Head>
        <title>Welcome to Knives Legacy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="bg-fixed bg-cover">
      {/* <nav className="sm:pl-2 sm:pr-2 lg:p-10">
      <div className="flex justify-between">
        
          <div className="flex inline-block pt-3 pb-3 pl-4 pr-4 transition duration-300 ease-out transform shadow-xl bg-green text-blue hover:bg-black hover:text-white hover:scale-110">
            <Link href="/">
            <a className="text-4xl font-bold align-middle bold font-mlp">VELAS PUNKS</a>
            </Link>
            
          </div>
        
          <div className="flex items-center mt-4 place-content-end">
            <Link href="/">
              <a className="text-base text-white font-mlp lg:mr-6 sm:mr-2 hover:text-green">
                Mint
              </a>
            </Link>
            <Link href="/#presale">
              <a className="text-base text-white font-mlp lg:mr-6 sm:mr-2 hover:text-green">
                Presale
              </a>
            </Link>
            <Link href="/#roadmap">
              <a className="text-base text-white font-mlp lg:mr-6 sm:mr-2 hover:text-green">
                Roadmap
              </a>
            </Link>
            <Link href="/mynfts">
              <a className="text-base text-white font-mlp lg:mr-6 sm:mr-2 hover:text-green">
                My NFTs
              </a>
            </Link>
            
            <Link href="/">
            <Tooltip title="Coming soon">
              <a className="text-base text-white font-mlp lg:mr-6 sm:mr-2 hover:text-green">
                Marketplace
              </a>
              </Tooltip>
            </Link>
            
            <ConnectWallet />
            <a href="https://twitter.com/VelasPunks" target="_blank" rel="noreferrer" className="ml-4"><Image src={twitter}  alt="twitter" /></a>
              <a href="https://discord.gg/E3KrubuffW" target="_blank" rel="noreferrer" className="ml-4"><Image src={discord}  alt="discord" /></a>

             
          </div>
        </div>
      </nav> */}
      <nav className="bg-black">
        <div className="max-w-6xl mx-auto shadow">
        {/* max-w-6xl  */}
          <div className="flex px-6 py-8 md:justify-between md:py-14">

            {/* logo */}
            <div className="hidden md:block"> 
              <Link href="/">
                <a className="px-5 py-2 text-sm font-bold text-white align-middle shadow md:text-2xl bold font-mlp"> <Image height="100" width="100" src={logo} alt="logo"></Image></a>
              </Link>
            </div>
            
            {/* primary nav */}
            <div className="items-center hidden space-x-6 text-xs text-white md:flex font-mlp ">
              {/* <Link href="/">
                <a className="duration-300 transtion hover:text-green">
                  Mint
                </a>
              </Link>
              <Link href="/#presale">
                <a className="duration-300 transtion hover:text-green">
                  Presale
                </a>
              </Link>
              <Link href="/#roadmap">
                <a className="duration-300 transtion hover:text-green">
                  Roadmap
                </a>
              </Link>
              <Link href="/mynfts">
                <a className="duration-300 transtion hover:text-green">
                  My NFTs
                </a>
              </Link>
              <Link href="/">
                <Tooltip title="Coming soon">
                  <a className="duration-300 transtion hover:text-green">
                    Marketplace
                  </a>
                  </Tooltip>
              </Link> */}
              <Link href="/#mint">
                <a className="text-base text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                  Mint
                </a>
              </Link>
              <Link href="/mynfts">
              <a className="text-base text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                My NFTs
              </a>
              </Link>
              <Link href="/soldiers">
              <a className="text-base text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                Soldiers
              </a>
              </Link>
              <a href="https://twitter.com/KnivesLegacyNFT" target="_blank" rel="noreferrer" className="pt-2 pb-1 pl-3 pr-3 duration-300 ease-out transform border border-white hover:scale-110 hover:bg-pink-mekaverse"><Image priority={true} src={twitter}  width={17} alt="twitter" /></a>
              <a href="http://discord.gg/bgXWdSsXZx" target="_blank" rel="noreferrer" className="pt-2 pb-1 pl-3 pr-3 duration-300 ease-out transform border border-white hover:scale-110 hover:bg-pink-mekaverse"><Image priority={true} src={discord} width={17} alt="discord" /></a>
              <ClaimRewards />
              <ConnectWallet />
            </div>

            {/* secondary nav */}
            {/* <div>
              <a href="https://twitter.com/VelasPunks" target="_blank" rel="noreferrer" className="ml-4"><Image src={twitter}  alt="twitter" /></a>
              <a href="https://discord.gg/E3KrubuffW" target="_blank" rel="noreferrer" className="ml-4"><Image src={discord}  alt="discord" /></a>
            </div> */}

            {/* mobile */}
            <div className="flex items-center justify-end space-x-4 md:space-x-10 md:hidden">
              <ConnectWallet />
              <Link href="/#mint">
                <a className="text-xs text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                  Home
                </a>
              </Link>
              <Link href="/mynfts">
              <a className="text-xs text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                My NFTs
              </a>
              </Link>
              <Link href="/soldiers">
              <a className="text-base text-white duration-300 font-mlp transtion hover:text-pink-mekaverse">
                Soldiers
              </a>
              </Link>
              <a href="https://twitter.com/KnivesLegacyNFT" target="_blank" rel="noreferrer" className="ml-4"><Image priority={true} src={twitter}  alt="twitter" /></a>
              
              <a href="https://http://discord.gg/bgXWdSsXZx" target="_blank" rel="noreferrer" className="ml-4"><Image priority={true} src={discord}  alt="discord" /></a>
              {/* <button onClick={changeHidden}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" stroke="white"/>
                </svg>
              </button> */}
            </div>

          </div>
        </div>
        
        {/* mobile menu */}
        {/* <div className={hidden + " md:hidden"}>
          <Link href="/">
            <a className="block px-4 py-2 text-sm transition duration-200 bg-white hover:bg-white hover:text-blue font-mlp text-blue">
              Mint
            </a>
          </Link>
          <Link href="/#presale">
            <a className="block px-4 py-2 text-sm transition duration-200 bg-white hover:bg-white hover:text-blue font-mlp text-blue">
              Presale
            </a>
          </Link>
          <Link href="/#roadmap">
            <a className="block px-4 py-2 text-sm transition duration-200 bg-white hover:bg-white hover:text-blue font-mlp text-blue">
              Roadmap
            </a>
          </Link>
          <Link href="/mynfts">
            <a className="block px-4 py-2 text-sm transition duration-200 bg-white hover:bg-white hover:text-blue font-mlp text-blue">
              My NFTs
            </a>
          </Link>
          <Link href="/">
            <Tooltip title="Coming soon">
              <a className="block px-4 py-2 text-sm transition duration-200 bg-white hover:bg-white hover:text-blue font-mlp text-blue">
                Marketplace
              </a>
              </Tooltip>
          </Link>
          <ConnectWallet />
        </div> */}
      </nav>
      <Component {...pageProps} />
    </div>
    </Provider>
  )
}

export default MyApp