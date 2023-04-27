import { StyleSheet, View } from 'react-native'
import React from 'react'
import Button from '../components/Button';
import { usePacking } from '../context/PackingSaleContext';
import PackingSaleCard from '../components/PackingSaleCard';

export default function PackingSaleScreen({navigation}) {

  const {listSelected, nextPacking, afterPacking, indexPacking} = usePacking()

  return (
    <View style={styles.content}>
        <PackingSaleCard length={listSelected.length} />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
              <Button text={indexPacking !== 0 ? "Atras" : "Cancelar"} onPress={()=>afterPacking(navigation)}/>
              <Button text={indexPacking !== listSelected.length-1 ? "Siguiente" : "Terminar"} onPress={()=>nextPacking(navigation)} />
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
      backgroundColor: '#fff',
      height: '100%',
      paddingVertical: 5
    },
    state: {
      fontSize: 14, 
      fontFamily: 'Cairo-Regular', 
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      color: '#9E9E9E',
      borderColor: '#9e9e9e',
      height: 25
  },
})