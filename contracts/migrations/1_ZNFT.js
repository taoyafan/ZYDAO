const ZNFT = artifacts.require("ZNFT");

module.exports = async function (deployer) {
  await deployer.deploy(ZNFT);
};
