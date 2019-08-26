import React, { memo } from 'react';
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

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

import './index.scss';

export function OrderListPage({
  orders,
  currentOrder,
  onSelectOrder,
  // onDeleteOrder,
  // OnUpdateOrder,
  // onAddedOrder,
}) {
  useInjectSaga({ key: 'orderListPage', saga });

  function rowSelected(order) {
    const currentOrderId = currentOrder ? currentOrder.id : '';
    if (order.id === currentOrderId) return;
    onSelectOrder(order.id);
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
        <h3>Order Details:</h3>
        <div> Name: {currentOrder.name}</div>
        <div> Gender: {currentOrder.gender}</div>
        <div> Phone: {currentOrder.phone}</div>
        <div> Address: {currentOrder.address}</div>
        <div> Item Name: {currentOrder.itemName}</div>
      </div>
    );
  }

  function renderAddOrEditOrder() {
    return <div />;
  }

  return (
    <div className="order-list-page">
      <Helmet>
        <title>OrderListPage</title>
        <meta name="description" content="Description of OrderListPage" />
      </Helmet>
      <div>
        <FormattedMessage {...messages.header} />
      </div>
      {orders && <div className="order-container">{renderOrders()}</div>}
      {currentOrder && (
        <div className="order-container">{renderOrderDetails()}</div>
      )}
      {currentOrder && (
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
  OnUpdateOrder: PropTypes.func,
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
    OnUpdateOrder: order => dispatch(updateOrder(order)),
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
