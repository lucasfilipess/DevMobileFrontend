import React from 'react';
import Routes from './src/routes';
import Store from './src/store';

function App() {
  return (
    <Store>
      <Routes />
    </Store>
  );
}

export default App;
