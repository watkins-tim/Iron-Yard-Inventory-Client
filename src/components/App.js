import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Home from './home';
import Inventory from './inventory';

import './stylesheets/App.css'

class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/inventory" component={Inventory}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default (App);
