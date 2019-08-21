/**
 *
 * OrderListPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

export function OrderListPage() {
  useInjectSaga({ key: 'orderListPage', saga });

  return (
    <div>
      <Helmet>
        <title>OrderListPage</title>
        <meta name="description" content="Description of OrderListPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

OrderListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrderListPage);
