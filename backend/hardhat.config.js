require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.24"
  },
  // paths: {
  //   artifacts: "./client/src/artifacts"
  // },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.SECRET_KEY]
    }
  }
};