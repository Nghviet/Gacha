const Pooling = artifacts.require("Pooling");

module.exports = function (deployer) {
  deployer.deploy(Pooling);
};
