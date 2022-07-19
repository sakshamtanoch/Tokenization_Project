

pragma solidity >=0.4.22 <0.9.0;

import"./crowdSale.sol";
import"./ContractKYC.sol";
contract myTokenSale is Crowdsale {
   
    ContractKYC kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        address payable _contract,
        IERC20 token
        ContractKYC _kyc;
    )
         Crowdsale (rate, wallet, token)
        public
    {
        kyc = _kyc ; 
    }

     function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        super._preValidatePurchase(beneficiary, weiAmount);
        require (kyc.KYCCompleted(msg.sender), "the kyc is not complete");
    }

}