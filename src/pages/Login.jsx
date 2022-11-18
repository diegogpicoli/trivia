import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoMdSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { userLogin } from '../redux/actions';
import logo from '../logoTrivia.svg';
import '../styles/login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      gravatarEmail: '',
      name: '',
      token: '',
    };
  }

  fetchToken = async () => {
    const returnFetch = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await returnFetch.json();
    return data.token;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { gravatarEmail, name } = this.state;
    const retorno = await this.fetchToken();
    dispatch(userLogin({ gravatarEmail, name, assertions: 0, score: 0 }));
    this.setState({
      token: retorno,
    }, () => {
      const { token } = this.state;
      localStorage.setItem('token', token);
      history.push('/game');
    });
  };

  validateForm() {
    const { gravatarEmail, name } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minNameLength = 1;
    const isEmailValid = emailRegex.test(gravatarEmail);
    const isNameValid = name.length >= minNameLength;
    this.setState({
      isDisabled: !(isEmailValid && isNameValid),
    });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div className="login">
        <img src={ logo } alt="logo" />
        <form>
          <input
            className="input is-normal"
            placeholder="Nome"
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            className="input is-normal"
            placeholder="E-mail"
            type="email"
            name="gravatarEmail"
            id="gravatarEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            className="button is-primary"
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </form>
        <Link to="/setting">
          <IoMdSettings className="settingIcon" />
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
