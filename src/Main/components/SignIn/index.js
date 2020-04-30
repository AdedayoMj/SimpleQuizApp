import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../modules/auth";
import classnames from "classnames";

import "./SignIn.css"

export class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loginError: ""
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }

    if (nextProps.loginError) {
      this.setState({
        loginError: nextProps.loginError
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component,
  };
  render() {
    const { loginError, email, password } = this.state;
    return (
      <div className="container ">
      <div className="card card_container right">
 
        <form onSubmit={this.handleSubmit} >
          <h5 className="grey-text text-darken-3">LOGIN</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={email}
              error={loginError.email}
              className={classnames("", {
                invalid: loginError.email || loginError.emailnotfound
              })}
            />
            <span className="red-text">
              {loginError.email}
              {loginError.emailnotfound}
            </span>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              value={password}
              error={loginError.password}
              className={classnames("", {
                invalid: loginError.password || loginError.passwordincorrect
              })}
            />
            <span className="red-text">
              {loginError.password}
              {loginError.passwordincorrect}
            </span>
          </div>
          <div className="input-field">
            <button className="btn btn_col z-depth-0">LOGIN</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginError: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError
});
const mapActionCreators = {
  loginUser
};

export default connect(mapStateToProps, mapActionCreators)(withRouter(SignIn));
