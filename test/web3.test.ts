import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage } from "../src/typechain-types";

describe("SimpleStorage", function () {
  async function deploySimpleStorageFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = (await SimpleStorageFactory.deploy()) as unknown as SimpleStorage;
    await simpleStorage.waitForDeployment();

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

      await simpleStorage.connect(otherAccount).setValue(100);
      expect(await simpleStorage.getValue()).to.equal(100);
    });
  });
}); 