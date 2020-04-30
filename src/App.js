import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Questions from "./Main/components/Questions";
import Questions2 from "./Main/components/Question2";
import Navbar from "./Main/Navbar";
import Home from "./Main/components/Home";
import SignIn from "./Main/components/SignIn";
import SignUp from "./Main/components/SignUp";
import FooterPage from "./Main/Footer";
import About from "./Main/components/About";
import Anatomy from "./Main/components/Anatomy";
import Disease from "./Main/components/Disease";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Main/modules/auth";
import store from "./store/createStore";
import PrivateRoute from "./RouteProtected";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./signin";
  }
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/about" component={About} />
            <Route path="/anatomy" component={Anatomy} />
            <Route path="/disease" component={Disease} />
            <Route path="/level1" component={Questions} />
            <Route path="/level2" component={Questions2} />
          </Switch>
          <FooterPage />
        </div>
      </Router>
    );
  }
}
