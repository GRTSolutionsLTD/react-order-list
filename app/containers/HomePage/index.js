import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './index.scss';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}
