// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "./Pooling.sol";
import "./Mob.sol";

contract Main is Mob, Pooling {
	
	uint grailPrice = 1 ether;
	uint levelUpPrice = 0.1 ether;

	function createMaster(string memory name) public {
		if(keccak256(abi.encodePacked((masters[msg.sender]))) != keccak256(abi.encodePacked(("")))) revert();
		masters[msg.sender] = name;
		Servant memory card = Servant(1, 1, "Mashu Kyrielight", "Shielder", 1, 3, 1, 60, Skill("Undefined", "Undefined"), Skill("Undefined", "Undefined"), 1, 1, 1, 1, 1, 1, 1, 1);
    drawed[msg.sender].push(card);
		masterLocations[msg.sender] = locations[0];
		choosen[msg.sender] = 0;
	}

	function getMaster() public view exsist returns(string memory, Servant[] memory, Location memory, uint16) {
		return(masters[msg.sender], drawed[msg.sender], masterLocations[msg.sender], choosen[msg.sender]);
	}

	function moveToLocation(uint index) public exsist returns(Location memory) {
		require(index < locations.length);
		masterLocations[msg.sender] = locations[index];
	}

  	function getLocation() public view exsist returns(Location[] memory) {
  		return locations;
  	}

  function changeChoosen(uint16 index) public exsist {
    choosen[msg.sender] = index;
  }

  	function attack() public exsist view returns(string memory) {
      Servant memory servant;
      Monster memory monster;
  		servant = drawed[msg.sender][choosen[msg.sender]];
  		monster = masterLocations[msg.sender].monster;
  		uint index = 0;
  		while(servant.hp > 0 && monster.hp > 0) {
  			uint16 servantDamage = 0;
        servantDamage = servant.atk * servant.atk / (servant.atk + monster.def);
  			uint16 monsterDamage = 0;
        monsterDamage = monster.atk * monster.atk / (monster.atk + servant.def);
  			if(servantDamage >= monster.hp) {
          return "Victory";
  				break;
  			} else {
  				monster.hp = monster.hp - servantDamage;
  			}

  			if(monsterDamage >= servant.hp) {
          return "Defeated";
  				break;
  			}
  			else {
  				servant.hp = servant.hp - monsterDamage;
  			}

  		}
  	}

  	function levelUp(uint index) public exsist payable {
  		require(drawed[msg.sender].length > index && drawed[msg.sender][index].level < drawed[msg.sender][index].levelCap && msg.value == levelUpPrice);
  		drawed[msg.sender][index].level++;
      drawed[msg.sender][index].atk = drawed[msg.sender][index].atk + drawed[msg.sender][index].atkPerLevel;
      drawed[msg.sender][index].def = drawed[msg.sender][index].def + drawed[msg.sender][index].defPerLevel;
      drawed[msg.sender][index].hp = drawed[msg.sender][index].hp + drawed[msg.sender][index].hpPerLevel;
  	}

  	function grail(uint index) public exsist payable {
  		require(msg.value == grailPrice && drawed[msg.sender][index].levelCap < 100 && index != 0 && drawed[msg.sender][index].levelCap == drawed[msg.sender][index].level);
  		if(drawed[msg.sender][index].levelCap < 90) drawed[msg.sender][index].levelCap = drawed[msg.sender][index].levelCap + 5;
  		else drawed[msg.sender][index].levelCap = drawed[msg.sender][index].levelCap + 2;
  	}
}
