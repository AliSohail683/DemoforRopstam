import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './AuthUser';

export default combineReducers({
  userReducer,
});
