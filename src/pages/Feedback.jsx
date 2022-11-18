import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/feedback.scss';
import logo from '../logoTrivia.svg';

class Feedback extends Component {
  feedbackText = () => {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return <h1 className="red">COULD BE BETTER...</h1>;
    } return <h1 className="green">WELL DONE!</h1>;
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="feedback">
        <img src={ logo } alt="logo" />
        <div className="playerInformation">
          {this.feedbackText()}
          <p>{`You got ${assertions} question(s) right!`}</p>
          <p>{`A total of ${score} points.`}</p>
        </div>
        <div className="buttons">
          <button
            className="button is-primary"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            PLAY AGAIN

          </button>
          <button
            className="button is-info"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            RANKING

          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.player.assertions,
    score: state.player.score,
    gravatarEmail: state.player.gravatarEmail,
  };
}

export default connect(mapStateToProps)(Feedback);
