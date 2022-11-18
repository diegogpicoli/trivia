import { combineReducers } from 'redux';
import player from './player';
import settingGame from './setting';

const rootReducer = combineReducers({ player, settingGame });

export default rootReducer;
