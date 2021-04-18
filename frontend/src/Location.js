import logo from './logo.svg';
import './App.css';
import rpcInstance from './Rpc';
import history from './history';

export default function Location(props) {

  var attack = () => {
    rpcInstance.contract.deployed()
    .then(instance => {
      instance.attack.call({from:rpcInstance.account})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
    })
  }

  return (
    <div className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
               
      <div className="w3-row w3-section">
        <h2> {props.location.name} </h2>
        <div className="w3-rest">
          <div> Recommend Lv : {props.location.recommendLv} </div>
          <div> Monster name : {props.location.monster.name}</div>
          <div> Monster class : {props.location.monster.class}</div>
          <div> Monster HP : {props.location.monster.hp}</div>
        </div>
        
      </div>
      <p className="w3-center">
        <button className="w3-button w3-section w3-blue w3-ripple" onClick = {attack}> Attack </button>
                    
      </p>
      
    </div>
  )
}