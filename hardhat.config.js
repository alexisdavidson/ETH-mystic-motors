require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.13",
  networks: {
     hardhat: {
      chainId: 31337
     },
     goerli: {
       url: process.env.REACT_APP_API_URL_GOERLI_INFURA,
       accounts: ['0x' + process.env.REACT_APP_PRIVATE_KEY_GOERLI],
       allowUnlimitedContractSize: true,
       gas: 3100000,
       gasPrice: 45000000000,
     },
    //  mumbai: {
    //    url: process.env.REACT_APP_API_URL_MUMBAI_INFURA,
    //    accounts: ['0x' + process.env.REACT_APP_PRIVATE_KEY_GOERLI],
    //    allowUnlimitedContractSize: true,
    //    gas: 2100000,
    //    gasPrice: 35000000000,
    //  }
    //  mainnet: {
    //   url: process.env.REACT_APP_API_URL_MAINNET_INFURA,
    //   accounts: ['0x' + process.env.REACT_APP_PRIVATE_KEY_MAINNET],
    //   gas: 3500000,
    //   gasPrice: 40000000000
    // }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY
    // apiKey: process.env.REACT_APP_POLYGONSCAN_API_KEY
  }
};
