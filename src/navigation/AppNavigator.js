import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import LanguageSelector from '../screens/LanguageSelector';
import AddLanguages from '../screens/AddLanguages';
import ViewImages from '../screens/ViewImages';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="AuthScreen">
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
    <Stack.Screen name="AddLanguages" component={AddLanguages} />
    <Stack.Screen name="ViewImages" component={ViewImages} />
  </Stack.Navigator>
);

export default AppNavigator;
