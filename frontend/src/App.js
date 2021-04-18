import logo from './logo.svg';
import './App.css';
import history from './history';

import rpcInstance from './Rpc';

import React, {Component, Suspense, Fragment} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Create from './Create';
import Main from './Main';
import Loading from './Loading';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: null
        }
        rpcInstance.setPlayer = this.setPlayer;
    }

    setPlayer = (master) => {
        this.setState({player : master})
    }

    render() {
        if(this.state.player === undefined) history.push("/create");
        if(this.state.player === null) return (<Loading></Loading>);
        
        console.log(this.state.player);
        return(
            <Router>
                <Switch>
                    <Route path = "/create"><Create setPlayer = {this.setPlayer}></Create></Route>
                    <Route exact path = "/"><Main master = {this.state.player} setPlayer = {this.setPlayer}></Main></Route>
                </Switch>
            </Router>
        );
    }
};
