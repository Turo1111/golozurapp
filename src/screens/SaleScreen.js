import React from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import ProductCard from '../components/ProductCard';
import { useFonts } from '@expo-google-fonts/inter';

export default function SaleScreen() {

  let [fontsLoaded] = useFonts({
      'Cairo-Regular': require('../../assets/fonts/Cairo-Regular.ttf'),
      'Cairo-Light': require('../../assets/fonts/Cairo-Light.ttf'),
      'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
  })
  
  if (!fontsLoaded) {
    return null;
  }

return (
  <View style={styles.content}>
    <View style={styles.search}>
          <TextInput placeholder='Buscar producto' style={styles.input}/>
          <Icon.Button name='refresh' size={20} style={styles.icon}>
              Refrescar
          </Icon.Button>
      </View>
      <FlatList
          data={[1,2,3,4,5,6,7,8,9,10,11]}
          renderItem={({item})=><ProductCard item={item}/>}
      />
  </View>
)
}

const styles = StyleSheet.create({
  content: {
      marginTop: 30,
      position: 'relative',
  },
  search : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width: '60%'
  },
  icon: {
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 15
  }
})