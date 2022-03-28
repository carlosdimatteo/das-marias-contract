

 

const daiabi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const main = async () => {
  const BankContractFactory = await hre.ethers.getContractFactory('BaseVault');
  const BankContract = await BankContractFactory.deploy(
    "DAS MARIAS POD",
    "DMR-POD",
    {
    value:hre.ethers.utils.parseEther('0.00001'),
  },
  );

  //if already have a deployed address then use that for economy purposes 
  const [owner] = await hre.ethers.getSigners()
 

  const DAIContract = new hre.ethers.Contract(
    "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    daiabi,
    owner
  )

  const cDAIContract = new hre.ethers.Contract(
    "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
    daiabi,
    owner
  )

  
  await BankContract.deployed();
  console.log('Contract addy:', BankContract.address);
  const value = await BankContract.getTotalContractValue();
  const decimals = await BankContract.decimals()
  const contractDaiBalancex = await DAIContract.balanceOf(BankContract.address)
      const contractCDaiBalancex = await cDAIContract.balanceOf(BankContract.address)
  console.log({
    value,
    decimals,
    contractCDaiBalancex,
    contractDaiBalancex
    })
    
    const apprtxn = await DAIContract.approve(BankContract.address,hre.ethers.utils.parseEther('10'))
    await apprtxn.wait()
      const depositTxn = await BankContract.deposit(hre.ethers.utils.parseEther('2'))
      await depositTxn.wait()
      const newValue = await BankContract.getTotalContractValue();
      const contractDaiBalance = await DAIContract.balanceOf(BankContract.address)
      const contractCDaiBalance = await cDAIContract.balanceOf(BankContract.address)

      const userPODBalance = await BankContract.balanceOf(owner.address)
      const PODPrice = await BankContract.getProofOfDepositPrice()
      const podSupply = await BankContract.totalSupply()
      console.log('first cycle ',{newValue,contractDaiBalance,contractCDaiBalance,userPODBalance,PODPrice,podSupply})


      await DAIContract.approve(BankContract.address,hre.ethers.utils.parseEther('10'))
      const txn =  await BankContract.deposit(hre.ethers.utils.parseEther('1'))
      await txn.wait()
      const newValue2 = await BankContract.getTotalContractValue();
      const contractDaiBalance2 = await DAIContract.balanceOf(BankContract.address)
      const contractCDaiBalance2 = await cDAIContract.balanceOf(BankContract.address)
      const userPODBalance2 = await BankContract.balanceOf(owner.address)
      const PODPrice2 = await BankContract.getProofOfDepositPrice()
      const podSupply2 = await BankContract.totalSupply()
      console.log('second cycle',{newValue2,contractDaiBalance2,contractCDaiBalance2,userPODBalance2,PODPrice2,podSupply2})


      const wtxn = await BankContract.withdraw(hre.ethers.utils.parseEther('0.5'))
      await wtxn.wait()
      const userPODBalance3 = await BankContract.balanceOf(owner.address)
      const PODPrice3 = await BankContract.getProofOfDepositPrice()
      const podSupply3 = await BankContract.totalSupply()
      console.log({
        userPODBalance3,
PODPrice3,
podSupply3
        
      })
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
