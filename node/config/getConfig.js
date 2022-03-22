const infoAllNet = require('./config.json');
const Accounts = require('web3-eth-accounts');

function getConfig(network='dev') {
    let info = {};
    let addressFileName = {
        'dev': "address.json",
        'bsctest': "addressBscTest.json",
    }

    if (network in infoAllNet) {
        info = infoAllNet[network];
    } else {
        throw new Error("Invalide network")
    }

    info["minterAddress"] = _getAccountAddress(info.RPC, info.minterKey);
    info["contracts"] = require("../../contracts/addresses/" + 
        addressFileName[network]); 
    
    return info
}

function _getAccountAddress(RPC, privateKey) {
    const web3Accounts = new Accounts(RPC);
    return web3Accounts.privateKeyToAccount(privateKey).address;
}


// To test, Directly call "node getConfig.js" in this direction
if (require.main === module) {

    console.log(getConfig('dev'))
    console.log(getConfig('bsctest'))
}

module.exports = getConfig