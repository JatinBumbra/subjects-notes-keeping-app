import Screens from './screens';
import GlobalStyle from './globalStyles';
import AppState from '../../shared/state';
import firebase from 'firebase';
import 'firebase/firestore';

// IDEALLY SHOULD BE LOADED TO .ENV FILE AND .ENV FILE NOT COMMITTED TO REPO. HERE ONLY TO SIMPLIFY THIS DEMO PROJECT.
const firebaseConfig = {
  apiKey: 'AIzaSyASpr7cJjeXqt3X9ph9WC-2fVIUQiT1M9M',
  authDomain: 'subjectnoteskeeper.firebaseapp.com',
  projectId: 'subjectnoteskeeper',
  storageBucket: 'subjectnoteskeeper.appspot.com',
  messagingSenderId: '4321825490',
  appId: '1:4321825490:web:82f59dea1f49fb305b930b',
  measurementId: 'G-KRNCGQ3XN8',
};

function App() {
  // Written due to interference between web and mobile instances
  // If any firebase apps are not open, then create new instance else use it
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  // Here, the required collection is being referenced for a hardcoded docID - jatinbumbra.
  /**
   * The Database approach
      - There is a single 'Users' collection which holds the data of each individual user indedependently
      - The documents in the collection can be referenced by some data unique to user. Ideally, it can be hash of the user's email since emails are unique. This will form the document ID.
   */
  const db = firebase.firestore().collection('Users').doc('jatinbumbra');

  return (
    <AppState db={db}>
      <GlobalStyle />
      <Screens />
    </AppState>
  );
}

export default App;
