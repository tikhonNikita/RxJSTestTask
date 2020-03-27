import { Observable } from 'rxjs';

import IData from '../types/IData';
import { Dimensions } from '../types/Dimensions';
import TrackableEmitter from '../observable/trackableEmitter';

export const observableMock = new Observable(subscriber => {
  let temperatureTimeout: NodeJS.Timeout;

  const temperature = new TrackableEmitter();

  const dataCollector: IData = {
    temperature: '',
    pressure: '',
    humidity: ''
  };

  const nextWithTimeout = (
    next: (value: IData) => void
  ): ((value: IData) => void) => {
    return (data: IData) => {
      next(data);
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

  temperature.emit('data', '100');
});
