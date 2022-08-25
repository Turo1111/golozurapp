import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'
import SaleScreen from '../screens/SaleScreen'

const Drawer = createDrawerNavigator()

export default function Navigation() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name={'Home'} component={HomeScreen}/>
        <Drawer.Screen name={'Sale'} component={SaleScreen}/>
    </Drawer.Navigator>
  )
}