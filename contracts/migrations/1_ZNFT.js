const ZNFT = artifacts.require("ZNFT");
const {saveToJson} = require('../utils/jsonRW.js');

module.exports = async function (deployer, network) {
    await deployer.deploy(ZNFT);
    saveToJson("ZNFT", ZNFT.address, network);

    const znft = await ZNFT.deployed();
    await znft.addMinter("0x47f0a028B5B3eF557ffEe65f88ffb3C52305e040");
};
