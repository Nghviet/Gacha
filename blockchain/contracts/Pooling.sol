// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import './Master.sol';

contract Pooling is Master{
  	mapping(uint => Servant) cards;
  	mapping(uint => uint) rates;

    Servant[] pool;
    uint totalRate = 0;
  	uint maxId = 0;

  	uint rollPrice = 0.001 ether;

  	function rollOne() public exsist payable{
  		require(msg.value == rollPrice && drawed[msg.sender].length + 1 < 256);
        uint256 genNum = uint256(blockhash(block.number-1)) + uint256(msg.sender);
        genNum = genNum % totalRate;
        for(uint id = 0;id < maxId; id++) {
            if(rates[id + 1] > genNum) {
                drawed[msg.sender].push(pool[id]);
                break;
            }
            else genNum = genNum - rates[id + 1];
        }

  	}

  	function rollTen() public exsist payable{
  		require(msg.value == rollPrice * 10 && drawed[msg.sender].length + 10 < 256);
        for(uint i = 0;i < 10 ; i ++) {
            uint256 genNum = uint256(i * (uint256(blockhash(block.number-1)) + uint256(msg.sender)));
            genNum = genNum % totalRate;
            for(uint id = 0;id < maxId; id++) {
                if(rates[id + 1] > genNum) {
                    drawed[msg.sender].push(pool[id]);
                    break;
                }
                else genNum = genNum - rates[id + 1];
            }
        }
  	}

  	function addServant(uint8 id, string memory name, string memory class, uint8 rank, uint16 atk, uint16 def, uint16 hp, uint8 atkPerLevel, uint8 defPerLevel, uint8 hpPerLevel) public onlyOwner {
  		require(keccak256(abi.encodePacked(cards[id].name)) == keccak256(abi.encodePacked("")));
  		uint8 levelCap = 60;
  		if(rank == 2) levelCap = 65;
  		if(rank == 3) levelCap = 70;
  		if(rank == 4) levelCap = 80;
  		if(rank == 5) levelCap = 90;

  		cards[id] = Servant(id, 1, name, class, 1, rank, 1, levelCap, Skill("Undefined", "Undefined"), Skill("Undefined", "Undefined"), atk, def, hp, 25, 200, atkPerLevel, defPerLevel, hpPerLevel);
        pool.push(cards[id]);
        rates[id] = uint16(2**(6 - rank));
        totalRate += uint16(2**(6 - rank));
        maxId++;
    }

  	function removeCard(uint index, address master) internal {
  		require(index < drawed[master].length && index != 0);
  		if(choosen[master] == index) choosen[master] = 0;
  		uint length = drawed[master].length;
  		drawed[master][index] = drawed[master][length - 1];
  		delete drawed[master][length - 1];
  	}
}
