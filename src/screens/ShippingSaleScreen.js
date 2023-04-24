import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons'
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import ShippingSaleCard from '../components/ShippingSaleCard';
import { usePacking } from '../context/PackingSaleContext';

export default function ShippingSaleScreen({navigation}) {

  const {listSelected, nextShipping, holdShipping} = usePacking()

  return (
    <View style={styles.content}> 
        <ShippingSaleCard length={listSelected.length}  />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}} >
            <Button text={'Posponer'} onPress={()=>holdShipping(navigation)} />
            <Button text={'Entregado'} onPress={()=>nextShipping(navigation)} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
      backgroundColor: '#fff',
      height: '100%',
      paddingVertical: 5
    },
    state: {
      fontSize: 14, 
      fontFamily: 'Cairo-Regular', 
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      color: '#9E9E9E',
      borderColor: '#9e9e9e',
      height: 25
  },
})