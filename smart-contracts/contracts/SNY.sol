// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SNY is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Sunny Token", "SNY") {
        _mint(msg.sender, initialSupply);
    }

    function burn(uint256 amount) external onlyOwner {
        _burn(owner(), amount);
    }
}
