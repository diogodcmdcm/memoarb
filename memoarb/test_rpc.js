require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider(`https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("Bloco atual:", blockNumber);
    } catch (error) {
        console.error("Erro ao conectar ao RPC:", error);
    }
}

main();
