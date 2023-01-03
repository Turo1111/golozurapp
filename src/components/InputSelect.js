import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import  Icon from 'react-native-vector-icons/MaterialIcons'

export default function InputSelect() {

    uss

  return (
    <View style={{position: 'relative'}}>
      <TextInput placeholder='Seleccionar' style={styles.input}/>
      <Icon name='keyboard-arrow-down' style={{fontSize: 22, position: 'absolute', top: '22%', left: '52%' }} color={'#7F8487'} onPress={()=>console.log("baja")} />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        margin: 3,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        color: '#7F8487',
        borderColor: '#D9D9D9',
        width: '60%',
        fontSize: 12
    },
})