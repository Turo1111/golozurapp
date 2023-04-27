import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { useAlert } from '../context/AlertContext'

export default function Alert() {

  const {value} = useAlert()

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={value.open}
    >
      <View style={{backgroundColor: value.color, paddingVertical: 5, paddingHorizontal: 15, marginTop: 25, marginHorizontal: 40, borderRadius: 10}} >
        <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487', textAlign: 'center'}}>{value.text}</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
})