import React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

test('renders app component', () => {
  const app = create(<App />);

  expect(app.toJSON()).toMatchSnapshot();
});
