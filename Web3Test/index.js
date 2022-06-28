// index.js

const Web3 = require('web3');
const Big = require('big.js');

// Initialize web3.js using the IoTeX Babel endpoint
const web3 = new Web3(new Web3.providers.HttpProvider("https://babel-api.testnet.iotex.io"));

// Create a brand new account
const account = web3.eth.accounts.create();
console.log("Account created: %s", account.address);

// Query the balance of the IoTeX address io1qz02qneamgdseprun3eswcudg2runs4kwpv842
// You can use "ioctl account ethaddr <address>" to convert to Eth address format:
let address = "0xd9c87769D7Ed795D01c637aEee3d9b576dfFDBF7"
web3.eth.getBalance(address).then(
    function (balance) {
        let iotxBalance = Big(balance).div(10**18);
        console.log("Balance of %s is %s IOTX",address,iotxBalance.toFixed(18))
    });  