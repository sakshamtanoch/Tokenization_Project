


const MyTokenSale = artifacts.require("MyTokenSale.sol")
const MyToken = artifacts.require("MyToken.sol")
const MyKVC = artifacts.requrie("ContractKYC.sol")

const chai = require("./setupChai.js");
const expect = chai.expect;
const BN = web3.utils.BN;

require("dotenv").config({path:'../.env'});



contract("MyTokenSale test", async (accounts) => {
    it("should not have any tokens in my deployer account", async() => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(new BN(0)); // account[0] = deployer account
    });

    it("all tokens should be in the token sale smat constract", async () => {
        let instance = await MyToken.deployed();
        let balanceOf_MTS = await instance.balanceOf(MyTokenSale.address);
        let totalSupply = await instance.totalSupply();
         expect (balanceOf_MTS).to.be.a.bignumber.equal(totalSupply);   
    })

    it("should be able to buy tokens", async () => {
        let instance = await MyToken.deployed();
        let KYCinstance = await MyKVC.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        let balanceBefore = instance.balanceOf(accounts[0]);
        balanceBefore = balanceBefore.add(new BN(1));
        await KYCinstance.setKycCompleted (accounts[0], {from: accounts[0]});
        expect (tokenSaleInstance.sendTransaction({from: accounts[0], value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
        return expect( instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(balanceBefore);
    
    })
})