const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Score contract", function() {
  let owner;
  let teacher;
  let student1;
  let student2;

  let score;
  let teacherContract;

  beforeEach(async function() {
    [owner, teacher, student1, student2] = await ethers.getSigners();

    const Score = await ethers.getContractFactory("Score");
    score = await Score.connect(owner).deploy();

    const Teacher = await ethers.getContractFactory("Teacher");
    teacherContract = await Teacher.connect(owner).deploy(score.address);

    await score.setTeacher(teacherContract.address);

    await teacherContract.connect(teacher).setScore(student1.address, 100);
  });

  describe("setScore", function() {
    it("should only allow teacher to set score", async function() {
      await expect(score.connect(student1).setScore(student2.address, 80))
        .to.be.revertedWith("Only teacher can perform this action");

      await expect(score.connect(teacher).setScore(student2.address, 80))
        .to.not.be.reverted;
    });

    it("should limit score to 100", async function() {
      await expect(score.connect(teacher).setScore(student1.address, 120))
        .to.be.revertedWith("Score cannot be greater than 100");

      await expect(score.connect(teacher).setScore(student1.address, 95))
        .to.not.be.reverted;
    });
  });

  describe("getScore", function() {
    it("should get correct score", async function() {
      const score1 = await score.getScore(student1.address);
      expect(score1).to.equal(100);

      const score2 = await score.getScore(student2.address);
      expect(score2).to.equal(0);
    });
  });
});