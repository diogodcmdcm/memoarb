const hre = require("hardhat");

async function main() {
  const MemoNFT = await hre.ethers.getContractFactory("MemoNFT");
  console.log("Deploying...");
  await new Promise(resolve => setTimeout(resolve, 5000)); // Adiciona 5s de delay
  const memoNFT = await MemoNFT.deploy();
  
  await memoNFT.waitForDeployment();

  const contractAddress = await memoNFT.getAddress(); // ✅ Obtém o endereço corretamente

  console.log("Contrato NFT implantado em:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});