import IData from '../../types/IData';
import { observableMock } from '../../__mocks__/obserbale-mock';

test('the observable emits dimensionsData', done => {
  observableMock.subscribe(dimensionsData => {
    expect(dimensionsData).toBeTruthy();
    done();
  });
});

test('temperature emitter must emit value', done => {
  observableMock.subscribe(dimensionsData => {
    const objMock: IData = {
      temperature: '100',
      pressure: '',
      humidity: ''
    };
    expect(dimensionsData).toEqual(objMock);
  });
  done();
});
