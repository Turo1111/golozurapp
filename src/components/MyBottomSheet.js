import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

export default function MyBottomSheet({children, open, onClose, height = 90}) {

    

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={open}
    onRequestClose={onClose}
    >
        <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(217,217,217,0.7)'}}>
            <View style={{backgroundColor: 'white', height: `${height}%`, top: `${100-height}%`, borderTopLeftRadius: 15, borderTopRightRadius: 15}} >
                <Pressable  onPress={onClose} style={{width: '100%', height: 10, justifyContent: "center", alignItems: "center", marginVertical: 5}} >
                  <View style={{height: 8, width: 45, backgroundColor: '#d7d7d7', borderRadius: 50}}></View>
                </Pressable>
                <View style={{height: '100%', width: '100%', paddingHorizontal: 15, paddingVertical: 10}}>
                    {children}
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({})