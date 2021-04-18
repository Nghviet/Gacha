import logo from './logo.svg';
import './App.css';
import rpcInstance from './Rpc';
import history from './history';
import React, {Component} from 'react';

export default class Create extends Component {
    constructor(props) {
      super(props);
      this.setPlayer = props.setPlayer;
    }

    onSubmit = evt => {
      evt.preventDefault();
      evt.persist();

      rpcInstance.contract.deployed()
      .then(instance => {
        instance.createMaster(evt.target.masterName.value, {from:rpcInstance.account})
        .then(receipt => {
          console.log(receipt);
          history.push("/");
          instance.getMaster.call()
          .then(result => {
            console.log(result);
            this.setPlayer(result);
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
          this.setPlayer(undefined);
        })
      })
    }

    render() {
        return(
            <form action="/action_page.php" className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin" onSubmit = {this.onSubmit}>
              <h2 className="w3-center">Contact Us</h2>
               
              <div className="w3-row w3-section">
                <div className="w3-col" style={{width:"50px"}}><i className="w3-xxlarge fa fa-user"></i></div>
                  <div className="w3-rest">
                    <input className="w3-input w3-border" name="masterName" type="text" placeholder="Master Name"></input>
                  </div>
              </div>

              <p className="w3-center">
                <button className="w3-button w3-section w3-blue w3-ripple"> Send </button>
              </p>
            </form>
        )
    }
}