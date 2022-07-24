
pragma solidity^0.5.5;

 // adding a smart contract so that only owner is able to allw KYC 
    import "@openzeppelin/contracts/ownership/Ownable.sol";

contract KYCContract is Ownable{

    mapping (address => bool ) public KYCallowed;

    function KYCCompleted ( address _account ) public onlyOwner {
        KYCallowed[_account] = true;
    }

    function KYCRevoked ( address _account) public onlyOwner {
        KYCallowed[_account] = false;
    }

}
