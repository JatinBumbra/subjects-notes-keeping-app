import React from 'react';
import AppState from '../shared/state';
import Screens from './screens';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const requiredCollection = firestore().collection('Users').doc('jatinbumbra');

  return (
    <AppState db={requiredCollection}>
      <Screens />
    </AppState>
  );
};

export default App;
