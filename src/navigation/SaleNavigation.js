import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SaleScreen from './../screens/SaleScreen';
import PackingSaleScreen from './../screens/PackingSaleScreen';
import { Text } from 'react-native';
import PackagingProcessSale from '../screens/ShippingSaleScreen';
import ShippingSaleScreen from '../screens/ShippingSaleScreen';

const Stack = createStackNavigator()

export default function SaleNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Sale' component={SaleScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Packing' component={PackingSaleScreen}  options={{headerShown: false}}
        />
        <Stack.Screen name='Shipping' component={ShippingSaleScreen}  options={{headerShown: false}}
        />
    </Stack.Navigator>
  )
}