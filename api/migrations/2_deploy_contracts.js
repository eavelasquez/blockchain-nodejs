const Contacts = artifacts.require("Contacts");

module.exports = function (deployer) {
  deployer.deploy(Contacts);
};
