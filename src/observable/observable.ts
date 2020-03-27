import { Observable } from 'rxjs';

import TrackableEmitter from './trackableEmitter';
import IData from '../types/IData';
import { Dimensions } from '../types/Dimensions';

export const observable = new Observable(subscriber => {
  let temperatureTimeout: NodeJS.Timeout;
  let pressureTimeout: NodeJS.Timeout;
  let humidityTimeout: NodeJS.Timeout;
  let globalTimeout = false;

  const temperature = new TrackableEmitter();
  const pressure = new TrackableEmitter();
  const humidity = new TrackableEmitter();

  const dataCollector: IData = {
    temperature: '',
    pressure: '',
    humidity: ''
  };

  const allEventsEmitted = () => {
    return [
      temperature.firstEventEmitted,
      pressure.firstEventEmitted,
      humidity.firstEventEmitted
    ].every(emitted => emitted);
  };

  const getRandomValue = (from: number, to: number) => {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  const nextWithTimeout = (
    next: (value: IData) => void
  ): ((value: IData) => void) => {
    return (data: IData) => {
      if (globalTimeout) {
        return;
      }
      if (!allEventsEmitted()) {
        next(data);
        return;
      }
      next(data);
      globalTimeout = true;
      setTimeout(() => (globalTimeout = false), Math.random() + 100);
    };
  };

  temperature.addListener(
    'data',
    temperature.dataHandler(
      nextWithTimeout(subscriber.next.bind(subscriber)),
      dataCollector,
      Dimensions.temperature,
      temperatureTimeout!
    )
  );
  pressure.addListener(
    'data',
    pressure.dataHandler(
      nextWithTimeout(subscriber.next.bind(subscriber)),
      dataCollector,
      Dimensions.pressure,
      pressureTimeout!
    )
  );

  humidity.addListener(
    'data',
    humidity.dataHandler(
      nextWithTimeout(subscriber.next.bind(subscriber)),
      dataCollector,
      Dimensions.humidity,
      humidityTimeout!
    )
  );

  setInterval(() => {
    temperature.emit('data', getRandomValue(1, 100));
    clearTimeout(temperatureTimeout);
  }, Math.random() * 1900 + 100);

  setInterval(() => {
    pressure.emit('data', getRandomValue(1, 100));
    clearTimeout(pressureTimeout);
  }, Math.random() * 1900 + 100);

  setInterval(() => {
    humidity.emit('data', getRandomValue(1, 100));
    clearTimeout(humidityTimeout);
  }, Math.random() * 1900 + 100);
});
