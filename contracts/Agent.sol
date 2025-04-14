// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Agent {
    uint256 public agentId;
    string public agentName;

    constructor(uint256 _agentId, string memory _agentName) {
        agentId = _agentId;
        agentName = _agentName;
    }

    function getAgentInfo() public view returns (uint256, string memory) {
        return (agentId, agentName);
    }
}
