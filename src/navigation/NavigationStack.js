import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import Navigation from './NavigationDrawer'
const Stack = createStackNavigator()

export default function NavigationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}  options={{headerShown: false}}/>
        <Stack.Screen name='NavigationDrawer' component={Navigation}  options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}