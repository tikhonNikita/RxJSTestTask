import React, { useState, useEffect } from 'react';

import IData from './types/IData';
import { observable } from './observable/observable';
import { Dashboard } from './components/Dashboard/Dashboard';

import './App.css';

const initialDisplayEmitting = (data: IData) => {
  return (
    data.temperature !== '' && data.pressure !== '' && data.humidity !== ''
  );
};

function App() {
  const [dimensions, setDimensions] = useState({
    temperature: '',
    pressure: '',
    humidity: ''
  });

  useEffect(() => {
    observable.subscribe(dimensionsData => {
      setDimensions(dimensionsData as IData);
    });
  }, []);

  return (
    <div className="App">
      {initialDisplayEmitting(dimensions) && (
        <Dashboard {...dimensions}></Dashboard>
      )}
    </div>
  );
}

export default App;
