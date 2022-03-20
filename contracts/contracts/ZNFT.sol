// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ZNFT is Ownable, ERC721Enumerable{

    constructor () ERC721("ZYJ NFT", "ZNFT") {}

    /* ==================================== Only Owner ==================================== */
    
    function mint(address[] memory receivers) public onlyOwner {
        uint tokenNums = totalSupply();

        for (uint i = 0; i < receivers.length; i++) {
            _safeMint(receivers[i], tokenNums + i);
        }
    }

}