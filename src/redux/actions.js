import { ADD_TICKETS, SET_VIEW_FILTER, SET_STOPS_FILTER, SET_DATA_STATE } from './actionTypes';
import { DATA_STATES, API_DELAY_MS } from '../constants';

const ApiCallDelay = (ms) => new Promise(res => setTimeout(res, ms));

export const getTickets = () => {
  return async (dispatch) => {
    dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADING });
    const {searchId} = await fetch('https://front-test.beta.aviasales.ru/search').then(res => res.json());
    const URL = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`;
    const ticketsAccum = [];
    const fetchloop = async (url) => {
      try {
        const {tickets, stop} = await fetch(url).then(res => res.json());
        ticketsAccum.push(...tickets);
        if (!stop) {
          await ApiCallDelay(API_DELAY_MS);
          await fetchloop(url)
        } else {
          return true;
        }
      } catch (err) {
        await ApiCallDelay(API_DELAY_MS);
        await fetchloop(url);
      }
    };
    await fetchloop(URL);
    dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADED });
    dispatch({ type: ADD_TICKETS, payload: ticketsAccum });
  }
};

export const setStopsFilter = (filter) => ({ type: SET_STOPS_FILTER, payload: filter });
export const setViewFilter = (filter) => ({ type: SET_VIEW_FILTER, payload: filter });