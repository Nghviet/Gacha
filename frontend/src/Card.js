import logo from './logo.svg';
import './App.css';
import rpcInstance from './Rpc';
import history from './history';

export default function Card(props) {
	var servant = props.servant;
	var index = props.index;

	var levelUp = () => {
		rpcInstance.contract.deployed()
		.then(instance => {
			instance.levelUp(index, {from:rpcInstance.account, value: rpcInstance.web3.utils.toWei("0.1","ether")})
			.then(receipt => {
				instance.getMaster.call()
				.then(result => {
					console.log(result);
					props.setPlayer(result);
				})
				.catch(err => {
					console.log(err);
				})
			})
			.catch(err =>{
				console.log(err);
			})
		})
		.catch(err => {
			console.log(err);
		})
	}

	var grail = () => {
		rpcInstance.contract.deployed()
		.then(instance => {
			instance.grail(index, {from:rpcInstance.account, value: rpcInstance.web3.utils.toWei("1","ether")})
			.then(receipt => {

			})
			.catch(err => {
				console.log(err);
			})
		})
		.catch(err => {
			console.log(err);
		})
	}

	var remove = () => {
		rpcInstance.contract.deployed()
		.then(instance => {
			instance.remove(index, {from : rpcInstance.account})
			.then(receipt => {

			})
			.catch(err => {
				console.log(err);
			})
		})
		.catch(err => {
			console.log(err);
		})
	}

	var choosen = () => {
		rpcInstance.contract.deployed()
		.then(instance => {
			instance.changeChoosen(index, {from : rpcInstance.account})
			.then(receipt => {
				console.log(receipt);
			})
			.catch(err => {
				console.log(err);
			})
		})
	}


	var button = null;
	console.log(props.choosen!=index);
	if(props.choosen != index) button = <button className="w3-button w3-section w3-yellow w3-ripple"  onClick = {choosen}> Choose </button>

  	return (
  		<div className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
	      	<div className="w3-row w3-section">
	        	<h2> {servant.name} </h2>
	        	<div className="w3-rest">
	          		<div> Name : {servant.name} </div>
	          		<div> Lv : {servant.level} / {servant.levelCap}      </div>
	          		<div> Rank : {servant.rank} </div>
	          		<div> Hp : {servant.hp}</div>
	          		<div> Atk : {servant.atk}</div>
	          		<div> Def : {servant.def}</div>
	          		<p className="w3-center">
		                <button className="w3-button w3-section w3-blue w3-ripple" onClick = {levelUp}> Level up </button>
		                <button className="w3-button w3-section w3-blue w3-ripple" onClick = {grail}> Grail </button>
		                <button className="w3-button w3-section w3-red w3-ripple"  onClick = {remove}> Remove </button>
		                {button}
		            </p>
	        	</div>
	        
	      	</div>
    	</div>
  	);
}