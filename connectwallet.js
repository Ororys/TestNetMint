// (a) on import useDispatch depuis react-redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'

import { connectRequest, connectSuccess, connectFailed, updateAccount, updateChainId, updateChainHex }  from './store';
import { contractChainId } from './config';

export function ConnectWallet() {
  // (b) on utilise le hooks useDispatch dans notre composant
  // pour récupérer la fonction dispatch de redux
    const account = useSelector((state) => state.account);
    const chainId = useSelector((state) => state.chainId);
    // const errMsg = useSelector((state) => state.errorMsg);

    const dispatch = useDispatch();
    useEffect(() => {
        checkWallet()
    }, [])

    async function checkWallet(){
        dispatch(connectRequest());
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
        //   Web3EthContract.setProvider(ethereum);
        //   let web3 = new Web3(ethereum);
        try {
            const accounts = await ethereum.request({
            method: "eth_accounts",
            });            
            if (accounts.length > 0){
                dispatch(connectSuccess(accounts[0]));
                // dispatch(updateAccount(accounts[0]))
                // Add listeners start
                ethereum.on("accountsChanged", (accounts) => {
                    dispatch(updateAccount(accounts[0]));
                    window.location.reload();
                });
            }
            else {
                dispatch(connectFailed("No account found."));
            }

            const chainId = await ethereum.request({
            method: "net_version",
            });

            dispatch(updateChainId(chainId));

            const chainHex = await ethereum.request({ method: 'eth_chainId' });
            dispatch(updateChainHex(chainHex));
            console.log(chainHex)

            ethereum.on("chainChanged", async (chainId) => {
                dispatch(updateChainId(chainId));
                const _chainHex = await ethereum.request({ method: 'eth_chainId' });
                dispatch(updateChainHex(_chainHex));
                window.location.reload();
            });
            
            // Add listeners end
            // } else {
            // dispatch(connectFailed("Change network to Rinkeby."));
            // }
        } catch (err) {
            dispatch(connectFailed("Something went wrong."));
        }
        } else {
        dispatch(connectFailed("Install Metamask."));
        }
    }
    const connect = async() => {
        // return async (dispatch) => {
        dispatch(connectRequest());
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
        //   Web3EthContract.setProvider(ethereum);
        //   let web3 = new Web3(ethereum);
        try {
            const accounts = await ethereum.request({
            method: "eth_requestAccounts",
            });
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            // const networkId = await ethereum.request({
            // method: "net_version",
            // });
            // const NetworkData = await SmartContract.networks[networkId];
            dispatch(updateChainId(chainId));
            // dispatch({type: "UPDATE_CHAINID", payload: chainId});
            // if (networkId == 4) {
            dispatch(connectSuccess(accounts[0]));
            // dispatch({
            //     type: "CONNECTION_SUCCESS",
            //     payload: accounts[0],
            // })
            // Add listeners start
            ethereum.on("accountsChanged", (accounts) => {
                // dispatch({type: "UPDATE_ACCOUNT", payload: accounts[0]});
                dispatch(updateAccount(accounts[0]));
                window.location.reload();
            });
            const chainHex = await ethereum.request({ method: 'eth_chainId' });
            dispatch(updateChainHex(chainHex));

            ethereum.on("chainChanged", async (chainId) => {
                dispatch(updateChainId(chainId));
                const _chainHex = await ethereum.request({ method: 'eth_chainId' });
                dispatch(updateChainHex(_chainHex));
                window.location.reload();
            });
            window.location.reload();
            // Add listeners end
            // } else {
            // dispatch(connectFailed("Change network to Rinkeby."));
            // }
        } catch (err) {
            dispatch(connectFailed("Something went wrong."));
        }
        } else {
        dispatch(connectFailed("Install Metamask."));
        }
    }

    async function switchNetwork(){
        const { ethereum } = window;
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xa86a' }],//0xa86a AVAX 0x4 Rinkeby 0xa869 fuji 0x6a velas
            });
            } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: '0xa86a', rpcUrl: 'https://...' /* ... */ }],//0xa86a AVAX 0x6a velas
                });
                } catch (addError) {
                    console.log("wtf")
                }
            }
            // handle other "switch" errors
            }
            dispatch(updateChainId(chainId));
        }
    //   };
//   return <button className="px-12 py-2 font-bold text-white bg-pink-500 rounded" onClick={connect}>Connect</button>
    if (account.length > 0){
        if (chainId == contractChainId){
            return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:bg-pink-mekaverse hover:scale-110">{String(account).substring(0, 6) +
          "..." +
          String(account).substring(38)}</button>
        } else {
            return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:scale-110 hover:border-opacity-0 hover:bg-pink-mekaverse" onClick={switchNetwork}>Switch to Avalanche</button>
        }
    } else {
         return <button className="px-4 py-3 text-sm text-white transition duration-300 ease-out transform bg-black border font-mlp md:px-4 hover:scale-110 hover:border-opacity-0 hover:bg-pink-mekaverse" onClick={connect}><span>Connect Wallet</span></button>
    }
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