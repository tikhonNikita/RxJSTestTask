import React from 'react';
import { create } from 'react-test-renderer';

import IData from '../types/IData';
import { Dashboard } from '../components/Dashboard/Dashboard';

describe('renders dashboard component', () => {
  test('Matches the snapshot', () => {
    const testData: IData = {
      temperature: '123',
      pressure: '3',
      humidity: '10'
    };
    const dashboard = create(<Dashboard {...testData} />);

    expect(dashboard.toJSON()).toMatchSnapshot();
  });
});
