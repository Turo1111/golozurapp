import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'
import NewSaleScreen from '../screens/NewSaleScreen'
import SaleScreen from './../screens/SaleScreen';
import SaleNavigation from './SaleNavigation';
import ProductScreen from './../screens/ProductScreen';
import LoginScreen from '../screens/LoginScreen';

const Drawer = createDrawerNavigator()

export default function Navigation() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name={'Home'} component={HomeScreen}  />
        <Drawer.Screen name={'NewSale'} component={NewSaleScreen}/>
        <Drawer.Screen name={'Sale'} component={SaleNavigation}/>
        <Drawer.Screen name={'Product'} component={ProductScreen}/>
    </Drawer.Navigator>
  )
}