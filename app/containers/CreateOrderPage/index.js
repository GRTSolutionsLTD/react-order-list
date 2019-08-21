/**
 *
 * CreateOrderPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCreateOrderPage from './selectors';
import reducer from './reducer';

export function CreateOrderPage() {
  useInjectReducer({ key: 'createOrderPage', reducer });

  return (
    <div>
      <Helmet>
        <title>CreateOrderPage</title>
        <meta name="description" content="Description of CreateOrderPage" />
      </Helmet>
      This is Create Order page
    </div>
  );
}

// CreateOrderPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  createOrderPage: makeSelectCreateOrderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateOrderPage);
