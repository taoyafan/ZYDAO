const Accounts = require('web3-eth-accounts');
const getConfig = require('../config/getConfig');
const fs = require('fs')

function createAccounts(num = 1, network = "dev") {
    const info = getConfig(network);
    const web3Accounts = new Accounts(info.RPC);
    const file = "samples/savedAccounts/accounts-" + network + ".json"; 

    // Read exist accounts
    let accounts = []
    try {
        const jsonStringFromRead = fs.readFileSync(file);
        accounts = JSON.parse(jsonStringFromRead);
    } catch (e) {
        // No exist accounts, do nothing
    }

    // Create accounts
    for (i = 0; i < num; i++) {
        const newAccount = web3Accounts.create();

        accounts.push({
            address: newAccount.address,
            key: newAccount.privateKey
        })
    }

    // Write back to file.
    const jsonStringToWrite = JSON.stringify(accounts, null, 2);
    fs.writeFileSync(file, jsonStringToWrite,{ flag:'w'});
}

// This is test code
function test() {
    createAccounts(1, "dev");
    createAccounts(1, "bsctest");
    createAccounts(2, "dev");
    createAccounts(2, "bsctest");
}

// To test, Directly call "node createAccounts.js" in this direction
if (require.main === module) {
    test();
}

module.exports = createAccounts;