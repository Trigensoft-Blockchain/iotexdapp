const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Web3 - Accounts private keys
const privateKeys = [
    "96873dd7666bf1cf14becd613084a6e50e5e670eb679ac9fd06765a6071aace0",
    "6b02476900436dfcc6a74c7d09f17c440ad153530efb66a9b4ed6a63cb90663a"
  ];

// Interact with the IoTeX testnet
const ENDPOINT= "https://babel-api.testnet.iotex.io";
// Uncomment the line below to interact with the IoTeX mainnet
// const ENDPOINT= "https://babel-api.mainnet.iotex.io";

// Instantiate the accounts provider
const provider = new HDWalletProvider(privateKeys, ENDPOINT, 0, 2);

// Instantiate the Web3 object
const web3 = new Web3(provider);

(async () => {

  // Check that Web3 is connected
  await web3.eth.net.isListening();
  console.log('Web3 is connected.');
  // Get the ChainId (IoTeX will return 4689 for mainnet and 4690 
  // for testnet). See below.
  const chainId = await web3.eth.net.getId();
  
  // Get the accounts
  let accounts = await web3.eth.getAccounts();
  console.log(`accounts: ${JSON.stringify(accounts)}`);
  
  // Configure the transfer settings
  let txConfig = {
    from: accounts[0],
    to: accounts[1],
    // notice we use a slightly higher gas limit than Ethereum default 
    // so we set it explicitely.
    gasPrice: "1000000000000",
    gas: "85000",
    value: "1000000000000000000",  // Sending 1.0 IOTX
    // IoTeX also has a different Chain Id than the Etehreum networks
    // that's why queried it above
    chainId
  };

  // Sign the tx
  let signedTx = await web3.eth.signTransaction(txConfig, accounts[2]);
  console.log("Raw signed Tx: ", signedTx.raw);

  // Calculate the expected Hash
  const txHash = await web3.utils.sha3(signedTx.raw);
  console.log("Tx Hash (calculated): ",txHash);

  // Send the transaction
  web3.eth.sendSignedTransaction(signedTx.raw)
  .on("receipt", function(receipt) {
    console.log("Tx Hash (Receipt): ", receipt.transactionHash);
  })
  .on("error", function(e) { console.log(e); });

})();