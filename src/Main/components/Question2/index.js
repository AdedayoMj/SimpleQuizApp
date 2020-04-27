import React, { Component } from "react";
import { QuizData2 } from "../QuizData";
import { Link } from "react-router-dom";
import "../Questions/Questions.css";

export default class Questions2 extends Component {
  state = {
    currentQuestion: 0,
    myAnswer: [],
    options: [],
    score: 0,
    diabled: true,
    isFinished: false,
    questionCount: 1,
    scorePercent: 0,
    allAnswers: []
  };

  componentDidMount() {
    this.loadQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData2[this.state.currentQuestion].question,
          options: QuizData2[this.state.currentQuestion].options,
          answer: QuizData2[this.state.currentQuestion].answer
        };
      });
    }
  }

  loadQuestions = () => {
    this.setState(() => {
      return {
        questions: QuizData2[this.state.currentQuestion].question,
        answer: QuizData2[this.state.currentQuestion].answer,
        options: QuizData2[this.state.currentQuestion].options
      };
    });
  };

  nextQuestions = () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }
    this.state.allAnswers.push(myAnswer);
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      questionCount: this.state.questionCount + 1
    });
  };

  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  finishQuiz = () => {
    const { myAnswer, answer, score } = this.state;
    this.state.allAnswers.push(myAnswer);
    if (this.state.currentQuestion === QuizData2.length - 1) {
      this.setState({
        isFinished: true
      });
    }
    if (myAnswer === answer) {
      this.setState({
        score: score + 1
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
      scorePercent: (this.state.score / 4) * 100
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
      allAnswers
    } = this.state;

    if (isFinished) {
      return (
        <div className="container">
          <div className="result">
            <h3 className="text">
              {`Test Finished !!!, your Final score is ${scorePercent}%`}{" "}
            </h3>
            <div>
              {score > 2 ? (
                <div>
                  <div className="text">
                    You have passed. Go to <Link to="/"> Home page</Link>
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
                    {QuizData2.map((item, index) => (
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
        <div className="container">
          <span className="text">{`Questions ${questionCount}  out of ${QuizData2.length} `}</span>
          <h3 className="text">{this.state.questions} </h3>

          {options.map(option => (
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
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestions}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === QuizData2.length - 1 && (
            <button className="ui inverted button" onClick={this.finishQuiz}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}
