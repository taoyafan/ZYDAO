# ZYJ DAO

This repository contain two contents:

1. Contracts of ZYJ DAO.

2. NodeJs sample of calling contracts.

If you only need the js samples, you don't need to setup contracts. Fouce nodejs part is enough.

## Contracts (Under folder contracts)

### Contents

(1) Source code written by solidity under contracts/contracts folder;

(2) Migration scripts under contracts/migrations folder;

(3) Test code under contracts/test folder;

(4) Utils code under contracts/utils folder;

(5) Contracts address on each network saved under contracts/addresses folder;

(6) Compile output including ABI saved under contracts/build/contracts folder;

### Setup

Copy .env.templete to .env and type in your Private key.

``` cmd
cd contracts
npm install
npm install -g truffle // If you haven't installed truffle yet.
```

### Usage

To compile: `truffle compile` --> it will generate compiled file under contracts/build/contracts folder.

To migrate to local dev network (like running ganache): `npm run m:dev`

To migrate to bsctest: `npm run m:test`

After migratation, contracts address will overwrite the old one in contracts/addresses folder.

## NodeJs samples(under folder node)

### Contents

(1) Js wrapper of ZNFT see node/samples/ZNFTWrapper.js;

(2) JS samples calling contracts under node/samples folder;

(3) Read config under node/config folder;

(4) Utils to get web3 under node/utils folder;

### Setup

Copy config.json.templete to config.json under node/config folder and type in your Private key.

```
cd node
npm install
```

### Usage

To create accounts: `node samples/createAccounts` --> It will save created accounts under node/samples/savedAccounts.

The wrapper interfaces including mint, read total nft nums, read user balance, read all user tokens

To run tests of wrapper interfaces: `node samples/ZNFTWrapper`
