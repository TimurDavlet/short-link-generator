import React from 'react';
import ReactDOM from 'react-dom/client';
import InitialState from './init';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const startApp = await InitialState();
  root.render(<React.StrictMode>{startApp}</React.StrictMode>);
};

app();
