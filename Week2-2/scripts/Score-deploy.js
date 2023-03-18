const hre = require("hardhat");

async function main() {
  const Score = await hre.ethers.getContractFactory("Score");
  const score = await Score.deploy();

  await score.deployed();

  console.log("Score contract deployed to:", score.address);

  const Teacher = await hre.ethers.getContractFactory("Teacher");
  const teacher = await Teacher.deploy(score.address);

  await teacher.deployed();

  console.log("Teacher contract deployed to:", teacher.address);

  // Set the address of the teacher for the Score contract
  await score.setTeacher(teacher.address);

  console.log("Teacher address set in Score contract");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });