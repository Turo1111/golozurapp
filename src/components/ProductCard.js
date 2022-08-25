import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function ProductCard({item}) {

    let [fontsLoaded] = useFonts({
        'Cairo-Regular': require('../../assets/fonts/Cairo-Regular.ttf'),
        'Cairo-Light': require('../../assets/fonts/Cairo-Light.ttf'),
        'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
      })

    if (!fontsLoaded) {
      return null;
    }

  return (      
    <View style={{flexDirection: 'row', paddingHorizontal: 20, marginVertical: 5}}>
        <Image
            source={require('../assets/mediatarde.png')}
            style={styles.image}
        />
        <View style={{paddingStart: 5, paddingVertical: 5}}>
            <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between', width: '72%'}}>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular'}}>#165DAS655ASD</Text>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold'}}>(35)</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5, width: '72%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular'}}>Galleta Mediatardes {item}</Text>
                <Text style={{fontSize: 14, fontFamily: 'Cairo-Bold'}}>$165.99</Text>
            </View>
            
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    }
})