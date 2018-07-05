
require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  networks: {
    development: {
      	host: '127.0.0.1',
      	port: 7545,
      	network_id: '*' // Match any network id
    },
    ropsten: { 
     	provider: function() {
     		return new HDWalletProvider(process.env.WALLET_MNEMONIC, `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`, 0)
     	},
      	gas:3000000,
      	network_id: 3
    },
    live: {
    	provider: function() {
    		return new HDWalletProvider(process.env.WALLET_MNEMONIC, `https://mainnet.infura.io/${process.env.INFURA_API_KEY}`)
    	},
      gas:3000000,
     	network_id: 1
    }
  }
}
