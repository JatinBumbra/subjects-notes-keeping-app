import React, {useEffect} from 'react';
import AppState from '../shared/state';
import Screens from './screens';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const requiredCollection = firestore().collection('Users').doc('jatinbumbra');

  useEffect(() => {
    const init = async () => {
      const data = await (await requiredCollection.get()).data();
      if (!data) {
        await requiredCollection.set({
          subjects: null,
          topics: null,
          notes: null,
        });
      }
    };
    init();
  }, []);

  return (
    <AppState db={requiredCollection}>
      <Screens />
    </AppState>
  );
};

export default App;
