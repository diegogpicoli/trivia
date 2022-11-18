import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/header.scss';
import { GiRoundStar } from 'react-icons/gi';
import { BsCheckLg } from 'react-icons/bs';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score, assertions } = this.props;

    return (
      <div className="header">
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <p
            name="name"
            value="name"
            data-testid="header-player-name"
          >
            {name}
          </p>
        </div>
        <div className="score">
          <GiRoundStar />
          <p
            name="currency"
            value="score"
            data-testid="header-score"
          >
            { `Score: ${score}` }
          </p>
        </div>
        <div className="assertions">
          <BsCheckLg />
          <p>
            { `Assertions: ${assertions}` }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Header);
