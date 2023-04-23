const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", fromWei(await deployer.getBalance()));
  
  const NFT = await ethers.getContractFactory("NFT");

  const ownerWallet = "0xc4728ce1fB0082BE064ec71fd86E0238C454E858"
  const allowListRoot = "0xa43eb350b9bc5997aaaf55ab767e40e06826a2911293275e22e0ade18f02ab1e"
  const primeListRoot = "0x562e5699f570a2be8a3aead89eae52d403994b0fb2006cca381952c18d4df318"
  
  const nft = await NFT.deploy(ownerWallet, allowListRoot, primeListRoot);
  console.log("NFT contract address", nft.address)
  saveFrontendFiles(nft, "NFT");
  
  // GOERLI TEST FUNCTIONS TO COMMENT FOR MAINNET
  // await nft.setMintEnabled(true);
  // await nft.setPublicSaleEnabled(true);
  // await nft.mint(1, [], {value: toWei(0.025)})
  // await nft.setMintEnabled(false);
  // await nft.setPublicSaleEnabled(false);
  // await nft.transferOwnership(ownerWallet);
  // console.log("Test functions called", parseInt(await nft.balanceOf(deployer.address)))
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../app/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
