import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  //this is the  Fixture to deploy the contract
  async function deploySimpleStorageFixture() {
    // this is for Getting the signers (accounts)
    const [owner, otherAccount] = await ethers.getSigners();

    // this is for deploying the contract
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should start with a value of 0", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      expect(await simpleStorage.getValue()).to.equal(0);
    });
  });

  describe("Operations", function () {
    it("Should set and get the correct value", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      
      // this sets the  value to 42
      await simpleStorage.setValue(42);
      expect(await simpleStorage.getValue()).to.equal(42);
    });

    it("Should emit ValueChanged event", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);
      
      await expect(simpleStorage.setValue(42))
        .to.emit(simpleStorage, "ValueChanged")
        .withArgs(42);
    });

    it("Should allow any account to set value", async function () {
      const { simpleStorage, otherAccount } = await loadFixture(
        deploySimpleStorageFixture
      );

      // this connects with other account and set value
      await simpleStorage.connect(otherAccount).setValue(100);
      expect(await simpleStorage.getValue()).to.equal(100);
    });
  });
}); 