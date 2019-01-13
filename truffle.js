// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "animal club fault vendor wood rail wise victory canal nerve orange apart";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
     
      development: {
        host: '127.0.0.1',
        port: 8545,
        network_id: "*",
        gas: 10000000
      }, 
      rinkeby: {
        provider: function() { 
          return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/60e0e40b25624c9fad5f0c64f41d9b83') 
        },
        network_id: 4
      }
  
  },
  compilers: {
    solc: {
      version: "0.4.24", // ex:  "0.4.20". (Default: Truffle's installed solc)
      optimizer: { enabled: true, runs: 20000000}
    }
 }
 
};
