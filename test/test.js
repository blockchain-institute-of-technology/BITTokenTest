const BITtoken = artifacts.require('BITTokenTest')
const sale = artifacts.require('BITTokenTestCrowdsale')
const airdrop = artifacts.require('EthAirDrop')
const BigNumber = web3.BigNumber;


const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('BITTokenTest', (accounts) => {

	const cap = new web3.BigNumber(web3.toWei(2, 'ether'));
  	const lessThanCap = new web3.BigNumber(web3.toWei(.1, 'ether'));
    const rate = new web3.BigNumber(2);
    const wallet = accounts[9];


	beforeEach(async function () {
    	this.token = await BITtoken.new();
   		this.crowdsale = await sale.new(cap, rate, wallet, this.token.address);
   		this.airdrop = await airdrop.new(this.token.address)
    	await this.token.transferOwnership(this.crowdsale.address);
  	})

	describe("Assertion Test", function(){
		it.skip('Should assert true.', function(){
			assert.equal(1,1)
		})
	})

	describe("Token Contract Deployment",function(){
		it.skip('Should have zero intial supply', async function(){
			let _totalSuppply = await this.token.totalSupply();
			assert.equal(_totalSuppply.valueOf(), 0, "0 wasn't totalSupply");
		})
		it.skip('Should be owned by Crowdsale Contract',async function(){
			let owner = await this.token.owner()
			assert.equal(owner, this.crowdsale.address)
		})
	})

	describe('Buying tokens', function(){
		
		it.skip('Should accept payments within cap', async function(){
			let _totalSuppply = await this.token.totalSupply();
      		//console.log('Total Supply', _totalSuppply.valueOf())
			await this.crowdsale.send(cap.minus(lessThanCap)).should.be.fulfilled;
      		await this.crowdsale.send(lessThanCap).should.be.fulfilled;
		})
		it.skip('should reject payments outside cap', async function(){
			await this.crowdsale.send(cap);
      		await this.crowdsale.send(1).should.be.rejectedWith('revert');
		})
		it.skip('should reject payments that exceed cap', async function(){
			await this.crowdsale.send(cap.plus(1)).should.be.rejectedWith('revert');	
		})
		it('should redeem BIT Tokens for ETH', async function(){
			beforeTokens = await this.token.balanceOf(accounts[1])
			await web3.eth.sendTransaction({
				from:accounts[1],
				to:this.crowdsale.address,
				value:lessThanCap
			})
			//await this.crowdsale.send(cap, {from: accounts[1]});
			afterTokens = await this.token.balanceOf(accounts[1])
			console.log('before tokens', beforeTokens.toString(10))
			console.log('after tokens', afterTokens.toString(10))
			beforeBal = await web3.eth.getBalance(accounts[1]);
			//await this.airdrop.redeemTokens({from:accounts[1]});
			afterBal = await web3.eth.getBalance(accounts[1]);
			console.log("before Bal", beforeBal)
			console.log('after bal', afterBal)
			assert.equal(afterBal, beforeBal+cap*1.1)
		})
	})

	describe('ending', function () {
    	it.skip('should not reach cap if sent under cap', async function () {
      		let capReached = await this.crowdsale.capReached()
      		capReached.should.equal(false)
     		await this.crowdsale.send(lessThanCap)
     		capReached = await this.crowdsale.capReached()
      		capReached.should.equal(false)
    	})
		it.skip('should not reach cap if sent just under cap', async function () {
      		await this.crowdsale.send(cap.minus(1))
      		let capReached = await this.crowdsale.capReached()
      		capReached.should.equal(false)
    	})
    	it.skip('should reach cap if cap sent', async function () {
      		await this.crowdsale.send(cap)
      		let capReached = await this.crowdsale.capReached()
      		capReached.should.equal(true)
    	})
 	})
})