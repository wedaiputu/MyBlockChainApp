const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User, Agent, and Transaction Contracts", function () {
  let userContract, agentContract, transactionContract;

  before(async () => {
    const [owner] = await ethers.getSigners();
  
    const UserContract = await ethers.getContractFactory("User");
    userContract = await UserContract.deploy(1, "UserA");
    await userContract.waitForDeployment(); // ✅ v6
  
    const AgentContract = await ethers.getContractFactory("Agent");
    agentContract = await AgentContract.deploy(1, "AgentA");
    await agentContract.waitForDeployment(); // ✅ v6
  
    const TransactionContract = await ethers.getContractFactory("Transaction");
    transactionContract = await TransactionContract.deploy();
    await transactionContract.waitForDeployment(); // ✅ v6
  
    // Set relasi alamat setelah semua contract siap
    await transactionContract.setUserContractAddress(userContract.target);
    await transactionContract.setAgentContractAddress(agentContract.target);
  });
  

  it("should create a transaction with details", async function () {
    const tx = await transactionContract.createTransaction(
      94,
      100,
      "hotspot1",
      "idbc",
      "10.9.1.253",
      "00:00:00:00:00:00",
      "17s",
      "0",
      "0",
      "0m",
      "unknown",
      "up-345-03.19.25-2000"
    );
    await tx.wait();

    const saved = await transactionContract.getTransaction(100);

    expect(saved.id).to.equal(100);
    expect(saved.transaksi_id).to.equal(94);
    expect(saved.user).to.equal("idbc");
    expect(saved.server).to.equal("hotspot1");
    expect(saved.ipAddress).to.equal("10.9.1.253");
  });
});
