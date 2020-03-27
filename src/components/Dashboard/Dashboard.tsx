import React from 'react';

import IData from '../../types/IData';
import './Dashboard.css';

export const Dashboard: React.FC<IData> = ({
  temperature,
  pressure,
  humidity
}) => {
  return (
    <div className="dashboard">
      <div className="temperature">
        <h1 className="dashboard__h1">Temperature</h1>
        <div className="temperature__h2">
          <h2>{temperature}</h2>
        </div>
      </div>
      <div className="pressure">
        <h1 className="dashboard__h1">Pressure</h1>
        <div className="pressure__h2">
          <h2>{pressure}</h2>
        </div>
      </div>
      <div className="humidity">
        <h1 className="dashboard__h1">Humidity</h1>
        <div className="humidity__h2">
          <h2>{humidity}</h2>
        </div>
      </div>
    </div>
  );
};
