import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SignedInLinks from "../components/SignedInLinks";
import SignedOutLinks from "../components/SignedOutLinks";
import { logoutUser, loginUser } from "../modules/auth";

import Sidebar from "react-sidebar";

import logo from "../../assets/jsc_logo.png";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount() {
    this.props.loginUser();
  }

  render() {
    const links = !this.props.isAuthenticated ? (
      <SignedOutLinks />
    ) : (
      <SignedInLinks
        SignOut={() => this.props.logoutUser()}
        user={this.props.user}
      />
    );
    return (
      <div>
        <Sidebar
          sidebar={<div className="side_cont">{links}</div>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", width: "100px" } }}
        ></Sidebar>
        <nav className="nav-extended">
          <div className="nav-wrapper white nav_cont ">
            <div className="container row ">
              <Link to="/" className="brand-logo col s1 m15">
                <img className="logo_container" alt="logo" src={logo}></img>
              </Link>
              <div className=" hide-on-med-and-down">{links}</div>
            </div>
            <div className="container">
              <div className="hide-on-med-and-up right">
                <button
                  className="iconMat "
                  onClick={() => this.onSetSidebarOpen(true)}
                >
                  <i className="large material-icons">apps</i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError,
  user: state.auth.user,
});
const mapActionCreators = {
  logoutUser,
  loginUser,
};

export default connect(mapStateToProps, mapActionCreators)(withRouter(Navbar));
