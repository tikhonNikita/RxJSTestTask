import React from 'react';
import { Observable } from 'rxjs';
import { create } from 'react-test-renderer';

import { Dashboard } from '../components/Dashboard/Dashboard';
import IData from '../types/IData';

const observable = new Observable(subscriber => {
  subscriber.next({ temperature: 30, pressure: 30, humid: 30 });
  subscriber.next({ temperature: 40, pressure: 40, humid: 40 });
  subscriber.next({ temperature: 50, pressure: 50, humid: 50 });
});

describe('renders dashboard component', () => {
  test('Matches the snapshot', () => {
    observable.subscribe({
      next(data) {
        const dashboard = create(<Dashboard {...(data as IData)} />);
        expect(dashboard.toJSON()).toMatchSnapshot();
      }
    });
  });
});
