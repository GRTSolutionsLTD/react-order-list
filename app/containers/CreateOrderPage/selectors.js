import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createOrderPage state domain
 */

const selectCreateOrderPageDomain = state =>
  state.createOrderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateOrderPage
 */

const makeSelectCreateOrderPage = () =>
  createSelector(
    selectCreateOrderPageDomain,
    substate => substate,
  );

export default makeSelectCreateOrderPage;
export { selectCreateOrderPageDomain };
