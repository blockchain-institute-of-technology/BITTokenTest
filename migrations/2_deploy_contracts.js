const BITTokenTestCrowdsale = artifacts.require('./BITTokenTestCrowdsale.sol');
const BITTokenTest = artifacts.require('./BITTokenTest.sol');

module.exports = function(deployer, network, accounts) {
    
    const cap = new web3.BigNumber(web3.toWei(1, 'ether'));
    const rate = new web3.BigNumber(2);
    const wallet = accounts[0];

    return deployer
        .then(() => {
            return deployer.deploy(BITTokenTest);
        })
        .then(() => {
            return deployer.deploy(
                BITTokenTestCrowdsale,
                cap,
                rate,
                wallet,
                BITTokenTest.address
            ).then(()=>{
                BITTokenTestInstance = BITTokenTest.at(BITTokenTest.address)
                BITTokenTestInstance.transferOwnership(BITTokenTestCrowdsale.address)
            });
        });
};