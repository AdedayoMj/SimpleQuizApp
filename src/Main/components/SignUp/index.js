import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../modules/auth";
import classnames from "classnames";

import "./SignUp.css";

export class SignUp extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    nmae: "",
    signupError: "",
  };
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signupError) {
      this.setState({
        signupError: nextProps.signupError,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { signupError, email, password, password2 } = this.state;

    return (
      <div className="signup">
        <div className="container ">
          <div className="card card_container right">
            <form
              onSubmit={this.handleSubmit}
              className="white"
              encType="multipart/form-data"
            >
              <h5 className="grey-text text-darken-3">Sign Up</h5>
              <div className="row">
                <div className="input-field col s12 m6 input_length">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s15 m7 input_length">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    onChange={this.handleChange}
                    value={email}
                    error={signupError.email}
                    className={classnames("", {
                      invalid: signupError.email,
                    })}
                  />
                  <span className="red-text">{signupError.email}</span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 input_length">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                    value={password}
                    error={signupError.password}
                    className={classnames("", {
                      invalid: signupError.password,
                    })}
                  />
                  <span className="red-text">{signupError.password}</span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 input_length">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    onChange={this.handleChange}
                    value={password2}
                    error={signupError.password2}
                    className={classnames("", {
                      invalid: signupError.password2,
                    })}
                  />
                  <span className="red-text">{signupError.password2}</span>
                </div>
              </div>

              <div className="input-field">
                <button className="btn btn_col z-depth-0">SIGN UP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signupError: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  signupError: state.auth.signupError,
});
const mapActionCreators = {
  registerUser,
};

export default connect(mapStateToProps, mapActionCreators)(withRouter(SignUp));
