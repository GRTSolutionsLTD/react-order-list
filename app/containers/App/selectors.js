import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectOrders = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.orders,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectCurrentOrder = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentOrder,
  );

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectOrders,
  makeSelectLocation,
  makeSelectCurrentOrder,
};
