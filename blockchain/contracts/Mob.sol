// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Mob is Ownable {
  	struct Monster {
  		uint16 id;
  		string name;
  		uint16 hp;
  		uint16 atk;
  		uint16 def;
  		uint16 critRate;
  		uint16 critMultiplier;

  		uint8 level;
  		string class;
  	}

  	struct Location {
  		string name;
  		uint recommendLv;
  		Monster monster;
  	}

  	Location[] locations;
  	mapping(address => Location) masterLocations;


  	function addLocation(string memory locationName, uint16 id, string memory name, uint16 hp, uint16 atk, uint16 def, uint16 critRate, uint16 critMultiplier, uint8 level, string memory class) public onlyOwner {
  		Location memory location = Location(locationName, level, Monster(id, name, hp, atk, def, critRate, critMultiplier, level, class));
  		locations.push(location);
  	}
}
