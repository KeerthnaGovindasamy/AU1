pragma solidity <=0.8.21;

contract ProductDetails {
    struct Product {
        uint256 id;
        string product_name;
        string mcompany_name;
        string mlocation;
        uint256 dom;
        uint256 doe;
        string rcompany_name;
        string rlocation;
        uint256 dop;
      
    }
    struct Product2{
        string product_name;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    function addProduct(
        uint256 _id,
        string memory _product_name,
       string memory _mcompany_name,
       string memory _mlocation,
       uint256 _dom,
       uint256 _doe,
       string memory _rcompany_name,
       string memory _rlocation,
       uint256 _dop

    ) public {
        productCount++;
        products[productCount] = Product(_id, _product_name, _mcompany_name, _mlocation,_dom,_doe,_rcompany_name, _rlocation,_dop) ;
    }
}