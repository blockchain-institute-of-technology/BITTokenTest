const BITTokenTest = artifacts.require('./BITTokenTest.sol');
const EthAirDrop = artifacts.require('./EthAirDrop.sol')

module.exports = function(deployer, network, accounts) {
	return deployer.deploy(EthAirDrop, BITTokenTest.address);
}
