// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import './Card.sol';

contract Master is Card {
	mapping(address => string) masters;
	mapping(address => uint) created;
	mapping(address => Servant) choosen;
}
