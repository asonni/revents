import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
  currentUser: {}
};

const loginUser = (state, payload) => ({
  ...state,
  authenticated: true,
  currentUser: payload.creds.email
});

const signOutUser = state => ({
  ...state,
  authenticated: false,
  currentUser: {}
});

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOutUser
});
