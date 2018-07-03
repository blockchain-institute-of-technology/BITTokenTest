
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = 'screen suffer first hood shop sweet subway outdoor pistol call mention range';
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: { 
      provider: function() {return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/ACGcLcv1YpuFaIGnnaEo", 0)},
      gas:5000000,
      network_id: 3
    }
  }
}
