import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Button({text, width,  onPress, disabled, icon , backgroundColor, color, fontSize, style}) {

 

  return (
    <Pressable style={[styles.button,
      {
        backgroundColor:  disabled ? '#d9d9d9' : backgroundColor ? backgroundColor :'#2366CB',
        width: width ? width : '45%'
      },
      style
    ]} 
      onPress={onPress} 
      disabled={disabled}
    >
        {
          icon && icon
        }
        <Text style={{fontSize: fontSize ? fontSize : 16, fontFamily: 'Cairo-Bold', color: color ? color : 'white' }}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
    },
})