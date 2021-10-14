import Screens from './screens';
import GlobalStyle from './globalStyles';
import AppState from '../../shared/state';
import firebase from 'firebase';
import 'firebase/firestore';

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
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const db = firebase.firestore();

  return (
    <AppState db={db.collection('Users').doc('jatinbumbra')}>
      <GlobalStyle />
      <Screens />
    </AppState>
  );
}

export default App;
