import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useCart from '../hooks/useCart'

export default function ResumeBottomSheet({onPress}) {

  const { cart, totalCart } = useCart()

  return (
    <View style={styles.resume} >
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <View style={{height: 8, width: 45, backgroundColor: '#d7d7d7', borderRadius: 50}}></View>
        </TouchableOpacity>
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1 }}>
          <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>{cart.length || "0"}</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Productos</Text>
          <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>${totalCart || "0"}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginTop: 10
    },
    resume: {
      width: '100%', 
      minHeight: 80 , 
      borderColor: '#d7d7d7',
      borderWidth: 1,
      borderRadius: 15,
      borderStyle: 'solid',
      height: 100
    }
})