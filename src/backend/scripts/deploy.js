const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", fromWei(await deployer.getBalance()));
  
  const NFT = await ethers.getContractFactory("NFT");

  const teamWallet = "0x944932B3551e6302c0e0b1291064d66ACA205f24" // goerli

  const whitelistRoot = "0x900f6d55f0c0a25f87a71bdfa24f79de172760bb9d48fdb71d762b9c0f526a7e" // goerli
  // const whitelistRoot = "0xe41dd57c0c99fa6016139f0ed8513ae95d9028fe9a9b84fe78e075075ff155bb" // mainnet

  const freeAirDropAddresses = ["0x944932B3551e6302c0e0b1291064d66ACA205f24"] // goerli
  const freeAirDropAddressesAmount = [24] // goerli

  const nft = await NFT.deploy(teamWallet, whitelistRoot, freeAirDropAddresses, freeAirDropAddressesAmount);
  console.log("NFT contract address", nft.address)
  saveFrontendFiles(nft, "NFT");
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