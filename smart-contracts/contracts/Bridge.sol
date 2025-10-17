// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {
    event Locked(address indexed token, uint256 amount, address indexed recipient, uint256 targetChain);

    function lockTokens(address token, uint256 amount, uint256 targetChain, address recipient) external {
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Locked(token, amount, recipient, targetChain);
        // In production, emit event for relayer to pick up
    }

    function unlockTokens(address token, uint256 amount, address recipient, bytes memory proof) external onlyOwner {
        // Simplified: owner (relayer) can unlock after verification
        require(IERC20(token).transfer(recipient, amount), "Transfer failed");
    }
}
