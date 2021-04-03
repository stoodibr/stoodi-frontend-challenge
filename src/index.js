import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import getQuestion from './services/getQuestion';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>Oi{getQuestion()}</h1>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
