import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

ReactDOM.render(
  //<LoadingProvider>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>,
  //</LoadingProvider>,
  document.getElementById('root')
);
