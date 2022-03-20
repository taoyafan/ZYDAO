const ZNFT = artifacts.require("ZNFT");
const {saveToJson} = require('../utils/jsonRW.js');

module.exports = async function (deployer, network) {
  await deployer.deploy(ZNFT);
  saveToJson("ZNFT", ZNFT.address, network);
};
