// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ZNFT is Ownable, ERC721Enumerable{

    mapping(address => bool) private m_isMinter;

    constructor() ERC721("ZYJ NFT", "ZNFT") {
        m_isMinter[msg.sender] = true;
    }

    /* ==================================== Read ==================================== */

    function isMinter(address account) external view returns (bool) {
        return m_isMinter[account];
    }

    /* ==================================== Modifier ==================================== */

    modifier onlyMinter() {
        require(m_isMinter[msg.sender], "ZNFT: caller is not the minter");
        _;
    }

    /* ==================================== Only Minter ==================================== */
    
    function mint(address[] memory receivers) external onlyMinter {
        uint tokenNums = totalSupply();

        for (uint i = 0; i < receivers.length; i++) {
            _safeMint(receivers[i], tokenNums + i);
        }
    }

    /* ==================================== Only Owner ==================================== */

    function addMinter(address newMinter) external onlyOwner {
        m_isMinter[newMinter] = true;
    }

    function removeMinter(address removedMinter) external onlyOwner {
        m_isMinter[removedMinter] = false;
    }
}