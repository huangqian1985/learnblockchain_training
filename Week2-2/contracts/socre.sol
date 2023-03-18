pragma solidity ^0.8.0;

interface IScore {
  function setScore(address student, uint score) external;
  function getScore(address student) external view returns (uint);
}

contract Score is IScore {
  mapping(address => uint) scores;
  address public teacher;

  constructor() {
    teacher = msg.sender;
  }

  modifier onlyTeacher() {
    require(msg.sender == teacher, "Only teacher can perform this action");
    _;
  }

  function setScore(address student, uint score) external override onlyTeacher {
    require(score <= 100, "Score cannot be greater than 100");
    scores[student] = score;
  }

  function getScore(address student) external view override returns (uint) {
    return scores[student];
  }
}

contract Teacher {
  IScore public scoreContract;

  constructor(IScore _scoreContract) {
    scoreContract = _scoreContract;
  }

  function setScore(address student, uint score) external {
    scoreContract.setScore(student, score);
  }
}