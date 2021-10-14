import React from 'react';
import AppState from '../shared/state';
import Screens from './screens';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  // Here, the required collection is being referenced for a hardcoded docID - jatinbumbra.
  /**
   * The Database approach
      - There is a single 'Users' collection which holds the data of each individual user indedependently
      - The documents in the collection can be referenced by some data unique to user. Ideally, it can be hash of the user's email since emails are unique. This will form the document ID.
   */
  const requiredCollection = firestore().collection('Users').doc('jatinbumbra');

  return (
    <AppState db={requiredCollection}>
      <Screens />
    </AppState>
  );
};

export default App;
