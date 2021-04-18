// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import './Card.sol';

contract Master is Card {
	mapping(address => string) masters;
	mapping(address => uint16) choosen;

	modifier exsist() {
		if(keccak256(abi.encodePacked((masters[msg.sender]))) == keccak256(abi.encodePacked((""))))
      revert();
		_;
	}
}
