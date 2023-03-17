const { expect } = require("chai");

describe("Bank", () => {

  let bankContract;
  let owner, otherAccount;

  beforeEach(async function() {
    [owner, otherAccount] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    bankContract = await Bank.deploy();
    await bankContract.deployed();
    console.log("bankContract:"+ bankContract.address)
  });

  it("getBalance", async function() {
    const amountToSend = ethers.utils.parseEther("1"); // 1 ETH

    await owner.sendTransaction({      
      value: amountToSend,      
      to: bankContract.address,
    });

    const ownerBalance = await bankContract.getBalance(owner.address);
    expect(ownerBalance).to.equal(amountToSend);

    await otherAccount.sendTransaction({      
      value: amountToSend,      
      to: bankContract.address,
    });

    const otherBalance = await bankContract.getBalance(otherAccount.address);
    expect(otherBalance).to.equal(amountToSend);

    const bankContractBalance = await ethers.provider.getBalance(bankContract.address);;
    expect(bankContractBalance).to.equal(ethers.utils.parseEther("2"));
  });
});