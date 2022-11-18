import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsFillCheckCircleFill,
  BsFillXCircleFill } from 'react-icons/bs';
import { IoIosTimer } from 'react-icons/io';
import { addScore } from '../redux/actions';
import shuffle from '../services/shuffle';

class MultipleQuestion extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      category: '',
      difficulty: '',
      correctAnswer: '',
      incorrectAnswers: [],
      questionText: '',
      suffledAnswers: [],
      time: 30,
    };
    this.toggleClicked = this.toggleClicked.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    const { category,
      difficulty } = question;
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const questionText = question.question;
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const suffledAnswers = shuffle(allAnswers);
    this.setState({
      category,
      difficulty,
      correctAnswer,
      incorrectAnswers,
      questionText,
      suffledAnswers,
    });
    if (difficulty === 'hard') {
      this.setState({ multiple: 3 });
    } else if (difficulty === 'medium') {
      this.setState({ multiple: 2 });
    } else {
      this.setState({ multiple: 1 });
    }
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { time } = this.state;
      this.setState({ time: time - 1 });
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { onAnswer } = this.props;
    const { intervalId } = this;
    if (time === 0) {
      onAnswer();
      this.setState({
        isClicked: true,
        time: '0' }, () => {
        clearInterval(intervalId);
      });
    }
  }

  toggleClicked = (event) => {
    const { onAnswer, dispatch } = this.props;
    onAnswer();
    this.setState({
      isClicked: true }, () => {
      clearInterval(this.intervalId);
      const { id } = event.target;
      if (id === 'correct-answer') {
        const { time, multiple } = this.state;
        const { gravatarEmail, name, assertions, score } = this.props;
        const MULTIPLIER = 10;
        const newScore = Number(score)
        + Number(MULTIPLIER)
        + Number(Number(time) * Number(multiple));
        const dispatchObj = {
          gravatarEmail,
          name,
          score: newScore,
          assertions: assertions + 1,
        };
        dispatch(addScore(dispatchObj));
      }
    });
  };

  render() {
    const { category,
      difficulty,
      questionText,
      suffledAnswers,
      correctAnswer,
      incorrectAnswers,
      isClicked,
      time } = this.state;
    const { onClick, display } = this.props;
    return (
      <div className="game">
        <div className="question">
          <div className="box">
            <h1
              className="category"
              data-testid="question-category"
            >
              {category.toUpperCase()}

            </h1>
            <span />
            <h2 data-testid="question-text">
              {`${questionText
                .replaceAll('&quot;', '\'\'').replaceAll('&#039;', '\'')} 
                (${difficulty})`}
            </h2>
            <p className="clock">
              <IoIosTimer />
              { `Time: ${time}s` }
            </p>
          </div>
        </div>
        <div className="answer-options" data-testid="answer-options">
          {suffledAnswers.map((answer, index) => {
            if (answer === correctAnswer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  className="button is-rounded"
                  id={ isClicked ? 'correct-answer' : null }
                  key={ index }
                  onClick={ this.toggleClicked }
                  disabled={ isClicked }
                >
                  {isClicked && <BsFillCheckCircleFill className="correct" />}
                  {answer.replaceAll('&quot;', '\'\'').replaceAll('&#039;', '\'')}
                </button>
              );
            }
            const i = incorrectAnswers.indexOf(answer);
            return (
              <button
                type="button"
                data-testid={ `wrong-answer-${i}` }
                className="button is-rounded"
                id={ isClicked ? 'wrong-answer' : null }
                key={ index }
                onClick={ this.toggleClicked }
                disabled={ isClicked }
              >
                {isClicked && <BsFillXCircleFill className="wrong" />}
                {answer.replaceAll('&quot;', '\'\'').replaceAll('&#039;', '\'')}
              </button>
            );
          })}
          {display ? (
            <button
              className="next button is-primary"
              type="button"
              onClick={ onClick }
              data-testid="btn-next"
            >
              Next
            </button>)
            : null}
        </div>
      </div>
    );
  }
}

MultipleQuestion.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(MultipleQuestion);
