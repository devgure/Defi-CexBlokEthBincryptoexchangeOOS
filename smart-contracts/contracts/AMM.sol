// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AMM is ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public reserveA;
    uint256 public reserveB;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external nonReentrant {
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Transfer A failed");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Transfer B failed");
        reserveA += amountA;
        reserveB += amountB;
    }

    function swap(uint256 amountIn, address tokenIn) external nonReentrant returns (uint256 amountOut) {
        require(tokenIn == address(tokenA) || tokenIn == address(tokenB), "Invalid token");
        if (tokenIn == address(tokenA)) {
            require(tokenA.transferFrom(msg.sender, address(this), amountIn), "Transfer failed");
            amountOut = (amountIn * reserveB) / (reserveA + amountIn);
            require(tokenB.transfer(msg.sender, amountOut), "Transfer out failed");
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            require(tokenB.transferFrom(msg.sender, address(this), amountIn), "Transfer failed");
            amountOut = (amountIn * reserveA) / (reserveB + amountIn);
            require(tokenA.transfer(msg.sender, amountOut), "Transfer out failed");
            reserveB += amountIn;
            reserveA -= amountOut;
        }
    }
}
