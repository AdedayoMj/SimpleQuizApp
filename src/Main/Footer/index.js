import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { loginUser } from "../modules/auth";

import "./Footer.css";

class FooterPage extends Component {
  componentDidMount() {
    this.props.loginUser();
  }
  render() {
    if (!this.props.isAuthenticated) {
      return null;
    } else {
      return (
        <footer className="page-footer pg">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">About</h5>
                <p className="grey-text text-lighten-4">
                  This app is designed to a brief assessment used in education
                  and similar fields to measure growth in knowledge, abilities,
                  and/or skills. The mission is to get users to study related
                  textbooks in order to answer the questions provided. At the
                  end of the assessments students will have devloped extensive
                  knowledge in their respective fields.{" "}
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li>
                    <Link to="/">
                      <a className="grey-text text-lighten-3" href="#!">
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <a className="grey-text text-lighten-3" href="#!">
                        About
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a className="grey-text text-lighten-3" href="#!">
                        License
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a className="grey-text text-lighten-3" href="#!">
                        Terms and Conditons
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">© 2020 Copyright Adedayo Adegboye</div>
          </div>
        </footer>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapActionCreators = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(withRouter(FooterPage));
