import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectOrders,
  makeSelectCurrentOrder,
} from 'containers/App/selectors';

import {
  getOrder,
  updateOrder,
  deleteOrder,
  addOrder,
} from 'containers/App/actions';

import messages from './messages';

import './index.scss';

const AddOrderType = 'Add';
const EditOrderType = 'Edit';

export function OrderListPage({
  orders,
  currentOrder,
  onSelectOrder,
  onDeleteOrder,
  onUpdateOrder,
  onAddedOrder,
}) {
  const [addOrEditOrder, setAddOrEditOrder] = useState(false);
  const [addOrEditOrderType, setAddOrEditOrderType] = useState(AddOrderType);

  function rowSelected(order) {
    const currentOrderId = currentOrder ? currentOrder.id : '';
    if (order.id === currentOrderId) return;
    onSelectOrder(order.id);
    if (addOrEditOrderType === EditOrderType) setAddOrEditOrder(false);
  }

  function renderOrders() {
    const currentOrderId = currentOrder ? currentOrder.id : '';
    return orders.map(order => (
      <div
        key={order.id}
        className={order.id === currentOrderId ? 'selected' : ''}
        onClick={() => {
          rowSelected(order);
        }}
      >
        {order.id} {order.name}
      </div>
    ));
  }

  function renderOrderDetails() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            onDeleteOrder(currentOrder.id);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => {
            setAddOrEditOrder({ ...currentOrder });
            setAddOrEditOrderType(EditOrderType);
          }}
        >
          Edit
        </button>
        <h3>Order Details:</h3>
        <div> Name: {currentOrder.name}</div>
        <div> Gender: {currentOrder.gender}</div>
        <div> Phone: {currentOrder.phone}</div>
        <div> Address: {currentOrder.address}</div>
        <div> Item Name: {currentOrder.itemName}</div>
      </div>
    );
  }

  function handleAddOrEditChange(propertyName, event) {
    const order = { ...addOrEditOrder };
    order[propertyName] = event.target.value;
    setAddOrEditOrder(order);
  }

  function renderAddOrEditOrder() {
    return (
      <div>
        <h3>{addOrEditOrderType} order:</h3>
        <div>
          Name:
          <input
            value={addOrEditOrder.name}
            onChange={handleAddOrEditChange.bind(this, 'name')}
          />
        </div>
        <div>
          Gender:
          <select
            value={addOrEditOrder.gender}
            onChange={handleAddOrEditChange.bind(this, 'gender')}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          Phone:
          <input
            value={addOrEditOrder.phone}
            onChange={handleAddOrEditChange.bind(this, 'phone')}
          />
        </div>
        <div>
          Address:
          <input
            value={addOrEditOrder.address}
            onChange={handleAddOrEditChange.bind(this, 'address')}
          />
        </div>
        <div>
          Item Name:
          <input
            value={addOrEditOrder.itemName}
            onChange={handleAddOrEditChange.bind(this, 'itemName')}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (addOrEditOrderType === AddOrderType) {
              onAddedOrder(addOrEditOrder);
              setAddOrEditOrder({
                name: '',
                address: '',
                gender: 'female',
                phone: '',
                itemName: '',
              });
            } else {
              onUpdateOrder(addOrEditOrder);
            }
          }}
        >
          {addOrEditOrderType}
        </button>
      </div>
    );
  }

  return (
    <div className="order-list-page">
      <Helmet>
        <title>OrderListPage</title>
        <meta name="description" content="Description of OrderListPage" />
      </Helmet>
      <div>
        <FormattedMessage {...messages.header} />
        <button
          type="button"
          onClick={() => {
            setAddOrEditOrder({
              name: '',
              address: '',
              gender: 'female',
              phone: '',
              itemName: '',
            });
            setAddOrEditOrderType(AddOrderType);
          }}
        >
          Add New Order
        </button>
      </div>

      {orders && <div className="order-container">{renderOrders()}</div>}
      {currentOrder && (
        <div className="order-container">{renderOrderDetails()}</div>
      )}
      {addOrEditOrder && (
        <div className="order-container">{renderAddOrEditOrder()}</div>
      )}
    </div>
  );
}

OrderListPage.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  currentOrder: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSelectOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
  onAddedOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
  currentOrder: makeSelectCurrentOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectOrder: orderId => dispatch(getOrder(orderId)),
    onDeleteOrder: orderId => dispatch(deleteOrder(orderId)),
    onUpdateOrder: order => dispatch(updateOrder(order)),
    onAddedOrder: order => dispatch(addOrder(order)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrderListPage);
