import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import OrderListPage from 'containers/OrderListPage/Loadable';
import CreateOrderPage from 'containers/CreateOrderPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import 'style.scss';

export default function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/order-list">Order List</Link>
      <Link to="/create-order">New Order</Link>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/order-list" component={OrderListPage} />
        <Route exact path="/create-order" component={CreateOrderPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
