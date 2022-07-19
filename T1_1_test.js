
const MyToken = artifacts.require("MyToken.sol")

const chai = require("./setupChai.js.js");
const expect = chai.expect;
const BN = web3.utils.BN;




contract ( "MyToken test", accounts => {

    //const [deployerAccount, recipientAccount] = accounts;

    it ("should put 100 million tokens in the genesis block", async () => {
        const tokenInstance = await MyToken.deployed();
        const totalSupply = await tokenInstance.totalSupply();
        //let balance = await tokenInstance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), totalSupply.valueOf(), "the balance is not the same")
        return expect (await tokenInstance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
    });

        // now we have to write two more tests so that we could transfer coins from one account to anothe and other for not exceeding the initial supply amount.

    it("is possible to send tokens from one account to the another", async() => {
        const tokenInstance = await MyToken.deployed();
        const totalSupply = await tokenInstance.totalSupply();
        const sendToken = 1; 

        expect (await tokenInstance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
        expect ( await tokenInstance.transfer(accounts[1], sendToken)).to.be.fulfilled;
        expect (await tokenInstance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return expect ( await tokenInstance.balanceOf(accounts[1])).to.be.a.bignumber.equal(new BN(sendToken));
    });

    it("is not possible to send more tokens than available in total", async () => {
        let instance = await MyToken.deployed();
        let balanceOfDeployer = await instance.balanceOf(accounts[0]);
        expect ( instance.transfer(accounts[1], new BN(balanceOfDeployer + 1))).to.be.rejected;
        return expect (instance.balanceOf(accounts[1])).to.be.a.bignumber.equal(balanceOfDeployer);
    })

    
    
});


