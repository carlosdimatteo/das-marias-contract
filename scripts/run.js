const main = async () => {
  const BankContractFactory = await hre.ethers.getContractFactory('BaseVault');
  const BankContract = await BankContractFactory.deploy(
    "DAS MARIAS POD",
    "DMR-POD",
    {
    value:hre.ethers.utils.parseEther('0.01'),
  },
  );
  await BankContract.deployed();
  console.log('Contract addy:', BankContract.address);
  const value = await BankContract.getTotalContractValue();
  const decimals = await BankContract.decimals()
    console.log({
      value,
      decimals})
 
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