pragma solidity 0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract BITTokenTest is MintableToken {
    string public name = "BITTokenTest";
    string public symbol = "BIT";
    uint8 public decimals = 18;
}