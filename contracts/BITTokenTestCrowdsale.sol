pragma solidity 0.4.19;

import './BITTokenTest.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';


contract BITTokenTestCrowdsale is CappedCrowdsale, MintedCrowdsale {
    function BITTokenTestCrowdsale
        (
            uint256 _cap,
            uint256 _rate,
            address _wallet,
            MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap) {

        }
}