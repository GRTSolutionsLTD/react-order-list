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

export function getOrderSuccess(order) {
  return {
    type: GET_ORDER_SUCCESS,
    order,
  };
}

export function getOrderError(error) {
  return {
    type: GET_ORDER_ERROR,
    error,
  };
}

// UPDATE ORDER
export function updateOrder(order) {
  return {
    type: UPDATE_ORDER,
    order,
  };
}

export function updateOrderSuccess(order, orders) {
  return {
    type: UPDATE_ORDER_SUCCESS,
    order,
    orders,
  };
}

export function updateOrderError(error) {
  return {
    type: UPDATE_ORDER_ERROR,
    error,
  };
}

// DELETE ORDER
export function deleteOrder(orderId) {
  return {
    type: DELETE_ORDER,
    orderId,
  };
}

export function deleteOrderSuccess(orders) {
  return {
    type: DELETE_ORDER_SUCCESS,
    orders,
  };
}

export function deleteOrderError(error) {
  return {
    type: DELETE_ORDER_ERROR,
    error,
  };
}

// ADD ORDER
export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order,
  };
}

export function addOrderSuccess(order, orders) {
  return {
    type: ADD_ORDER_SUCCESS,
    order,
    orders,
  };
}

export function addOrderError(error) {
  return {
    type: ADD_ORDER_ERROR,
    error,
  };
}
