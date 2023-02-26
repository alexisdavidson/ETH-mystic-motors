import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./roulette.module.css";
import info from "../../images/info.png";
import { RouletteItems } from "./RouletteItems";
import { ButtonCount } from "../../ui/ButtonCount";
import { Button } from "../../ui/Button";
import { GenerateArray } from "../../utils/GenerateArray";
import Web3 from 'web3';

import { Buffer } from "buffer/";
window.Buffer = window.Buffer || Buffer;

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const buf2hex = x => '0x' + x.toString('hex')

const addresses = [
  '0x62412757075f4BDe3349487266771e706645478E',
  '0x1Ef783A063bbF0c62887E256bfEcC6dF93e14164',
  '0xE72785921778Ec0004161BBDd5A160B1Ad5947F4',
  '0x59806fddA0300CB31D5620C9cD49D4757C14f221',
  '0x3243aD4099af28b77a3aB24c66d98D68AdeB6984',
  '0xA9bd3F876E2153603bbc871dD566034774c370b5',
  '0x7bBc228012689c5E1CC0D1175458B10fCA6cE063',
  '0xc2eAdacB575BBdD4A434b8DB44477A678D60EE69',
  '0x49af09BEB384739719Ab9a89F8C92A9c85dc84e3',
  '0x3Bb63438736e7930B8148f73E402f1807f93e53d'
  ]

const leaves = addresses.map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = buf2hex(tree.getRoot());
console.log(root)



const address = "0x6e2Ebe8C137aa482907d2Ca576fc2EFFf110395A";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32",
				"name": "leaf",
				"type": "bytes32"
			}
		],
		"name": "mintPresale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "mintPublic",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "mintReserved",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "baseURI_",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "contractState_",
				"type": "uint256"
			}
		],
		"name": "setContractState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxSale",
				"type": "uint256"
			}
		],
		"name": "setMaxSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "merkleRoot_",
				"type": "bytes32"
			}
		],
		"name": "setMerkleRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "saleAllowance",
				"type": "uint256"
			}
		],
		"name": "setSaleAllowance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "setTokenPricePresale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "setTokenPricePublic",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractState",
		"outputs": [
			{
				"internalType": "enum MysticMotors.ContractState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "minter",
				"type": "address"
			}
		],
		"name": "getMintsPerAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSalePlusOne",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "merkleRoot",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "mintsPerAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextOwnerToExplicitlySet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "saleAllowancePlusOne",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPricePresale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPricePublic",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "root",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "leaf",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];



export const Roulette = () => {
  const [arr, setArr] = useState([]);
  const [count, setCount] = useState(1);
  const [spins, setSpins] = useState([0, 0]);
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [supply, setSupply] = useState("-");
  const ref = useRef(null);
  

  
  window.ethereum?.on('accountsChanged', accounts => {
    console.log(accounts[0]);
    if (!accounts[0]) {
      setWalletConnected(false);
    }
    else {
      setWallet(accounts[0])
    }
  });

  const handler = async () => {
      setArr(GenerateArray([...new Array(81)]));
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

  const loadData = async () => {
    const contract = new window.web3.eth.Contract(abi, address);
    console.log(contract);
    
    const newSupply = await contract.methods.totalSupply().call();
    setSupply(newSupply);
  }

  const connectMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await window.web3.eth.getAccounts();
    console.log(accounts);
    setWallet(accounts[0]);
    setWalletConnected(true);

    const networkId = await window.web3.eth.net.getId()
    /*if (networkId != 1) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
      });
    }*/

    await loadData();

  }

  const mint = async () => {
    const contract = new window.web3.eth.Contract(abi, address);
    console.log(contract); 
    
    const contractState = await contract.methods.contractState().call();

    if (contractState == 0) {
      alert("Sale is not Open!");
    }
    else if (contractState == 1) {
      const leaf = buf2hex(keccak256(wallet));
      const proof = tree.getProof(leaf).map(x => buf2hex(x.data));
      const whitelisted = tree.verify(proof, leaf, root);

      if (!whitelisted) {
        alert("Wallet is not Whitelisted!");
      }
      else {
        const tokenPrice = parseInt(await contract.methods.tokenPricePresale().call());
        console.log(tokenPrice * count)
        const balance = parseInt(await window.web3.eth.getBalance(wallet));
        console.log(balance)
        const mintsPerAddress = parseInt(await contract.methods.mintsPerAddress(wallet).call());
        console.log(mintsPerAddress + count)
        const saleAllowancePlusOne = parseInt(await contract.methods.saleAllowancePlusOne().call());
        console.log(saleAllowancePlusOne)

        if (mintsPerAddress + count >= saleAllowancePlusOne) {
          alert("Exceeds allowance!");
          return
        }

        if (tokenPrice * count > balance) {
          alert("Insufficient Funds to Mint this amount of Tokens!");
          return
        }


        const gas = await contract.methods.mintPresale(count, proof, leaf).estimateGas({from: wallet, value: tokenPrice * count});

        const method = await contract.methods.mintPresale(count, proof, leaf).send({from: wallet, value: tokenPrice * count, gas: gas}).on('receipt', async function(receipt) {
          await loadData();
          setSpins([count, count])
          alert("You have Successfully Minted!");
        });
      }
    }
    else {
      const tokenPrice = parseInt(await contract.methods.tokenPricePresale().call());
        console.log(tokenPrice * count)
        const balance = parseInt(await window.web3.eth.getBalance(wallet));
        console.log(balance)
        const mintsPerAddress = parseInt(await contract.methods.mintsPerAddress(wallet).call());
        console.log(mintsPerAddress + count)
        const saleAllowancePlusOne = parseInt(await contract.methods.saleAllowancePlusOne().call());
        console.log(saleAllowancePlusOne)

        if (mintsPerAddress + count >= saleAllowancePlusOne) {
          alert("Exceeds allowance!");
          return
        }

        if (tokenPrice * count > balance) {
          alert("Insufficient Funds to Mint this amount of Tokens!");
          return
        }

        const gas = await contract.methods.mintPublic(count).estimateGas({from: wallet, value: tokenPrice * count});

        const method = await contract.methods.mintPublic(count).send({from: wallet, value: tokenPrice * count, gas: gas}).on('receipt', async function(receipt) {
          await loadData();
          setSpins([count, count])
          alert("You have Successfully Minted!");
        });
    }
  }

  useLayoutEffect(() => {
    setArr(GenerateArray([...new Array(81)]));
    window.addEventListener("resize", () => {
      setArr(GenerateArray([...new Array(81)]));
    });
  }, []);

  return (
    <>    
    
      <div className="flex text-white text-xl mt-[35px] justify-center">
    <div>{supply}</div>
    <div className="opacity-50">/500 NFT</div>
  </div>
  <div className="w-[500px] sm:w-[80%] h-[7px] bg-black relative mt-[15px]">
    <div
      className={`h-full bg-blue-500 w-[75%] absolute z-10 ${style.bord}`}
    ></div>
  </div>

      <div className="button-wrapper flex mt-[25px] w-[41%] xl:w-[50%] sm:w-[90%] justify-evenly xl:justify-between space-x-4">
        <ButtonCount onCount={countHandler} count={count}/>
        {walletConnected && spins[0] === 0 && <Button handler={mint} text={"Mint"} />}
        {!walletConnected && <Button handler={connectMetamask} text={"Connect Wallet"} />}
        {walletConnected && spins[0] > 0 && <Button handler={handler} text={"Spin (" + spins[0] + "/" + spins[1] +")"} />}

      </div>
      <div className="flex mt-[20px] items-center">
        <img src={info} alt="info" />
        <div className="ml-2 sm:text-xs price-text">
          <span className="colorgray">Mint price indicated in ETH</span> <span className="colorwhite">(0.02 ETH)</span> 
        </div>
      </div>
      <div
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
      </div>
    </>
  );
};
