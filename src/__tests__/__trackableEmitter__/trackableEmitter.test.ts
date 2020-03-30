import IData from '../../types/IData';
import TrackableEmitter from '../../observable/trackableEmitter';
import { Dimensions } from '../../types/Dimensions';

const mockNext = (data: IData) => console.log(data);
const data: IData = {
  temperature: '',
  pressure: '',
  humidity: ''
};

let testTimeout: NodeJS.Timeout;

test('TrackableEmitter changes its state after first emitted value', done => {
  const testEmitter = new TrackableEmitter();

  expect(testEmitter.firstEventEmitted).toEqual(false);

  testEmitter.dataHandler(
    mockNext,
    data,
    Dimensions.humidity,
    testTimeout
  )('3');

  expect(testEmitter.firstEventEmitted).toEqual(true);
  done();
});
