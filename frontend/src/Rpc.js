import {Component} from 'react';
import Web3 from 'web3';
import TruffleContract from '@truffle/contract';
import MainArtifact from './artifacts/Main';
import CardArtifact from './artifacts/Card';
import MasterArtifact from './artifacts/Master';
import PoolingArtifact from './artifacts/Pooling';
class Rpc extends Component {
	constructor() {
		super();
		this.contracts = {};
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
		this.contracts.Main = TruffleContract(MainArtifact);
		this.contracts.Main.setProvider(provider);

		this.contracts.Master = TruffleContract(MasterArtifact);
		this.contracts.Master.setProvider(provider);

		this.contracts.Card = TruffleContract(CardArtifact);
		this.contracts.Card.setProvider(provider);

		this.contracts.Pooling = TruffleContract(PoolingArtifact);
		this.contracts.Pooling.setProvider(provider);

		this.contracts.Pooling.deployed()
		.then(instance => {
			instance.getMaster.call({from : this.address})
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
				instance.createMaster('Nghviet', {from : this.account})
				.then(receipt => {
					console.log(receipt);
				})
				.catch(err => {
					console.log(err);
				})
			})
		})
	}
}

var instance = new Rpc();

export default instance;