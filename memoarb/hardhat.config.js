require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    arbitrumSepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // Aqui vai a API Key da Alchemy
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Aqui vai a chave privada da Metamask (sem "0x" no .env)
    }
  }
};
