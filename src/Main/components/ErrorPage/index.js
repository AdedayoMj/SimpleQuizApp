import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../modules/auth";
import { connect } from "react-redux";

import "./ErrorPage.css";

class ErrorPage extends Component {
  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
  }
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
  }

  render() {
    return (
      <div className="container center ">
        <div>
          <div className="header_cont">ERROR 404</div>
        </div>
        <div></div>
        <p className="text_l">
          ...Oops Something went wrong, the page you are looking for is not
          available
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError,
});
const mapActionCreators = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(withRouter(ErrorPage));
