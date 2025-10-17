const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SNY Token", function () {
  let SNY, sny, owner, addr1;

  beforeEach(async function () {
    SNY = await ethers.getContractFactory("SNY");
    [owner, addr1] = await ethers.getSigners();
    sny = await SNY.deploy();
    await sny.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await sny.name()).to.equal("Sunny Token");
    expect(await sny.symbol()).to.equal("SNY");
  });

  it("Should mint initial supply to owner", async function () {
    const ownerBalance = await sny.balanceOf(owner.address);
    expect(await sny.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens", async function () {
    await sny.transfer(addr1.address, 100);
    expect(await sny.balanceOf(addr1.address)).to.equal(100);
  });
});
