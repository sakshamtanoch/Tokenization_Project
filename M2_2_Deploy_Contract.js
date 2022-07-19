//const { default: Web3 } = require("web3");

var MyToken = artifacts.require("MyToken.sol");
var myTokenSale = artifacts.require("MyTokenSale.sol");
var MyKVC = artufacts.reauire("contractKYC.sol");

// npw the function that we call for deploying the smart contracts

    require("dotenv").config({path:"./.env"});
    console.log(process.env);
module.exports = async function(deployer) {
    let addr = web3.eth.getAccounts();
    await deployer.deploy(MyToken,process.env);
    await deployer.deploy(myTokenSale, 1, addr[0], MyToken.address, MyKVC.address);
    await deployer.deploy(MyKVC);
    let instance = await MyToken.deployed();
    await instance.transfer(myTokenSale.address, 100000000);
     

}