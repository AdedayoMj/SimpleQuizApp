import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export default class Home extends Component {
  state = {
    level1: ""
  };
  componentDidMount = () => {
    this.setState({
      level1: (window.localStorage.getItem("level1") / 4) * 100,
      level2: (window.localStorage.getItem("level2") / 4) * 100
    });
  };
  handleRefresh = () => {
    window.localStorage.clear();
    window.location.reload(false);
  };
  render() {
    const { level1, level2 } = this.state;
    return (
      <div className="container">
        <h3 className="text">Please read through the instructions</h3>
        <div className="text">
          You will start with difficulty level one, you must have atleast 75%
          score to proceed to the next level
        </div>
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
              <td>Level1</td>
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
                    <Link classname="marg" to="/level1">
                      Start
                    </Link>
                  </td>
                </div>
              )}
            </tr>
          </div>
          <div className="tableSt">
            <tr>
              <td>Level2</td>
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
                    <Link classname="marg" to="/level2">
                      Start
                    </Link>
                  </td>
                </div>
              )}
            </tr>
          </div>
        </div>
        <div className="startUp">
          <button onClick={() => this.handleRefresh()} className="blue">
            Refresh
          </button>
        </div>
      </div>
    );
  }
}
