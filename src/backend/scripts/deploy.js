const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", fromWei(await deployer.getBalance()));
  
  const NFT = await ethers.getContractFactory("NFT");

  //Goerli
  // const teamWallet = "0x944932B3551e6302c0e0b1291064d66ACA205f24"
  // const whitelistRoot = "0x900f6d55f0c0a25f87a71bdfa24f79de172760bb9d48fdb71d762b9c0f526a7e"
  // const freeAirDropAddresses = ["0x944932B3551e6302c0e0b1291064d66ACA205f24"]
  // const freeAirDropAddressesAmount = [24]

  //Mainnet
  const teamWallet = "0x944932B3551e6302c0e0b1291064d66ACA205f24"
  const whitelistRoot = "0x900f6d55f0c0a25f87a71bdfa24f79de172760bb9d48fdb71d762b9c0f526a7e"
  const freeAirDropAddresses = [
    "0x91124b4446e99CaecC01E12c7c261d088571fE08",
    "0xf854441935334F778502f89B96D60aa1B63faa14",
    "0x91bec01563B98023B493020F7A1c34A2C2eA305E",
    "0xAd02CfF24091D2E39026a06E4e7200a9C0183C5C",
    "0x269b7Fb9F7Be8945E6d0fD5c132E86c79ab55D2B",
    "0xfdC87078E0d38C1fF22aF81B7294df2Bca441925",
    "0x944932B3551e6302c0e0b1291064d66ACA205f24",
  ]
  const freeAirDropAddressesAmount = [
    1,
    2,
    1,
    1,
    1,
    1,
    24,
  ]

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
