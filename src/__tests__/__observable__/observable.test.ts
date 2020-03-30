import { Observable } from 'rxjs';

import configurableSubscriber from '../../observable/observable';
import TrackableEmitter from '../../observable/trackableEmitter';
import IData from '../../types/IData';

test('the observable emits values', done => {
  const obs = new Observable(configurableSubscriber({}));

  obs.subscribe(dimensionsData => {
    expect(dimensionsData).toBeTruthy();
    done();
  });
});

test('events are not emitted more ofthen than once in 100ms', done => {
  const obs = new Observable(configurableSubscriber({}));

  let emitsCounter = 0;

  let t0: number;

  obs.subscribe(dimensionsData => {
    t0 = performance.now();

    if (emitsCounter === 1) {
      const t1 = performance.now();

      expect(t1 - t0).toBeLessThan(100);
      done();
    }
    emitsCounter++;
  });
});

test('first event emitted only when all emitters were emitted', done => {
  const temperature = new TrackableEmitter();
  const pressure = new TrackableEmitter();
  const humidity = new TrackableEmitter();

  const obs = new Observable(
    configurableSubscriber({
      tempTimeout: 100,
      presTimeout: 100,
      humidTimeout: 100,
      temperature,
      pressure,
      humidity
    })
  );

  obs.subscribe(dimensionsData => {
    expect(
      temperature.firstEventEmitted &&
        pressure.firstEventEmitted &&
        humidity.firstEventEmitted
    ).toBeTruthy();
    done();
  });
});

test('if values were not received within 1000ms return N/A', done => {
  const obs = new Observable(
    configurableSubscriber({
      tempTimeout: 2000
    })
  );

  let data: IData;

  obs.subscribe(dimensionsData => {
    data = dimensionsData as IData;
    if (data.temperature === 'N/A') {
      done();
    }
  });
});
