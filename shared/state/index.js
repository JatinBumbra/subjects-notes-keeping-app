import 'react-native-get-random-values';
import React, { createContext } from 'react';
import useSubjects from './hooks/subjects';

export const AppContext = createContext();

const AppState = ({ children, db }) => {
  const subjects = useSubjects({ db });

  return (
    <AppContext.Provider value={{ subjects }}>{children}</AppContext.Provider>
  );
};

export default AppState;
