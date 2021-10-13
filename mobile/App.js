import React from 'react';
import AppState from '../shared/state';
import Screens from './screens';

const App = () => {
  return (
    <AppState>
      <Screens />
    </AppState>
  );
};

export default App;
