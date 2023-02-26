import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./roulette.module.css";
import info from "../../images/info.png";
import { RouletteItems } from "./RouletteItems";
import { ButtonCount } from "../../ui/ButtonCount";
import { Button } from "../../ui/Button";
import { GenerateArray } from "../../utils/GenerateArray";
import NFT from '../../contractsData/NFT.json'
import NFTAddress from '../../contractsData/NFT-address.json'
import whitelistAddresses from '../whitelistAddresses';
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

const nameCollection = 'mystic-motors-4'

export const Roulette = ({mintEnabled}) => {
  const [arr, setArr] = useState([]);
  const [count, setCount] = useState(1);
  const [spins, setSpins] = useState([0, 0]);
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [supply, setSupply] = useState("-");
  const [nft, setNFT] = useState(null)
  const [account, setAccount] = useState(null)
  const [price, setPrice] = useState(0.2)
  const ref = useRef(null);
  
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [proof, setProof] = useState([])

  const NftRef = useRef();
  NftRef.current = nft;

  useEffect(() => {
    if (mintEnabled)
      loadOpenSeaData()
    //   loadContracts()
  }, [])
  
  const loadContracts = async () => {
    console.log("loadContracts")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const nft = new ethers.Contract(NFTAddress.address, NFT.abi, signer)
    setNFT(nft)
    NftRef.current = nft
    updateContractData()
    // setLoading(false)
  }

  const loadOpenSeaData = async () => {
    let stats = await fetch(`${configContract.OPENSEA_API_TESTNETS}/collection/${nameCollection}`)
    .then((res) => res.json())
    .then((res) => {
      return res.collection.stats
    })
    .catch((e) => {
      console.error(e)
      console.error('Could not talk to OpenSea')
      return null
    })

    console.log(stats)
    setSupply(stats.count)
  }
  const updateContractData = async () => {
    const priceToSet = fromWei(await NftRef.current.price())
    setPrice(priceToSet)
    const nftSupply = parseInt(await NftRef.current.totalSupply())
    setSupply(nftSupply)
    const supplyPercent = (nftSupply * 100 / 500)

    // console.log("supplyPercent", supplyPercent)
    // var bar = document.getElementById('barId');
    // bar.classList.remove('w');
    // bar.classList.add('w-[' + supplyPercent + '%]');
  }

  const getIsWhitelisted = async(acc, nft) => {
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
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    const hexProof = merkleTree.getHexProof(accHashed);

    console.log("hexProof: ")
    console.log(hexProof);
    console.log("keccak256(acc): ")
    console.log(keccak256(acc))
    const isValid = await nft.isValid(hexProof, accHashed);
    console.log("isValid: " + isValid)

    setIsWhitelisted(isValid)
    setProof(hexProof)
    return hexProof
  }

  const web3Handler = async () => {
	  console.log("web3Handler")
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await loadContracts()
    await getIsWhitelisted(accounts[0], NftRef.current)
	  console.log("account", accounts)
    setAccount(accounts[0])
	  setWalletConnected(true);
  }

  const mintButton = async () => {
	// Connect
	if (account == null) {
		await web3Handler();
		return;
	}


	console.log("triggerMint", count, price);
	await nft.mint(count, proof, { value: toWei(price * count) })
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
      <div className="">{supply}</div>
      <div className=" opacity-50">/500 Minted</div>
    </div>
    <div className="w-[878px] sm:w-[80%] h-[10px] gray-progress-bar bg-black relative mt-[15px]">
      <div id="barId" className="h-full blue-progress-bar bg-blue-500 absolute z-10"
      ></div>
    </div>
    <br></br>

      {!hideAll ? (
        <>

        <div className="button-wrapper flex mt-[25px] w-[41%] xl:w-[50%] sm:w-[90%] justify-evenly xl:justify-between space-x-4">
          <ButtonCount onCount={countHandler} count={count}/>
          {walletConnected && spins[0] === 0 && <Button handler={mintButton} text={"Mint"} />}
          {!walletConnected && <Button handler={web3Handler} text={"Connect Wallet"} />}
          {walletConnected && spins[0] > 0 && <Button handler={handler} text={"Spin (" + spins[0] + "/" + spins[1] +")"} />}
  
        </div>
        <div className="flex mt-[20px] items-center">
          <img src={info} alt="info" />
          <div className="ml-2 sm:text-xs price-text">
            <span className="colorgray">Mint price indicated in ETH</span> <span className="colorwhite">({price* count} ETH)</span> 
          </div>
        </div>
        </>
      ) : (
        <>
        </>
      )}
      {/* <div
        className={`
        w-[1300px]
         mb-[50px] 
         2xl:w-[1000px] 
         xl:w-[800px] 
         lx:w-screen 
         lx:rounded-none 
         lx:border-x-0
          md:w-screen 
          md:h-[92px] 
          min-h-[92px] 
          max-h-[192px]
          relative
           border-white
            border-2  
            h-[192px] mt-[60px] 
            `}
      >
        <div className="slider-wrapper absolute left-[50%] translate-x-[-50%] h-full z-10">
          <div className={`${style.top} slider-wrapper-icon slider-wrapper-line-icon-left md:translate-x-[-9px]`}>
            
<svg width="54" height="50" viewBox="0 0 54 50" fill="none">
<g filter="url(#filter0_dddddd_210_2058)">
<path d="M26.9277 36.2268L13.8391 13.5567L40.0163 13.5567L26.9277 36.2268Z" fill="white"/>
</g>
<defs>
<filter id="filter0_dddddd_210_2058" x="0.427145" y="0.144705" width="53.0012" height="49.4941" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.159667"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_210_2058"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.319333"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_210_2058" result="effect2_dropShadow_210_2058"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="1.11767"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect2_dropShadow_210_2058" result="effect3_dropShadow_210_2058"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.23533"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect3_dropShadow_210_2058" result="effect4_dropShadow_210_2058"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="3.832"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect4_dropShadow_210_2058" result="effect5_dropShadow_210_2058"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="6.706"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect5_dropShadow_210_2058" result="effect6_dropShadow_210_2058"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_210_2058" result="shape"/>
</filter>
</defs>
</svg>

          </div>
          <div className="slider-wrapper-line w-[6px] md:w-[2px] bg-white h-full"></div>
          <div className={`${style.bottom} slider-wrapper-icon slider-wrapper-line-icon-right md:translate-x-[-9px]`}>
            
<svg width="54" height="50" viewBox="0 0 54 50" fill="none">
<g filter="url(#filter0_dddddd_210_2057)">
<path d="M26.9297 13.8824L40.0183 36.5525H13.8411L26.9297 13.8824Z" fill="white"/>
</g>
<defs>
<filter id="filter0_dddddd_210_2057" x="0.429099" y="0.470419" width="53.0012" height="49.4941" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.159667"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_210_2057"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.319333"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_210_2057" result="effect2_dropShadow_210_2057"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="1.11767"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect2_dropShadow_210_2057" result="effect3_dropShadow_210_2057"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.23533"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect3_dropShadow_210_2057" result="effect4_dropShadow_210_2057"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="3.832"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect4_dropShadow_210_2057" result="effect5_dropShadow_210_2057"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="6.706"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect5_dropShadow_210_2057" result="effect6_dropShadow_210_2057"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_210_2057" result="shape"/>
</filter>
</defs>
</svg>

          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
          <RouletteItems refs={ref} items={arr} />
        </div>
      </div> */}
    </>
  );
};
