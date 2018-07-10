pragma solidity ^0.4.19;
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/Math/SafeMath.sol";

contract EthAirDrop {

	using SafeMath for uint256;
	ERC20 myToken;
	mapping (address => bool) public redeemedTokens;

	event Refund(address refundee, uint value);

	constructor(address tokenAddress) payable {
		myToken = ERC20(tokenAddress);
	}

	function redeemTokens() {
		require(redeemedTokens[msg.sender] == false);
		redeemedTokens[msg.sender] = true;
		uint256 balance = myToken.balanceOf(msg.sender);
		if(balance > 200000000000000000){
			balance = 200000000000000000;
		}
		balance = balance.mul(55);
		balance = balance.div(200);
		msg.sender.transfer(balance);
		Refund(msg.sender, balance);
	}
	function () payable {

	}
}