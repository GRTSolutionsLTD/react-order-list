import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { LOAD_ORDER } from './constants';
import { ordersLoaded, orderLoadingError } from './actions';

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadData() {
  yield takeLatest(LOAD_ORDER, getList);
}
