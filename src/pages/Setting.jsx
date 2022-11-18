import React, { Component } from 'react';
import '../styles/setting.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logoTrivia.svg';
import { setting } from '../redux/actions';

class Setting extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value });
  };

  handleClick = () => {
    const { category, difficulty, type } = this.state;
    const { history, dispatch } = this.props;
    const settingObj = { category, difficulty, type };
    dispatch(setting(settingObj));
    history.push('/');
  };

  render() {
    return (
      <div className="setting">
        <img src={ logo } alt="logo" className="logo" />
        <div className="box">
          <h1>SETTING</h1>
          <div className="select">
            <select name="category" id="" onChange={ this.handleChange }>
              <option value="">Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science and Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="29">Entertainment: Comics</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime and Manga</option>
              <option value="32">Entertainment: Cartoon and Animations </option>
            </select>
          </div>
          <div className="select">
            <select name="difficulty" id="" onChange={ this.handleChange }>
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="select">
            <select name="type" id="" onChange={ this.handleChange }>
              <option value="">Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/ False</option>
            </select>
          </div>

          <button
            onClick={ this.handleClick }
            className="button is-primary"
            type="button"
          >
            PLAY
          </button>
        </div>
      </div>
    );
  }
}

Setting.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Setting);
