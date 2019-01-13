// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "junior hip inject crawl anchor coyote kick jazz gym alert disorder woman neither card transfer";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.4.24", // ex:  "0.4.20". (Default: Truffle's installed solc)
      optimizer: { enabled: true, runs: 20000000}
    }
 },
 module.exports = {
  networks: {
    ropsten: {
      rinkeby: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/60e0e40b25624c9fad5f0c64f41d9b83")
      },
      network_id: 3
    }   
  }
}
};
