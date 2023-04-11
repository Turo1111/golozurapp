import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import  Icon from 'react-native-vector-icons/MaterialIcons'

export default function InputSelect({data, value, onChangeText, eClose}) {

  const [openList, setOpenList] = useState(false)

  return (
    <View style={{position: 'relative', minWidth: '80%'}}>
      <TextInput placeholder='Seleccionar' style={styles.input} 
        value={value}
        onChangeText={onChangeText}
      />
      <Icon name='keyboard-arrow-down'
       style={{fontSize: 22, position: 'absolute', top: '22%', left: '52%' }} color={'#7F8487'} 
       onPress={()=>setOpenList(!openList)} 
      />
      {
        openList &&
        <View style={[styles.shadow ,{maxHeight: 150, backgroundColor: '#fafafa', position: 'absolute', width: '60%', top: '100%', left: '1%', padding: 10, borderRadius: 10, zIndex: 2}]}>
          <FlatList
            data={data}
            renderItem={({item})=>
            <Text 
              style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}
              onPress={()=>{
                setOpenList(false)
                onChangeText(item)
              }}
            >
              {item}
            </Text>
          }
          />
        </View>
      }
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
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }
})