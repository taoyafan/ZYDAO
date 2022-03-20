'use strict';

const useWeb3 = require("../utils/useWeb3");
const ZNFT = require("../../contracts/build/contracts/ZNFT.json")
const getConfig = require('../config/getConfig');

class ZNFTWrapper {

    constructor(network) {
        const web3 = useWeb3(network);

        this.info = getConfig(network);
        this.znft = new web3.eth.Contract(ZNFT.abi, this.info.contracts.ZNFT);
    }
    
    /* ==================================== Write ==================================== */
    
    // Mint nft to a list of addresses
    // toAddresses: [user1 address, user2 address, user3 address, ...]
    async mint(toAddresses) {
        try {
            await this.znft.methods.mint(toAddresses).send({from: this.info.adminAddress});
        } catch (e) {
            console.error(e);
        }
    }

    /* ==================================== Read ==================================== */

    // Total nfts num.
    async totalSupply() {
        return +await this.znft.methods.totalSupply().call();
    }
    
    // User's nfts num.
    async balanceOf(address) {
        return +await this.znft.methods.balanceOf(address).call();
    }

    // The index nft of owner. It should less than user's balance.
    async tokenOfOwnerByIndex(address, index) {
        return +await this.znft.methods.tokenOfOwnerByIndex(address, index).call();
    }
    
    /* ==================================== Read wrappers ==================================== */
    
    // User's all nfts
    async userAllTokens(address) {
        const nums = await this.balanceOf(address);
        console.log(`User's nfts num is ${nums}`)

        const allTokens = await Promise.all(
            [...new Array(nums).keys()].map(async(i) => {
                const tokenId = await this.tokenOfOwnerByIndex(address, i);
                // console.log(`Get token id of index ${i}`)
                return tokenId
            })
        )

        // let allTokens = [];
        // for (let i = 0; i < nums; i++) {
        //     const tokenId = await this.tokenOfOwnerByIndex(address, i);
        //     allTokens.push(tokenId);
        //     console.log(`Get token id of index ${i}`)
        // }

        return allTokens
    }
}

// This is test code
async function test() {
    // Create ZNFT js class instance
    const znft = new ZNFTWrapper('dev');

    // Check total supply before mint
    let totalSupply = await znft.totalSupply();
    console.log(`Total supply before mint is ${+totalSupply}`)

    // Mint 2 token for admin(can be any other user addresses) 
    await znft.mint([znft.info.adminAddress, znft.info.adminAddress])

    // Check total supply after mint
    totalSupply = await znft.totalSupply();
    console.log(`Total supply after mint 2 token is ${+totalSupply}`)

    const adminAllToken = await znft.userAllTokens(znft.info.adminAddress);
    console.log(`Admin all nfts: ${adminAllToken}`)
}

// To test, Directly call "node createAccounts.js" in this direction
if (require.main === module) {
    test();

    // (async function main() {
    //     await new Promise((resolve) => {
    //         console.log(1);
    //         for(let i=0; i<5000000000; i++) {} 
    //         console.log(2);
    //     });
    // }) ();
}

module.exports = ZNFTWrapper
