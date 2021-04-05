import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './globalStyles';
import MainPage from './pages/Main';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root'),
);
