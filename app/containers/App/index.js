import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import OrderListPage from 'containers/OrderListPage/Loadable';
import CreateOrderPage from 'containers/CreateOrderPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import {
  makeSelectOrders,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { loadOrders } from './actions';

import 'style.scss';

export function App({ orders, loading, error, onLoadOrders }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    if (!orders) onLoadOrders();
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/order-list">Order List</Link>
      <Link to="/create-order">New Order</Link>
      {loading && <div className="loading">loading...</div>}
      {error && <div className="error">error occured</div>}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/order-list" component={OrderListPage} />
        <Route exact path="/create-order" component={CreateOrderPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadOrders: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadOrders: () => dispatch(loadOrders()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
