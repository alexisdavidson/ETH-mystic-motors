import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./roulette.module.css";
import info from "../../images/info.png";
import { RouletteItems } from "./RouletteItems";
import { ButtonCount } from "../../ui/ButtonCount";
import { Button } from "../../ui/Button";
import { GenerateArray } from "../../utils/GenerateArray";
import NFT from '../../contractsData/NFT.json'
import NFTAddress from '../../contractsData/NFT-address.json'
import whitelistAddresses from '../allowList';
import allowList from '../allowList';
import primeList from '../primeList';
import Web3 from 'web3';
import { ethers } from 'ethers'
import configContract from "./configContract.json";

import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const buf2hex = x => '0x' + x.toString('hex')

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

const nameCollection = 'mystic-motors-olympus' // todo: change

export const Roulette = ({mintEnabled}) => {
  const [arr, setArr] = useState([]);
  const [count, setCount] = useState(1);
  const [spins, setSpins] = useState([0, 0]);
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [supply, setSupply] = useState("-");
  const [supplyPercent, setSupplyPercent] = useState(0);
  const [nft, setNFT] = useState(null)
  const [account, setAccount] = useState(null)
  const [price, setPrice] = useState(0.025)
  const [maximumAmountPerWallet, setMaximumAmountPerWallet] = useState(5)
  const ref = useRef(null);
  const [isSoldOut, setIsSoldOut] = useState(false); // set to true when soldout
  
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [isAllowList, setIsAllowList] = useState(false)
  const [isPrimeList, setIsPrimeList] = useState(false)
  const [allowListProof, setAllowListProof] = useState([])
  const [primeListProof, setPrimeListProof] = useState([])

  const NftRef = useRef();
  NftRef.current = nft;

  useEffect(() => {
    let interval = null
    if (mintEnabled) {
      loadOpenSeaData()
      interval = setInterval(() => {
        loadOpenSeaData();
      }, 10000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [])

  const getMerkleProof = (whitelist, acc) => {
    const accHashed = keccak256(acc.toString())
    const leafNodes = whitelist.map(e => keccak256(e.toString()));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    const hexProof = merkleTree.getHexProof(accHashed);

    return hexProof
}
  const loadContracts = async () => {
    console.log("loadContracts")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const nft = new ethers.Contract(NFTAddress.address, NFT.abi, signer)
    setNFT(nft)
    NftRef.current = nft
    updateContractData()

    const tempSupply = await nft.totalSupply()
    // if (tempSupply >= 4000)
    //   setIsSoldOut(true)
  }

  const loadOpenSeaData = async () => {
    console.log("loadOpenSeaData")
    //"https://eth-mainnet.g.alchemy.com"
    // let requestUrl = 'https://eth-goerli.g.alchemy.com/nft/v2/' + process.env.REACT_APP_ALCHEMY_KEY + '/getContractMetadata?contractAddress=' + NFTAddress.address
    

    let stats = await fetch(`${configContract.OPENSEA_API_TESTNETS}/collection/${nameCollection}`)
    // let stats = await fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      // return res.contractMetadata
      return res.collection.stats
    })
    .catch((e) => {
      console.error(e)
      console.error('Could not talk to OpenSea')
      return null
    })

    console.log(stats)
    const nftSupply = stats.count
    // const nftSupply = stats.totalSupply
    if (supply == "-" || nftSupply > supply) {
      setSupply(nftSupply)
      const supplyPercent = parseInt(nftSupply * 100 / 4000)
      setSupplyPercent(supplyPercent)
    }
    if (nftSupply >= 4000)
      setIsSoldOut(true)
    // console.log("supplyPercent", supplyPercent)
    // var bar = document.getElementById('barId');
    // bar.classList.remove('w');
    // bar.classList.add('w-[' + supplyPercent + '%]');
  }
  const updateContractData = async () => {
    // const priceToSet = fromWei(await NftRef.current.price())
    // setPrice(priceToSet)
  }

  const updateIsWhitelisted = async(acc, nft) => {
    console.log("getIsWhitelisted", nft)
    
    const isPublicSale = await nft.publicSaleEnabled()
    if (isPublicSale) {
      console.log("public sale is enabled")
      setIsWhitelisted(true)
      return
    }

    console.log("whitelistAddresses:")
    console.log(whitelistAddresses)
    
    const accHashed = keccak256(acc)
    const allowListProof = getMerkleProof(allowList, acc)
    const primeListProof = getMerkleProof(primeList, acc)
    
    console.log("keccak256(acc): ")
    console.log(keccak256(acc))
    const isValidAllowList = await nft.isValidAllowList(allowListProof, accHashed);
    console.log("isValidAllowList: " + isValidAllowList)
    const isValidPrimeList = await nft.isValidPrimeList(primeListProof, accHashed);
    console.log("isValidPrimeList: " + isValidPrimeList)

    if (isValidPrimeList) {
      setMaximumAmountPerWallet(10)
      setPrice(0.02375)
    }

    setIsWhitelisted(isValidAllowList || isValidPrimeList)
    setIsAllowList(isValidAllowList)
    setIsPrimeList(isValidPrimeList)
    setAllowListProof(allowListProof)
    setPrimeListProof(primeListProof)
  }

  const web3Handler = async () => {
	  console.log("web3Handler")
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await loadContracts()
    await updateIsWhitelisted(accounts[0], NftRef.current)
	  console.log("account", accounts)
    setAccount(accounts[0])
	  setWalletConnected(true);
  }

  const callAlert = (title, msg) => {
    alert(title + "\n" + msg)
  }

  const handleError = async (error) => {
    console.error("HandleError: " + error);
    if (error.toString().includes("insufficient funds for intrinsic transaction"))
      callAlert("Not Enough Funds In Your Wallet!", "There are not enough funds in your wallet to complete this transaction. Please deposit more ETH to complete your purchase!")
    else if (error.toString().includes("You are not whitelisted"))
      callAlert("You are not whitelisted!", "You are unable to mint as your wallet is not whitelisted in our Phase 2 Mint!")
    else if (error.toString().includes("Each address may only mint x NFTs!"))
      callAlert("Max limit of 5 NFTs per wallet (10 for prime list)!", "There is a max limit NFTs per wallet in our Phase 2 Mint. Please reduce your quantity and try again!")
    else if (error.toString().includes("Can't mint more than total supply"))
      callAlert("", "No more supply!")
    else if (error.toString().includes("Minting is not enabled"))
      callAlert("", "Minting is not enabled")
  }

  const mintButton = async () => {
	// Connect
	if (account == null) {
		await web3Handler();
		return;
	}

	console.log("triggerMint", count, price);

  let proofToUse = []
  if (isPrimeList)
    proofToUse = primeListProof
  else if (isAllowList)
    proofToUse = allowListProof
  
  try {
    (await nft.mint(count, proofToUse, { value: toWei(price * count) }))
    callAlert("You have successfully minted!", "Congratulations you have successfully minted your NFT(s). Check OpenSea to view your minted NFT(s).")
  }
  catch (error) {
    if (error instanceof Promise)
      await error
    handleError(error.message)
  };

}

  const handler = async () => {
      console.log(supply - spins[0] + 1)
      setArr(GenerateArray([...new Array(81)], supply - spins[0] + 1));
      ref.current.style = "transition: 0s, transform: translateX(0)";
      const scroll = ref.current.scrollWidth / 2 - ref.current.clientWidth / 2;
      setTimeout(() => {
        ref.current.style = `transform: translate3d(-${scroll}px, 0, 0); transition: 5s cubic-bezier(.21,.53,.29,.99) `;
      }, 10);

      setSpins([spins[0] - 1, spins[1]]);



    
  };

  const countHandler = (value) => {
    if (value) {
      setCount(count + 1);
    }
    else {
      setCount(count - 1);
    }
  }

  useLayoutEffect(() => {
    setArr(GenerateArray([...new Array(81)]));
    window.addEventListener("resize", () => {
      setArr(GenerateArray([...new Array(81)]));
    });
  }, []);

  const hideAll = !mintEnabled

  return (
    <>    
    
    <div className="flex text-white text-xl mt-[35px] justify-center progress-bar-text">
      <div className="">{isSoldOut ? 4000 : supply}</div>
      <div className=" opacity-50">/4000 Minted</div>
    </div>
    <div className="w-[878px] sm:w-[80%] h-[10px] gray-progress-bar bg-black relative mt-[15px]">
      <div id="barId" className="h-full blue-progress-bar bg-blue-500 absolute z-10" style={{width: `${supplyPercent}%`}}
      ></div>
    </div>
    <br></br>

      {!isSoldOut? (
        <>

        <div className="button-wrapper flex mt-[25px] w-[41%] xl:w-[50%] sm:w-[90%] justify-evenly xl:justify-between space-x-4">
          <ButtonCount onCount={countHandler} count={count} maximumAmountPerWallet={maximumAmountPerWallet} />
          {walletConnected && spins[0] === 0 && <Button handler={mintButton} text={"Mint"} />}
          {!walletConnected && <Button handler={web3Handler} text={"Connect Wallet"} />}
          {walletConnected && spins[0] > 0 && <Button handler={handler} text={"Spin (" + spins[0] + "/" + spins[1] +")"} />}
  
        </div>
        <div className="flex mt-[20px] items-center">
          <img src={info} alt="info" />
          <div className="ml-2 sm:text-xs price-text">
            <span className="colorgray">Mint price indicated in ETH</span> <span className="colorwhite">({Number(price* count).toFixed(4)} ETH)</span> 
          </div>
        </div>
        </>
      ) : (
        <div style={{fontSize: "3rem", fontWeight: "bold"}}>
          SOLD OUT
        </div>
      )}
    </>
  );
};
