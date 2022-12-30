import { View, Text } from 'react-native'
import React from 'react'
import Application from './Application'
import History from './History'
import Tasks from './Tasks'
import Track from './Track'
import UserAccounts from './UserAccounts'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const Tab = createMaterialTopTabNavigator();

    const swipeEnabled = useSelector((state) => state.swiperReducer);
    console.log("Swipe = " , swipeEnabled)

  return (
      <Tab.Navigator
          initialRouteName='Application'
          tabBarPosition='bottom'
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size, color }) => {
                  let iconName;
                  if (route.name === 'Application') {
                      iconName = 'app-store-ios';
                      size = 20
                  }
                  else if (route.name === 'History') {
                      iconName = 'clock'
                      size = 20
                  }
                  else if (route.name === 'Tasks') {
                      iconName = 'plus-circle'
                      size = 33
                  }

                  else if (route.name === 'Track') {
                      iconName = 'street-view'
                      size = 20
                  }

                  else if (route.name === 'Accounts') {
                      iconName = 'user-circle'
                      size = 20
                  }


                  return (
                      <FontAwesome5
                          name={iconName}
                          size={size}
                          color={color}
                          style={{ width: '100%' }}
                      />
                  )

              },
              tabBarActiveTintColor: 'ivory',
              tabBarInactiveTintColor: '#BEBCBC',
              tabBarShowLabel: false,
              tabBarStyle: { backgroundColor: '#009999', width: '100%', textAlign: 'center' },
              headerShown: false,
              tabBarShowIcon: true,
              swipeEnabled : false
          })}
      >
          <Tab.Screen
              name="Application"
              component={Application}
          />
          <Tab.Screen
              name="History"
              component={History}
          />
          <Tab.Screen
              name="Tasks"
              component={Tasks}
              options={{
                  tabBarIconStyle: { width: '100%', height: '100%' }
              }}
          />
          <Tab.Screen
              name="Track"
              component={Track}
          />
          <Tab.Screen
              name="Accounts"
              component={UserAccounts}
          />
      </Tab.Navigator>
  )
}

export default Dashboard