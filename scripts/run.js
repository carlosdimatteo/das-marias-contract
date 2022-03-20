const main = async () => {
  const BankContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const BankContract = await BankContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await BankContract.deployed();
  console.log('Contract addy:', BankContract.address);

 
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