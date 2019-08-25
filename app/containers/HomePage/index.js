import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectOrders } from 'containers/App/selectors';

import messages from './messages';

import './index.scss';

export function HomePage({ orders }) {
  function renderOrders() {
    return orders.map(order => (
      <div>
        {order.id} {order.name}
      </div>
    ));
  }

  return (
    <div className="home-page">
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      {renderOrders()};
    </div>
  );
}

HomePage.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrders(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HomePage);
