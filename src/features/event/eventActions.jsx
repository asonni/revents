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

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: { event }
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: { event }
});

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: { eventId }
});

export const fetchEvents = events => ({
  type: FETCH_EVENTS,
  payload: events
});

export const loadEvents = () => {
  return async dispatch => {
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
};
