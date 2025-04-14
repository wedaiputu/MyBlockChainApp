const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners(); // Get the account used for deployment
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy User Contract
    const UserContract = await hre.ethers.getContractFactory("User");
    const userContract = await UserContract.deploy(1, "user1"); // Deploy contract with constructor parameters
    console.log("UserContract deployment started...");

    // Check if the deployTransaction is available
    if (!userContract.deployTransaction) {
        console.error("Deploy transaction is undefined for UserContract.");
        return;
    }

    // Wait for the deployment transaction to be mined
    const userContractReceipt = await userContract.deployTransaction.wait();

    // Check the transaction status
    if (userContractReceipt.status === 1) {
        console.log("UserContract deployed to:", userContract.address);
    } else {
        console.error("Deployment of UserContract failed.");
        return;
    }

    // Deploy Agent Contract
    const AgentContract = await hre.ethers.getContractFactory("Agent");
    const agentContract = await AgentContract.deploy(1, "user1");
    console.log("AgentContract deployment started...");

    if (!agentContract.deployTransaction) {
        console.error("Deploy transaction is undefined for AgentContract.");
        return;
    }

    const agentContractReceipt = await agentContract.deployTransaction.wait();
    if (agentContractReceipt.status === 1) {
        console.log("AgentContract deployed to:", agentContract.address);
    } else {
        console.error("Deployment of AgentContract failed.");
        return;
    }

    // Deploy Transaction Contract
    const TransactionContract = await hre.ethers.getContractFactory("Transaction");
    const transactionContract = await TransactionContract.deploy();
    console.log("TransactionContract deployment started...");

    if (!transactionContract.deployTransaction) {
        console.error("Deploy transaction is undefined for TransactionContract.");
        return;
    }

    const transactionContractReceipt = await transactionContract.deployTransaction.wait();
    if (transactionContractReceipt.status === 1) {
        console.log("TransactionContract deployed to:", transactionContract.address);
    } else {
        console.error("Deployment of TransactionContract failed.");
        return;
    }

    // Interact with deployed contracts
    await transactionContract.setUserContractAddress(userContract.address);
    await transactionContract.setAgentContractAddress(agentContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
