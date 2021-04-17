// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import './Master.sol';

contract Pooling is Master{
  	mapping(uint => Servant) cards;
  	mapping(uint => uint) rates;

  	uint maxId = 1;

  	uint rollPrice = 0.001 ether;

  	function rollOne() public payable{
  		require(msg.value == rollPrice);
  		Servant memory card = Servant(1, 1, "Mashu Kyrielight", "Shielder", 1, 3, 1, 90, Skill("Undefined", "Undefined"), Skill("Undefined", "Undefined"), 10, 10, 1000, 25, 200, 100, 100, 100);
  		drawed[msg.sender].push(card);
  		drawed[msg.sender][0].level = drawed[msg.sender][0].level + 1;
  	}

  	function rollTen() public payable{
  		require(msg.value == rollPrice * 10);
  		Servant[] memory ret;
  	}

  	function addServant(uint8 id, string memory name, string memory class, uint8 rank, uint16 atk, uint16 def, uint16 hp, uint8 atkPerLevel, uint8 defPerLevel, uint8 hpPerLevel) public onlyOwner {
  		require(keccak256(abi.encodePacked(cards[id].name)) == keccak256(abi.encodePacked("")));
  		cards[id] = Servant(id, 1, name, class, 1, rank, 1, 80, Skill("Undefined", "Undefined"), Skill("Undefined", "Undefined"), atk, def, hp, 25, 200, atkPerLevel, defPerLevel, hpPerLevel);
  	}

  	function removeCard(uint index, address master) internal {
  		require(index < drawed[master].length);
  		uint length = drawed[master].length;
  		drawed[master][index] = drawed[master][length - 1];
  		delete drawed[master][length - 1];
  	}
}
