import React, { Component } from "react";
import { QuizData } from "../QuizData";
import { Link } from "react-router-dom";

import "./Questions.css";

export default class Questions extends Component {
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData[this.state.currentQuestion].question,
          options: QuizData[this.state.currentQuestion].options,
          answer: QuizData[this.state.currentQuestion].answer,
        };
      });
    }
  }

  loadQuestions = () => {
    this.setState(() => {
      return {
        questions: QuizData[this.state.currentQuestion].question,
        answer: QuizData[this.state.currentQuestion].answer,
        options: QuizData[this.state.currentQuestion].options,
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
  scoreInPercent = () => {
    this.setState({
      scorePercent: (this.state.score / 4) * 100,
    });
  };
  finishQuiz = () => {
    const { myAnswer, answer, score } = this.state;
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.state.allAnswers.push(myAnswer);
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
      window.localStorage.setItem("level1", scoreLevel);
    }, 500);
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
      allAnswers,
    } = this.state;

    if (isFinished) {
      return (
        <div className="container main_cont">
          <div className="result">
            <h3 className="text">
              {" "}
              {`Test Finished !!!, your Final score is ${scorePercent}%`}{" "}
            </h3>
            <div className="card">
              {score > 2 ? (
                <div className="text">
                  You have passed !!!. Start{" "}
                  <Link to="/level2"> Next Level</Link>
                  <div>
                    <Link to="/">Continue Later</Link>
                  </div>
                </div>
              ) : (
                <div className="text">
                  {`You have failed, your score is ${scorePercent}%`}. Please{" "}
                  <Link to="/">try again</Link>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col s12 m6">
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
              </div>

              <div className="col s12 m6">
                <p>
                  <div className="text">
                    The correct answer's for the questions:
                  </div>

                  <ul>
                    {QuizData.map((item, index) => (
                      <li className="ui floating message options" key={index}>
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
        </div>
      );
    } else {
      return (
        <div className="container main_cont">
          <div className="card ui floating message ">
            <span>{`Questions ${questionCount}  out of ${QuizData.length} `}</span>
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
            {currentQuestion < QuizData.length - 1 && (
              <button
                className="ui inverted button NextBtn"
                disabled={this.state.disabled}
                onClick={this.nextQuestions}
              >
                Next
              </button>
            )}
            {/* //adding a finish button */}
            {currentQuestion === QuizData.length - 1 && (
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
