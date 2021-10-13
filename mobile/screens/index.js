import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../../shared/constants/routes';
import SubjectsScreen from './Subjects';
import TopicsScreen from './Topics';
import NotesScreen from './Notes';
import {AppContext} from '../../shared/state';

const Stack = createNativeStackNavigator();

const Screens = () => {
  const {subjects, topics, notes} = useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      await subjects.read();
      await topics.read();
      await notes.read();
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.Subjects}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.Subjects} component={SubjectsScreen} />
        <Stack.Screen name={routes.Topics} component={TopicsScreen} />
        <Stack.Screen name={routes.Notes} component={NotesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
