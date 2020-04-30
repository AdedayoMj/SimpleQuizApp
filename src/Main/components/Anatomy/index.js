import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Anatomy.css";

class Anatomy extends Component {
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
export default withRouter(Anatomy);
