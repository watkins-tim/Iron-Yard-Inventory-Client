import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/inventory" cpmponent={Inventory}/>
            <Route exact path="/new-ite" component={NewItem} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
