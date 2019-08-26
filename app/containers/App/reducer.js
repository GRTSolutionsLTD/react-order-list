import produce from 'immer';

import {
  LOAD_ORDER,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  orders: false,
  currentOrder: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORDER:
        draft.loading = true;
        draft.error = false;
        draft.orders = false;
        break;

      case LOAD_ORDER_SUCCESS:
        draft.orders = action.orders;
        draft.loading = false;
        break;

      case GET_ORDER:
        draft.loading = true;
        draft.error = false;
        draft.currentOrder = false;
        break;

      case GET_ORDER_SUCCESS:
        draft.loading = false;
        draft.currentOrder = action.order;
        break;

      case DELETE_ORDER:
      case ADD_ORDER:
      case UPDATE_ORDER:
        draft.loading = true;
        draft.error = false;
        break;

      case ADD_ORDER_SUCCESS:
      case UPDATE_ORDER_SUCCESS:
        draft.loading = false;
        draft.orders = action.orders;
        draft.currentOrder = action.order;
        break;
      case DELETE_ORDER_SUCCESS:
        draft.loading = false;
        draft.orders = action.orders;
        draft.currentOrder = false;
        break;

      case GET_ORDER_ERROR:
      case UPDATE_ORDER_ERROR:
      case DELETE_ORDER_ERROR:
      case ADD_ORDER_ERROR:
      case LOAD_ORDER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
