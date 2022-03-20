const HDWalletProvider = require('@truffle/hdwallet-provider');
const getConfig = require('../config/getConfig');
const Web3 = require("web3")

// If we only read info from block chain, can set isUseAccount = false
// Account is only needed when we need to write something to block chain
function useWeb3(network='dev', isUseAccount=true) {
    const info = getConfig(network);

    if (isUseAccount) {
        const provider = new HDWalletProvider({
            privateKeys: [info.adminKey],
            providerOrUrl: info.RPC,
            numberOfAddresses: 1,
            pollingInterval: 60000
            })
        
        return new Web3(provider) 
    } else {
        return new Web3(info.RPC); 
    }
}

module.exports = useWeb3