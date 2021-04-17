// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "./Pooling.sol";
import "./Mob.sol";

contract Main is Mob, Pooling {
	modifier exsist() {
		require(keccak256(abi.encodePacked((masters[msg.sender]))) != keccak256(abi.encodePacked((""))));
		_;
	}

	function createMaster(string memory name) public {
		require(keccak256(abi.encodePacked((masters[msg.sender]))) == keccak256(abi.encodePacked((""))));
		masters[msg.sender] = name;
		created[msg.sender] = 1;
		initMaster(msg.sender);
		masterLocations[msg.sender] = locations[0];
		choosen[msg.sender] = drawed[msg.sender][0];
	}

	function getMaster() public view exsist returns(string memory, Servant[] memory, Location memory) {
		return(masters[msg.sender], drawed[msg.sender], masterLocations[msg.sender]);
	}

	function moveToLocation(uint index) public exsist returns(Location memory) {
		require(index < locations.length);
		masterLocations[msg.sender] = locations[index];
	}

  	function getLocation() public view exsist returns(Location[] memory) {
  		return locations;
  	}

  	function attack() public exsist returns(uint16[] memory) {
  		uint16[] memory damages;
  		Servant memory servant = choosen[msg.sender];
  		Monster memory monster = masterLocations[msg.sender].monster;
  		uint index = 0;
  		while(servant.hp > 0 && monster.hp > 0) {
  			uint16 servantDamage = servant.atk * servant.atk / (servant.atk + monster.def);
  			uint16 monsterDamage = monster.atk * monster.atk / (monster.atk + servant.def);
  			damages[index] = servantDamage;
  			index ++;
  			if(servantDamage >= monster.hp) {
  				break;
  			} else {
  				monster.hp = monster.hp - servantDamage;
  			}


  			damages[index] = monsterDamage;
  			index++;
  			if(monsterDamage >= servant.hp) {
  				break;
  			}
  			else {
  				servant.hp = servant.hp - monsterDamage;
  			}
  		}

  		return damages;
  	}
}
