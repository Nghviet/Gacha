// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Card is Ownable {

	struct Skill {
		string name;
		string description;
	}

  	struct Servant {
  		uint8 id;
		uint8 saint;

		string name;
		string class;
		uint8 level;
		uint8 rank;
		uint8 npLv;

		uint8 levelCap;

		Skill active;
		Skill passive;

		uint16 atk;
		uint16 def;
		uint16 hp;
		uint16 critRate;
		uint16 critMultiplier;

		uint8 atkPerLevel;
		uint8 defPerLevel;
		uint8 hpPerLevel;
	}

	mapping(address => Servant[]) drawed;

	function initMaster(address master) internal {
		Servant memory card = Servant(1, 1, "Mashu Kyrielight", "Shielder", 1, 3, 1, 60, Skill("Undefined", "Undefined"), Skill("Undefined", "Undefined"), 10, 10, 1000, 25, 200, 100, 100, 100);
		drawed[master].push(card);
	}

	function getCards(address master) internal returns(Servant[] memory){
		return drawed[master];
	}
}
