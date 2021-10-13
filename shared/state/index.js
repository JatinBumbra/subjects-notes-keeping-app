import 'react-native-get-random-values';
import React, { createContext } from 'react';
import useSubjects from './hooks/subjects';
import useTopics from './hooks/topics';
import useNotes from './hooks/notes';

export const AppContext = createContext();

const AppState = ({ children, db }) => {
  const subjects = useSubjects({ db });
  const topics = useTopics({ db });
  const notes = useNotes({ db });

  return (
    <AppContext.Provider value={{ subjects, topics, notes }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
