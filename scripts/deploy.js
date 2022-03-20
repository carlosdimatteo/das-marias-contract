
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    "DAS MARIAS POD"
   "DMR-POD",

  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();



// Get the value of the NFT's URI.
let returnedTokenUri = await gameContract.tokenURI(1);
console.log("Token URI:", returnedTokenUri);


};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();