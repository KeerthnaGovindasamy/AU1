const ProductInfo = artifacts.require("ProductDetails");

module.exports = function(deployer, network, accounts) {
  const deployerAccount = accounts[7];
  deployer.deploy(ProductInfo, { from: deployerAccount });
};