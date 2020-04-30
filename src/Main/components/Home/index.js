import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
  state = {
    level1: "",
  };
  componentDidMount = () => {
    this.setState({
      level1: (window.localStorage.getItem("level1") / 4) * 100,
      level2: (window.localStorage.getItem("level2") / 4) * 100,
    });
  };
  handleRefresh = () => {
    localStorage.removeItem("level1");
    localStorage.removeItem("level2");
    window.location.reload(false);
  };
  render() {
    const { level1, level2 } = this.state;
    return (
      <div className="container main">
        <div className="card">
          <h4 className="text">Please read through the instructions</h4>
          <div className="text">
            You will start with difficulty level one, you must have atleast 75%
            score to proceed to the next level
          </div>
        </div>

        <div className="card card_mg">
          <div>
            <div className="tableSt">
              <tr>
                <th>Levels</th>
                <th className="head">Score</th>
                <th className="head">Completion</th>
              </tr>
            </div>
            <div className="tableSt">
              <tr>
                <td>Anatomy Terms</td>
                <td
                  className={`test ${level1 > 70 ? "test2" : "test"}`}
                >{`${level1}%`}</td>
                {level1 > 70 ? (
                  <div>
                    <td className={`test ${level1 > 70 ? "test2" : "test"}`}>
                      <div>Completed</div>
                    </td>
                  </div>
                ) : (
                  <div>
                    <td className={`test ${level1 > 70 ? "test2" : "test"}`}>
                      <div>Not Completed</div>
                    </td>
                    <td>
                      <Link classname="marg" to="/anatomy">
                        Start
                      </Link>
                    </td>
                  </div>
                )}
              </tr>
            </div>
            <div className="tableSt">
              <tr>
                <td>Disease Terms</td>
                <td
                  className={`test ${level2 > 70 ? "test2" : "test"}`}
                >{`${level2}%`}</td>
                {level2 > 70 ? (
                  <div>
                    <td className={`test ${level2 > 70 ? "test2" : "test"}`}>
                      <div>Completed</div>
                    </td>
                  </div>
                ) : (
                  <div>
                    <td className={`test ${level2 > 70 ? "test2" : "test"}`}>
                      <div>Not Completed</div>
                    </td>
                    <td>
                      {level1 > 70 ? (
                        <Link classname="marg" to="/disease">
                          Start
                        </Link>
                      ) : null}
                    </td>
                  </div>
                )}
              </tr>
            </div>
          </div>

          <div className="btn_mg ">
            <button className="startUp" onClick={() => this.handleRefresh()}>
              REFRESH
            </button>
          </div>
        </div>
      </div>
    );
  }
}
