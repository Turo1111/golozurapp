import { StyleSheet, Text, View, Modal, Pressable, Dimensions, KeyboardAvoidingView, Keyboard  } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function MyBottomSheet({children, open, onClose, height = 90}) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View style={{height: '100%', width: '100%',backgroundColor: '#fff',backgroundColor: 'rgba(217,217,217,0.7)', flex: 1, justifyContent: 'flex-end'}}>
        <KeyboardAvoidingView behavior='height'>  
          <View  style={{backgroundColor: 'white', height: height === 0 ? '100%' : height, borderTopLeftRadius: 15, borderTopRightRadius: 15, width: '100%'}} >
              <Pressable  onPress={onClose} style={{width: '100%', justifyContent: "center", alignItems: "center", marginVertical: 5}} >
                <View style={{height: 8, width: 45, backgroundColor: '#d7d7d7', borderRadius: 50}}></View>
              </Pressable>
              {children}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
})