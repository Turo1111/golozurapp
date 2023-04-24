import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import  Icon from 'react-native-vector-icons/MaterialIcons'
import { useFormik } from 'formik'

export default function InputListAdd({data = [], onChangeData, eClose, width = 60, editable = true}) {

  const [openList, setOpenList] = useState(false)

  const formik = useFormik({
    initialValues: {item: ''},
    validateOnChange: false,
    onSubmit: (formValue) => {
        console.log("aca", formValue)
    }
  })

  return (
    <View style={{position: 'relative', width: `${width}%`, marginHorizontal: 5}}>
      <TextInput 
        placeholder={data.length === 0 ? 'Telefono' : 
          data.toString()
        } 
        editable={editable}
        style={[{ width: `${width}%` }, styles.input]} 
        value={formik.values.item}
        onChangeText={(text)=> formik.setFieldValue('item',text)}
      />
      {
        formik.values.item !== '' ? 
        <Text style={{fontSize: 12, position: 'absolute', top: '28%', right:`${100-width}%`, color: '#7F8487' }}
          onPress={()=>{
            onChangeData([...data, formik.values.item])
            formik.setFieldValue('item','')
          }}
        >AGREGAR</Text> 
        :
        <Icon name='keyboard-arrow-down'
          style={{fontSize: 22, position: 'absolute', top: '22%', right: `${100-width}%` }} color={'#7F8487'} 
          onPress={()=>setOpenList(!openList)} 
        />
      }
      {
        openList &&
        <View style={[styles.shadow ,{maxHeight: 80, backgroundColor: '#fafafa', position: 'absolute', width: `${width}%`, top: '100%', left: '1%', padding: 10, borderRadius: 10, zIndex: 2}]}>
          <FlatList
            data={data}
            renderItem={({item})=>
            <Text 
              style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}
              onPress={()=>{
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
        fontSize: 16
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