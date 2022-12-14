import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProductCard from './../components/ProductCard';
import Button from '../components/Button';
import { usePacking } from '../context/PackingSaleContext';
import PackingSaleCard from '../components/PackingSaleCard';

export default function PackingSaleScreen({navigation}) {

    const {listSelected, nextPacking, afterPacking} = usePacking()

  return (
    <View style={styles.content}>
        <PackingSaleCard length={listSelected.length} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}} >
            <Button text={'Atras'} onPress={()=>afterPacking(navigation)}/>
            <Button text={'Siguiente'} onPress={()=>nextPacking(navigation)} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
      marginTop: 30,
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