//SPDX-License-Identifier:UNLICENSED

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("crealty", "CRT") {
        _mint(msg.sender, initialSupply);
    }
} 