import React, { Component } from "react";
import { QuizData2 } from "../QuizData";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../modules/auth";
import { connect } from "react-redux";
import "../Questions/Questions.css";

class Questions2 extends Component {
  state = {
    currentQuestion: 0,
    myAnswer: [],
    options: [],
    score: 0,
    diabled: true,
    isFinished: false,
    questionCount: 1,
    scorePercent: 0,
    allAnswers: [],
  };

  componentDidMount() {
    this.loadQuestions();
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isAuthenticated) {
      this.props.history.push("./signin");
    }
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData2[this.state.currentQuestion].question,
          options: QuizData2[this.state.currentQuestion].options,
          answer: QuizData2[this.state.currentQuestion].answer,
        };
      });
    }
  }

  loadQuestions = () => {
    this.setState(() => {
      return {
        questions: QuizData2[this.state.currentQuestion].question,
        answer: QuizData2[this.state.currentQuestion].answer,
        options: QuizData2[this.state.currentQuestion].options,
      };
    });
  };

  nextQuestions = () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    this.state.allAnswers.push(myAnswer);
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      questionCount: this.state.questionCount + 1,
    });
  };

  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  finishQuiz = () => {
    const { myAnswer, answer, score } = this.state;
    this.state.allAnswers.push(myAnswer);
    if (this.state.currentQuestion === QuizData2.length - 1) {
      this.setState({
        isFinished: true,
      });
    }
    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    setTimeout(() => {
      this.scoreInPercent();
      const scoreLevel = this.state.score;
      window.localStorage.setItem("level2", scoreLevel);
    }, 500);
  };
  scoreInPercent = () => {
    this.setState({
      scorePercent: (this.state.score / 4) * 100,
    });
  };

  render() {
    const {
      options,
      myAnswer,
      currentQuestion,
      questionCount,
      isFinished,
      scorePercent,
      score,
    } = this.state;

    if (isFinished) {
      return (
        <div className="container main_cont">
          <div className="result card">
          <h3 className="text center"> {`End of Quiz`} </h3>
            <h3 className="text center">{`Your score is :${scorePercent}% out of 100%`}</h3>
            <div className=" card">
              {score > 2 ? (
                <div>
                  <div className="text ">
                  <h5 className="textanswr"> You passed !!!</h5>.
                  <div>
                  <Link to='/disease'>
                    <button
                      className="bts_l"
                    >
                      Attempt Again{" "}
                    </button></Link>
                  </div>
                  <div>
                  <Link to="/">
                    <button
                      className="bts_l"
                    >
                      Back Home{" "}
                    </button></Link>
                  </div>
                  </div>
                </div>
              ) : (
                <div className="text ">
                <h5 className="textanswr"> You failed !!!</h5>.
                  <div>
                  <Link to='/disease'>
                    <button
                      className="bts_l"
                    >
                      Attempt Again{" "}
                    </button></Link>
                  </div>
                  <div>
                  <Link to="/">
                    <button
                      className="bts_l"
                    >
                      Back Home{" "}
                    </button></Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              {/* <div className="col s12 m6">
                <p>
                  <div className="text">Your Answers:</div>
                  <ul>
                    {allAnswers.map((ans, index) => (
                      <li className="ui floating message options" key={index}>
                        <div className="textanswr2">{ans}</div>
                      </li>
                    ))}
                  </ul>
                </p>
              </div> */}
              <p>
                <div className="text card">
                  The correct answer's for the questions:
                </div>

                <ul>
                  {QuizData2.map((item, index) => (
                    <li
                      className="ui floating message card options"
                      key={index}
                    >
                      <div className="textR"><strong>{item.numberQ}</strong></div>
                      <div>{item.question}</div>
                      <div className="textanswr">{`Correct Answer: ${item.answer}`}</div>
                      <div>
                        {item.info}{" "}
                        <a
                          rel="noopener noreferrer"
                          href={item.links}
                          target="_blank"
                        >
                          Read More
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container main_cont">
          <div className="card ui floating message">
            <span>{`Questions ${questionCount}  out of ${QuizData2.length} `}</span>
            <h4>{this.state.questions} </h4>
          </div>
          <div className="card ui floating message card_mg">
            {options.map((option) => (
              <p
                key={option.id}
                className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
                onClick={() => this.checkAnswer(option)}
              >
                {option}
              </p>
            ))}
            {currentQuestion < QuizData2.length - 1 && (
              <button
                className="ui inverted button NextBtn"
                disabled={this.state.disabled}
                onClick={this.nextQuestions}
              >
                Next
              </button>
            )}
            {/* //adding a finish button */}
            {currentQuestion === QuizData2.length - 1 && (
              <button
                className="ui inverted button NextBtn"
                onClick={this.finishQuiz}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      );
    }
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
)(withRouter(Questions2));
