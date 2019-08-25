import {
  LOAD_ORDER,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_ERROR,
  GET_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  ADD_ORDER,
} from './constants';

// GET ORDER LIST
/**
 * Load the orders, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ORDER
 */
export function loadOrders() {
  return {
    type: LOAD_ORDER,
  };
}

/**
 * Dispatched when the orders are loaded by the request saga
 *
 * @param  {array} orders The ordersitory data
 *
 * @return {object}      An action object with a type of LOAD_ORDER_SUCCESS passing the orders
 */
export function ordersLoaded(orders) {
  return {
    type: LOAD_ORDER_SUCCESS,
    orders,
  };
}

/**
 * Dispatched when loading the orders fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ORDER_ERROR passing the error
 */
export function orderLoadingError(error) {
  return {
    type: LOAD_ORDER_ERROR,
    error,
  };
}

// GET SPECIFIC ORDER
export function getOrder(orderId) {
  return {
    type: GET_ORDER,
    orderId,
  };
}

// UPDATE ORDER
export function updateOrder(order) {
  return {
    type: UPDATE_ORDER,
    order,
  };
}

// DELETE ORDER
export function deleteOrder(orderId) {
  return {
    type: DELETE_ORDER,
    orderId,
  };
}

// ADD ORDER
export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order,
  };
}
