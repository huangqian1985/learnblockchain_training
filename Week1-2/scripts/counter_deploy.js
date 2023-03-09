const main = async () => {
    try {
      const counterContractFactory = await hre.ethers.getContractFactory(
        "Counter"
      );
      const counterContract = await counterContractFactory.deploy(1);
      await counterContract.deployed();
  
      console.log("Contract deployed to:", counterContract.address);
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
    
  main();

  // Contract deployed to: 0x4a91D13a68F449a0256FF8402F4cF4876bf281fD