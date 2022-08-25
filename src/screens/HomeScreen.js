import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native'
import React from 'react'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.content}>
        
      <Text>HomeScdasreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 30
    },
    search : {
        flex: 1
    }
})