import { SETTING } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

function settingGame(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SETTING:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default settingGame;
