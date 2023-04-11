import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'
import NewSaleScreen from '../screens/NewSaleScreen'
import SaleScreen from './../screens/SaleScreen';
import SaleNavigation from './SaleNavigation';
import ProductScreen from './../screens/ProductScreen';
import LoginScreen from '../screens/LoginScreen';
import ClientScreen from '../screens/ClientScreen';

const Drawer = createDrawerNavigator()

export default function Navigation() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name={'Home'} component={HomeScreen} options={{title: 'INICIO'}}/>
        <Drawer.Screen name={'NewSale'} component={NewSaleScreen} options={{title: 'NUEVA VENTA'}}/>
        <Drawer.Screen name={'Sale'} component={SaleNavigation} options={{title: 'VENTAS'}}/>
        <Drawer.Screen name={'Product'} component={ProductScreen} options={{title: 'PRODUCTOS'}}/>
        <Drawer.Screen name={'Client'} component={ClientScreen} options={{title: 'CLIENTES'}}/>
    </Drawer.Navigator>
  )
}