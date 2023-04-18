import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  LogBox,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Signup from './src/views/Signup';
import { DataProvider } from './src/context/DataContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dashboard from './src/views/Dashboard';
import store from './src/redux/store/store';
import { Provider } from 'react-redux';
import Camera from './src/views/Camera';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

LogBox.ignoreAllLogs()


const App = () =>{

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown : false
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown : true,
              headerStyle : { backgroundColor : '#009999' , color : 'white' },
              headerTitleStyle : { color : 'white'},
              headerTintColor : "white"             
            }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    </Provider>
  )
}

export default App;
