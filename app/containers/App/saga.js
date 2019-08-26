import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import request from 'utils/request';

import {
  LOAD_ORDER,
  GET_ORDER,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from './constants';

import {
  ordersLoaded,
  orderLoadingError,
  getOrderSuccess,
  getOrderError,
  addOrderSuccess,
  addOrderError,
  updateOrderError,
  updateOrderSuccess,
  deleteOrderError,
  deleteOrderSuccess,
} from './actions';

const baseUrl = '/api';

export function* getList() {
  const requestURL = `${baseUrl}/list`;

  try {
    const list = yield call(request, requestURL);
    yield put(ordersLoaded(list));
  } catch (err) {
    yield put(orderLoadingError(err));
  }
}

export function* get(action) {
  const requestURL = `${baseUrl}/get/${action.orderId}`;

  try {
    const order = yield call(request, requestURL);
    yield put(getOrderSuccess(order));
  } catch (err) {
    yield put(getOrderError(err));
  }
}

export function* update(action) {
  const requestURL = `${baseUrl}/update`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.order),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(updateOrderSuccess(action.order, list));
  } catch (err) {
    yield put(updateOrderError(err));
  }
}

export function* add(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.order),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(addOrderSuccess(action.order, list));
  } catch (err) {
    yield put(addOrderError(err));
  }
}

export function* remove(action) {
  const requestURL = `${baseUrl}/delete/${action.orderId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(deleteOrderSuccess(list));
  } catch (err) {
    yield put(deleteOrderError(err));
  }
}

export default function* loadData() {
  yield takeLatest(LOAD_ORDER, getList);
  yield takeEvery(GET_ORDER, get);
  yield takeEvery(UPDATE_ORDER, update);
  yield takeEvery(DELETE_ORDER, remove);
  yield takeEvery(ADD_ORDER, add);
}
