// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    struct TransactionDetail {
        uint id;
        uint transaksi_id;
        string server;
        string user;
        string ipAddress;
        string mac;
        string uptime;
        string bytes_in;
        string bytes_out;
        string time_left;
        string login_by;
        string comment;
    }

    mapping(uint => TransactionDetail) public transactions;

    address public userContractAddress;
    address public agentContractAddress;

    event TransactionCreated(
        uint id,
        uint transaksi_id,
        string server,
        string user,
        string ipAddress,
        string mac,
        string uptime,
        string bytes_in,
        string bytes_out,
        string time_left,
        string login_by,
        string comment
    );

    function setUserContractAddress(address _userContractAddress) public {
        userContractAddress = _userContractAddress;
    }

    function setAgentContractAddress(address _agentContractAddress) public {
        agentContractAddress = _agentContractAddress;
    }

    function createTransaction(
        uint _transaksi_id,
        uint _id,
        string memory _server,
        string memory _user,
        string memory _ipAddress,
        string memory _mac,
        string memory _uptime,
        string memory _bytes_in,
        string memory _bytes_out,
        string memory _time_left,
        string memory _login_by,
        string memory _comment
    ) public {
        transactions[_id] = TransactionDetail(
            _id,
            _transaksi_id,
            _server,
            _user,
            _ipAddress,
            _mac,
            _uptime,
            _bytes_in,
            _bytes_out,
            _time_left,
            _login_by,
            _comment
        );

        emit TransactionCreated(
            _id,
            _transaksi_id,
            _server,
            _user,
            _ipAddress,
            _mac,
            _uptime,
            _bytes_in,
            _bytes_out,
            _time_left,
            _login_by,
            _comment
        );
    }

    function getTransaction(uint _id) public view returns (TransactionDetail memory) {
        return transactions[_id];
    }
}
