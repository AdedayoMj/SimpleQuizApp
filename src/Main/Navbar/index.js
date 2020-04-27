import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="nav-wrapper black ">
          <div className="container row">
            <Link to="/" className="brand-logo col s1 m15">
              <span className="logo">QUIZ</span>
            </Link>
            <ul className="right">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
