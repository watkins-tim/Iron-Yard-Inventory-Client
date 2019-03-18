import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <main>
            <Route exact path="/" component={Home}/>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
