import { createReducer } from '../../app/common/util/reducerUtil';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from './testConstants';

const initialState = {
  data: 50,
  loading: false
};

const incrementCounter = (state, payload) => ({
  ...state,
  data: state.data + 1
});

const decrementCounter = (state, payload) => ({
  ...state,
  data: state.data - 1
});

const counterActionStarted = (state, payload) => {
  return { ...state, loading: true };
};

const counterActionFinished = (state, payload) => {
  return { ...state, loading: false };
};

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
  [COUNTER_ACTION_STARTED]: counterActionStarted,
  [COUNTER_ACTION_FINISHED]: counterActionFinished
});
