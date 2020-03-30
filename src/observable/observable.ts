import TrackableEmitter from './trackableEmitter';
import IData from '../types/IData';
import { configurableParams } from '../types/ConfigurableParams';
import { Dimensions } from '../types/Dimensions';

const configurableSubscriber = ({
  tempTimeout = Math.random() * 1900 + 100,
  presTimeout = Math.random() * 1900 + 100,
  humidTimeout = Math.random() * 1900 + 100,
  temperature = new TrackableEmitter(),
  pressure = new TrackableEmitter(),
  humidity = new TrackableEmitter()
}: configurableParams) => {
  return (subscriber: any) => {
    let temperatureTimeout: NodeJS.Timeout;
    let pressureTimeout: NodeJS.Timeout;
    let humidityTimeout: NodeJS.Timeout;
    let globalTimeout = false;

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
        if (globalTimeout || !allEventsEmitted()) {
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
    }, tempTimeout);

    setInterval(() => {
      pressure.emit('data', getRandomValue(1, 100));
      clearTimeout(pressureTimeout);
    }, presTimeout);

    setInterval(() => {
      humidity.emit('data', getRandomValue(1, 100));
      clearTimeout(humidityTimeout);
    }, humidTimeout);
  };
};

export default configurableSubscriber;
