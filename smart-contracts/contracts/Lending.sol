// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Lending is ReentrancyGuard {
    struct Loan {
        uint256 collateral;
        uint256 borrowed;
        uint256 interest;
        address borrower;
    }

    mapping(address => Loan) public loans;
    IERC20 public collateralToken;
    IERC20 public borrowToken;
    uint256 public interestRate = 5; // 5% per year, simplified

    constructor(address _collateral, address _borrow) {
        collateralToken = IERC20(_collateral);
        borrowToken = IERC20(_borrow);
    }

    function depositCollateral(uint256 amount) external {
        require(collateralToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        loans[msg.sender].collateral += amount;
        loans[msg.sender].borrower = msg.sender;
    }

    function borrow(uint256 amount) external nonReentrant {
        require(loans[msg.sender].collateral > 0, "No collateral");
        require(borrowToken.balanceOf(address(this)) >= amount, "Insufficient funds");
        loans[msg.sender].borrowed += amount;
        loans[msg.sender].interest += (amount * interestRate) / 100;
        require(borrowToken.transfer(msg.sender, amount), "Transfer failed");
    }

    function repay(uint256 amount) external nonReentrant {
        require(loans[msg.sender].borrowed >= amount, "Over repay");
        require(borrowToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        loans[msg.sender].borrowed -= amount;
    }

    function liquidate(address borrower) external nonReentrant {
        Loan memory loan = loans[borrower];
        require(loan.collateral * 80 / 100 < loan.borrowed + loan.interest, "Not liquidatable");
        // Simplified liquidation: transfer collateral to liquidator
        require(collateralToken.transfer(msg.sender, loan.collateral), "Transfer failed");
        delete loans[borrower];
    }
}
