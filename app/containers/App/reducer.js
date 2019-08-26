import produce from 'immer';

import * as data from 'data/order-data.json';

import {
  LOAD_ORDER,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_ERROR,
  GET_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  ADD_ORDER,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  orders: data.default,
  currentOrder: false,
};
// mock functions
function getOrder(orderList, orderId) {
  const currentOrder = orderList.find(order => order.id === orderId);
  return currentOrder;
}

function updateOrder(orderList, updatedOrder) {
  const newOrderList = [...orderList];
  const currentOrderIndex = newOrderList.findIndex(
    order => order.id === updatedOrder.id,
  );
  newOrderList[currentOrderIndex] = updatedOrder;
  return newOrderList;
}

function deleteOrder(orderList, orderId) {
  const newOrderList = [...orderList];
  const currentOrderIndex = orderList.findIndex(order => order.id === orderId);
  newOrderList.splice(currentOrderIndex, 1);
  return newOrderList;
}

function addOrder(orderList, addedOrder) {
  let lastId = 0;
  if (orderList.length > 0) lastId = orderList[orderList.length - 1].id;
  const order = { id: lastId + 1, ...addedOrder };
  const newOrderList = [...orderList];
  newOrderList.push(order);
  return newOrderList;
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORDER:
        draft.loading = true;
        draft.error = false;
        draft.userData.orders = false;
        break;

      case LOAD_ORDER_SUCCESS:
        draft.userData.orders = action.data;
        draft.loading = false;
        break;

      case LOAD_ORDER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_ORDER:
        draft.currentOrder = getOrder(state.orders, action.orderId);
        break;

      case UPDATE_ORDER:
        draft.orders = updateOrder(state.orders, action.order);
        draft.currentOrder = action.order;
        break;

      case DELETE_ORDER:
        draft.orders = deleteOrder(state.orders, action.orderId);
        draft.currentOrder = false;
        break;

      case ADD_ORDER:
        draft.orders = addOrder(state.orders, action.order);
        draft.currentOrder = action.order;
        break;
    }
  });

export default appReducer;
