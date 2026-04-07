const UploadEhr = artifacts.require("UploadEhr");

module.exports = function(deployer) {
  deployer.deploy(UploadEhr);
};
