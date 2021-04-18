import {Component} from 'react';
import Web3 from 'web3';
import TruffleContract from '@truffle/contract';
import MainArtifact from './artifacts/Main';

import history from './history';
class Rpc {
	constructor() {
		this.contracts = {};
		this.contract = null;
		this.web3 = null;
		this.account = null;
		if(window.ethereum) {
			window.ethereum.enable()
			.then(result => {
				console.log("ETH enabled");
				this.initWeb3(window.ethereum);
			})
			.catch(err => {
				console.error("User denied access");
			})
		} else if (window.web3) {
			this.initWeb3(window.web3.currentProvider);
		} else {
			this.initWeb3(Web3.providers.HttpProvider('http://localhost:7545'));
		}

		this.setPlayer = null;
	}

	initWeb3 = provider => {
		this.web3 = new Web3(provider);
		this.web3.eth.getAccounts()
		.then(result => {
			this.account = result[0];
			console.log(this.account);
			this.initContract(provider);
		})
		.catch(err => {

		})
	}

	initContract = provider => {
		this.contract = TruffleContract(MainArtifact);
		this.contract.setProvider(provider);

		this.contract.deployed()
		.then(instance => {
			instance.getMaster.call()
			.then(result => {
				if(this.setPlayer != null) this.setPlayer(result);
				console.log(result);
			})
			.catch(err => {
				console.log(err);
				if(this.setPlayer != null) this.setPlayer(undefined);
			})
		})
		.catch(err => {
			console.log(err);
		}) 
	}

	ready = () => {
		return new Promise((resolve, report) => {
			setTimeout(() => {
				if(this.contract != null) resolve();
			}, 100);
		})
	}
}

var instance = new Rpc();

export default instance;