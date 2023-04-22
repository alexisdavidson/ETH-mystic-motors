const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", fromWei(await deployer.getBalance()));
  
  const NFT = await ethers.getContractFactory("NFT");

  //Goerli
  const ownerWallet = "0xc4728ce1fB0082BE064ec71fd86E0238C454E858"
  const allowListRoot = "0xec2a9c923185fc4865da2bd18b19388b2d77f71527b171f454b4596b0f86b2d8"
  const primeListRoot = "0x562e5699f570a2be8a3aead89eae52d403994b0fb2006cca381952c18d4df318"

  //Mainnet
  // const ownerWallet = "0xc4728ce1fB0082BE064ec71fd86E0238C454E858"
  // const allowListRoot = "0xf30a51f9ebda7cede979db22b84570d8d37b5c97ca9c9a464196d6b2ca5c8c77"
  // const primeListRoot = "0x17774ea8852ddfe8b6cf569e4317904b16f7931e56659161b102be2270a21ec8"
  
  const nft = await NFT.deploy(deployer.address, allowListRoot, primeListRoot); // mainnet replace
  console.log("NFT contract address", nft.address)
  saveFrontendFiles(nft, "NFT");
  
  // GOERLI TEST FUNCTIONS TO COMMENT FOR MAINNET
  await nft.setMintEnabled(true);
  await nft.setPublicSaleEnabled(true);
  await nft.mint(2, [], {value: toWei(0.025 * 5)})
  await nft.setMintEnabled(false);
  await nft.setPublicSaleEnabled(false);
  await nft.transferOwnership(ownerWallet);
  console.log("Test functions called", parseInt(await nft.balanceOf(deployer.address)))
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
