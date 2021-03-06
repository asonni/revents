import { toastr } from 'react-redux-toastr';
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS
} from './eventConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import { fetchSampleDate } from '../../app/data/mockApi';

export const createEvent = event => async dispatch => {
  try {
    dispatch({
      type: CREATE_EVENT,
      payload: { event }
    });
    toastr.success('Success!', 'Event has been created');
  } catch (error) {
    toastr.error('Oops', 'Something went wrong');
  }
};

export const updateEvent = event => async dispatch => {
  try {
    dispatch({
      type: UPDATE_EVENT,
      payload: { event }
    });
    toastr.success('Success!', 'Event has been updated');
  } catch (error) {
    toastr.error('Oops', 'Something went wrong');
  }
};

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: { eventId }
});

export const fetchEvents = events => ({
  type: FETCH_EVENTS,
  payload: events
});

export const loadEvents = () => async dispatch => {
  try {
    dispatch(asyncActionStart());
    let events = await fetchSampleDate();
    dispatch(fetchEvents(events));
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
