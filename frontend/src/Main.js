import logo from './logo.svg';
import './App.css';
import rpcInstance from './Rpc';
import history from './history';
import React, {Component} from 'react';

import Location from './Location'
import Servant from './Servant'
export default class Main extends Component {
    constructor(props) {
      super(props);
      this.state = ({master : props.master}); 
      console.log(this.state.master);   
      this.setPlayer = props.setPlayer;  
    }

    rollOne = () => {
      rpcInstance.contract.deployed()
      .then(instance => {
        instance.rollOne({from:rpcInstance.account, value:rpcInstance.web3.utils.toWei("0.001","ether")})
        .then(receipt => {
          console.log(receipt);
        })
        .catch(err => {
          console.log(err);
        })
      })
    }

    rollTen = () => {
      rpcInstance.contract.deployed()
      .then(instance => {
        instance.rollTen({from:rpcInstance.account, value:rpcInstance.web3.utils.toWei("0.01","ether")})
        .then(receipt => {
          console.log(receipt);
        })
        .catch(err => {
          console.log(err);
        })
      })
    }

    render() {
        return (
          <div className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin" onSubmit = {this.onSubmit}>
              <h2 className="w3-center">{this.state.master[0]}</h2>
               
              <div className="w3-row w3-section">
                <div className="w3-col" style={{width:"50px"}}><i className="w3-xxlarge fa fa-user"></i></div>
                  <div className="w3-rest">
                    {this.state.master[0]}
                  </div>
              </div>
              <div className="w3-row w3-section">
                <div className="w3-col" style={{width:"50px"}}><i className="w3-xxlarge fa fa-location-arrow"></i></div>
                  <div className="w3-rest">
                    <Location location = {this.state.master[2]}></Location>
                  </div>
              </div>
              <p className="w3-center">
                    <button className="w3-button w3-section w3-blue w3-ripple" onClick = {this.rollOne}> Roll 1 </button>
                    <button className="w3-button w3-section w3-blue w3-ripple" onClick = {this.rollTen}> Roll 10 </button>
                    
                </p>
              <div className="w3-row w3-section">
                <div className="w3-col" style={{width:"50px"}}><i className="w3-xxlarge fa fa-location-arrow"></i></div>
                  <div className="w3-rest">
                    <Servant servants = {this.state.master[1]} setPlayer = {this.setPlayer} choosen = {this.state.master[3].words[0]}></Servant>
                  </div>
              </div>
          </div>
        );
    }
}