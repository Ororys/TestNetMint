/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import { store, connect } from "../store";
import { Provider } from "react-redux";
import { ConnectWallet } from "../connectwallet";
import { ClaimRewards } from "../claimrewards";

import twitter from '../public/twitter.svg';
import discord from '../public/discord.svg';
import logo from '../public/LogoFullRes.png';

import Image from 'next/image'
import Head from 'next/head'







function MyApp({ Component, pageProps }) {


  return (
    <Provider store={store}>
    <Head>
        <title>Welcome to Knives Legacy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="bg-fixed bg-cover">
      
      <nav className="bg-black">
        <div className="mx-auto shadow max-w-7xl">
        {/* max-w-6xl  */}
          <div className="flex px-6 py-8 md:justify-between md:py-14">

            {/* logo */}
            <div className="hidden md:block"> 
              <Link href="/">
                <a className="px-5 py-2 text-sm font-bold text-white align-middle shadow md:text-2xl bold font-mlp"> <Image width="123" height="100" src={logo} alt="logo"></Image></a>
              </Link>
            </div>
            
            {/* primary nav */}
            <div className="items-center hidden space-x-6 text-xs text-white md:flex font-mlp ">
              
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
              
            </div>

          </div>
        </div>
        
        {/* mobile menu */}
        
      </nav>
      <Component {...pageProps} />
    </div>
    </Provider>
  )
}

export default MyApp