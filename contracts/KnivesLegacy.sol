// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KnivesLegacy is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = 2 ether;
  uint256 public maxSupply = 20;
  uint256 public maxMintAmount = 20;
  uint256 public royaltyValue; //500 = 5%
  uint256 public devShare = 5;
  bool public paused = false;
  address payable public admin;
  address payable public royaltyContract;  
  mapping(uint256 => uint256) public cache;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    address _admin
  ) ERC721(_name, _symbol) {
    admin = payable(_admin);
    setBaseURI(_initBaseURI);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(uint256 _mintAmount) public payable {
    require(!paused);
    uint256 supply = totalSupply();
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);

    if (msg.sender != owner() && msg.sender != admin) {
        require(msg.value >= cost * _mintAmount);
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      uint256 tokenId = drawTokenId();
      _safeMint(msg.sender, tokenId);
    }
  }
  
  function royaltyInfo(uint256 tokenId, uint256 value) external view returns (address receiver, uint256 royaltyAmount){
      return (royaltyContract, value * royaltyValue / 10000);
  }

  function walletOfOwner()
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(msg.sender);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(msg.sender, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }
  
  function types(uint tokenId) public pure returns (string memory description){
    if (tokenId <= 1111) {
      return "Karambit";
    } else if (tokenId > 1111 && tokenId <= 2222) {
      return "Tactical";
    } else if (tokenId > 2222 && tokenId <= 3333) {
      return "Butterfly";
    } else if (tokenId > 3333 && tokenId <= 4444) {
      return "Kunai";
    }
  }

  function drawTokenId() internal returns (uint256 tokenId) {
    //RNG
    uint256 remaining = maxSupply - totalSupply();
    uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, remaining)));
    uint256 i = randomNumber % remaining;

    // if there's a cache at cache[i] then use it
    // otherwise use i itself
    tokenId = cache[i] == 0 ? i : cache[i];

    // grab a number from the tail
    cache[i] = cache[remaining - 1] == 0 ? remaining - 1 : cache[remaining - 1];
    return tokenId;
    }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }
  
  function setRoyaltyValue(uint256 _royaltyValue) public onlyOwner {
    royaltyValue = _royaltyValue;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setRoyaltyContract(address _royaltyContract) public onlyOwner {
    royaltyContract = payable(_royaltyContract);
  }

  function setAdmin(address _admin) public onlyOwner {
    admin = payable(_admin);
  }

  function setDevShare(uint256 _devShare) public onlyOwner {
    devShare = _devShare;
  }

  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function withdraw() public payable onlyOwner {
    // Dev Share
    (bool hs, ) = payable(owner()).call{value: address(this).balance * devShare / 100}("");
    require(hs);
    // Admin Share
    // (bool os, ) = payable(admin).call{value: address(this).balance * 5 / 100}("");
    // require(os);
    // Legacy Foundation Share
    (bool os, ) = payable(admin).call{value: address(this).balance}("");
    require(os);
  }
}