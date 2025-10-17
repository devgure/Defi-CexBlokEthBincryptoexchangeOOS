const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SNY", function () {
  let SNY, sny, owner, addr1;

  beforeEach(async function () {
    SNY = await ethers.getContractFactory("SNY");
    [owner, addr1] = await ethers.getSigners();
    sny = await SNY.deploy(ethers.utils.parseEther("1000000"));
    await sny.deployed();
  });

  it("Should have correct initial supply", async function () {
    const supply = await sny.totalSupply();
    expect(supply).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow owner to burn", async function () {
    await sny.burn(ethers.utils.parseEther("100"));
    const supply = await sny.totalSupply();
    expect(supply).to.equal(ethers.utils.parseEther("999900"));
  });
});
