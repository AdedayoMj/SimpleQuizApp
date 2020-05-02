import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../modules/auth";
import { connect } from "react-redux";
import "./Anatomy.css";

class Anatomy extends Component {
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
    const { history } = this.props;
    return (
      <div className="container card_marg">
        <div className="card card_cont">
          <div className="card-content">
            <div className="card card_cont2 ">
              <div className="ana1 center">Anatomy Terms</div>

              <div className="ana2 center">
                Click the "Start Quiz" button to begin
              </div>
              <div className="center">
                {" "}
                Donot push back button during test as it will automatically
                reset your test
              </div>
            </div>
            <button
              onClick={() => {
                history.push("/level1");
              }}
              className="Btn_s right"
            >
              START QUIZ{" "}
            </button>
          </div>
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

export default connect(mapStateToProps, mapActionCreators)(withRouter(Anatomy));
