import { EventEmitter } from 'events';

import IData from '../types/IData';
import { Dimensions } from '../types/Dimensions';

export default class TrackableEmitter extends EventEmitter {
  public firstEventEmitted = false;

  dataHandler = (
    next: (value: IData) => void,
    dataCollector: IData,
    dimension: Dimensions,
    timeout: NodeJS.Timeout
  ) => {
    return (data: string) => {
      dataCollector[dimension] = data;
      next({ ...dataCollector });
      this.firstEventEmitted = true;
      timeout = setTimeout(() => {
        dataCollector[dimension] = 'N/A';
        next({ ...dataCollector });
      }, 1000);
    };
  };
}
