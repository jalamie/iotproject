import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import LanguageSelector from "../screens/LanguageSelector";
import AddLanguages from "../screens/AddLanguages";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="AuthScreen">
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
    <Stack.Screen name="AddLanguages" component={AddLanguages} />
  </Stack.Navigator>
);

export default AppNavigator;
