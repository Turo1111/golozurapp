import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Search({placeholder, width, searchInput}) {
  return (
    <TextInput placeholder={placeholder} style={[styles.input, {width: width ? width : '100%'}]} {...searchInput}/>
  )
}

const styles = StyleSheet.create({
  search : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  input: {
      margin: 5,
      borderWidth: 1,
      paddingVertical: 4,
      paddingHorizontal: 15,
      borderRadius: 10,
      color: '#D9D9D9',
      borderColor: '#D9D9D9',
      fontSize: 18
  },
})