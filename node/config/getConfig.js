const infoAllNet = require('./config.json');

function getConfig(network='dev') {
    if (network in infoAllNet) {
        return infoAllNet[network];
    } else {
        throw new Error("Invalide network")
    }
}

module.exports = getConfig