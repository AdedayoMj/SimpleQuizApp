import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Questions from "./Main/components/Questions";
import Questions2 from "./Main/components/Question2";
import Navbar from "./Main/Navbar";
import Home from "./Main/components/Home";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/level1" component={Questions} />
            <Route path="/level2" component={Questions2} />
          </Switch>
        </div>
      </Router>
    );
  }
}
