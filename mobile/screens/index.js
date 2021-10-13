import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../../shared/constants/routes';
import SubjectsScreen from './Subjects';
import TopicsScreen from './Topics';

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.Subjects}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.Subjects} component={SubjectsScreen} />
        <Stack.Screen name={routes.Topics} component={TopicsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
