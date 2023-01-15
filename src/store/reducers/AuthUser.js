import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loginStatus: false,
  carsArray: [],
};

export const userReducer = createReducer(initialState, {
  //This is the action that will be called when the action is dispatched

  users: (state, action) => {
    const {payload} = action;
    state.users = payload;
  },

  login_Status: (state, action) => {
    const {payload} = action;
    state.loginStatus = payload;
  },
  cars_Array: (state, action) => {
    const {payload} = action;
    state.carsArray = payload;
  },
});
