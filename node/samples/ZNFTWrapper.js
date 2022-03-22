'use strict';

const useWeb3 = require("../utils/useWeb3");
const ZNFT = require("../../contracts/build/contracts/ZNFT.json")
const getConfig = require('../config/getConfig');

class ZNFTWrapper {

    constructor(network) {
        const web3 = useWeb3(network);
        const web3NoAccount = useWeb3(network, false);  // Used for all read interface

        this.info = getConfig(network);
        this.znft = new web3.eth.Contract(ZNFT.abi, this.info.contracts.ZNFT);
        this.znftNoAccount = new web3NoAccount.eth.Contract(ZNFT.abi, this.info.contracts.ZNFT);
    }
    
    /* ==================================== Write ==================================== */
    
    // Mint nft to a list of addresses
    // toAddresses: [user1 address, user2 address, user3 address, ...]
    async mint(toAddresses) {
        try {
            await this.znft.methods.mint(toAddresses).send({from: this.info.minterAddress});
        } catch (e) {
            console.error(e);
        }
    }

    /* ==================================== Read ==================================== */

    // Total nfts num.
    async totalSupply() {
        return +await this.znftNoAccount.methods.totalSupply().call();
    }
    
    // User's nfts num.
    async balanceOf(address) {
        return +await this.znftNoAccount.methods.balanceOf(address).call();
    }

    // The index nft of owner. It should less than user's balance.
    async tokenOfOwnerByIndex(address, index) {
        return +await this.znftNoAccount.methods.tokenOfOwnerByIndex(address, index).call();
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
        //     // console.log(`Get token id of index ${i}`)
        // }

        return allTokens
    }
}

// This is test code, network should be dev or bsctest
async function test(network='dev') {
    // Create ZNFT js class instance
    const znft = new ZNFTWrapper(network);

    // Check total supply before mint
    let totalSupply = await znft.totalSupply();
    console.log(`Total supply before mint is ${+totalSupply}`)

    // Mint 2 token for minter(can be any other user addresses) 
    await znft.mint([znft.info.minterAddress, znft.info.minterAddress])

    // Check total supply after mint
    totalSupply = await znft.totalSupply();
    console.log(`Total supply after mint 2 token is ${+totalSupply}`)

    const adminAllToken = await znft.userAllTokens(znft.info.minterAddress);
    console.log(`Minter all nfts: ${adminAllToken}`)
}

// To test, Directly call "node ZNFTWrapper.js" in this direction
if (require.main === module) {
    console.log("Test started");

    // test('dev').then(() => {
    //     console.log("Test finished");
    // })

    test('bsctest').then(() => {
        console.log("Test finished");
    })
}

module.exports = ZNFTWrapper
