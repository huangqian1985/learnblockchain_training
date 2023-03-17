// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotOwner();
error WithdrawFail();
error WithdrawAllFail();

contract Bank {

    address public owner;
    mapping(address => uint) public userBalances;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        if(msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    receive() external payable {
        userBalances[msg.sender] += msg.value;
    }

    function getBalance(address addr) public view returns(uint) {
        return userBalances[addr];
    }

    function withdraw() public {
        uint userBala = getBalance(msg.sender);
        if (userBala > 0) {
            (bool success, ) = msg.sender.call{value:userBala}(new bytes(0));
            if (!success) {
                revert WithdrawFail();
            }
            userBalances[msg.sender] = 0;
        }
    }

    function withdrawAll() public OnlyOwner {
        uint allBalance = address(this).balance;
        (bool success, ) = address(owner).call{value:allBalance}(new bytes(0));
        if (!success) {
            revert WithdrawAllFail();
        }
    }
}