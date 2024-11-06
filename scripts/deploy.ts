import { ethers } from "hardhat";

async function main() {
  try {
    console.log("Starting deployment process...");

    //this gets the contract factory
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    console.log("Contract factory created");

    //this is for deploying the contract
    console.log("Deploying contract...");
    const deploymentTransaction = await SimpleStorage.deploy();
    console.log("Deployment transaction created:", deploymentTransaction.target);

    //this is for getting the contract instance
    const simpleStorage = await deploymentTransaction.waitForDeployment();
    console.log("Contract instance created");

    //this is for getting the address
    const address = await simpleStorage.getAddress();
    
    console.log("\n======================");
    console.log("Deployment successful!");
    console.log("Contract Address:", address);
    console.log("======================\n");

    //this is for verifying the contract exists
    const code = await ethers.provider.getCode(address);
    console.log("Contract code length:", code.length);

  } catch (error) {
    console.error("\nDeployment failed!");
    console.error("Error details:", error);
    process.exit(1);
  }
}

//this is for executing the deployment
main()
  .then(() => {
    console.log("Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });