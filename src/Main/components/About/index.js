import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../modules/auth";
import { connect } from "react-redux";

import "./About.css";

class About extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
  }
  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
  }
  render() {
    return (
      <div className="container main">
        <div className="card m_card">
          <h5>ABOUT</h5>
          <p>
            This app is designed to a brief assessment used in education and
            similar fields to measure growth in knowledge, abilities, and/or
            skills. The mission is to get users to study related textbooks in
            order to answer the questions provided. At the end of the
            assessments students will have devloped extensive knowledge in their
            respective fields.{" "}
          </p>

          <p>
            The target users are medical students. There are several benefits of
            this app, like Engaging audience, large number of participants,
            randomizing questions, gain insight in audience, no instructor
            needed.{" "}
          </p>
        </div>
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

export default connect(mapStateToProps, mapActionCreators)(withRouter(About));