// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract User {
    uint256 public userId;
    string public userName;

    constructor(uint256 _userId, string memory _userName) {
        userId = _userId;
        userName = _userName;
    }

    function getUserInfo() public view returns (uint256, string memory) {
        return (userId, userName);
    }
}
