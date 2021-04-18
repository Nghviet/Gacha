import logo from './logo.svg';
import './App.css';
import rpcInstance from './Rpc';
import history from './history';
import React, {Component} from 'react';

import Card from './Card';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servants : props.servants,
      choosen : props.choosen
    }
    console.log(props.choosen)

    this.setPlayer = props.setPlayer;
    console.log(props.servants);
  }

  render() {
    return (
      <div>
        {this.state.servants.map((servant,index) => 
          (<Card key = {index} servant = {servant} index = {index} setPlayer = {this.setPlayer} choosen = {this.state.choosen}></Card>)
        )}
      </div>
    );
  }
}