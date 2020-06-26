import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Layout from './screens/Layout';
import Register from './screens/Register';
import Profile from './screens/Settings/Profile';
import Filter from './screens/Home/Filter';

const AppStack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login}></AppStack.Screen>
        <AppStack.Screen name="Register" component={Register}></AppStack.Screen>
        <AppStack.Screen name="Layout" component={Layout}></AppStack.Screen>
        <AppStack.Screen name="Profile" component={Profile}></AppStack.Screen>
        <AppStack.Screen name="Filter" component={Filter}></AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
