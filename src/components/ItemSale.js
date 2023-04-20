import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import {usePacking} from './../context/PackingSaleContext';

export default function ItemSale({item, onPress}) {

  const color = () => {

    let valueColor = '#FF6D28'
    const estado = item?.estado
    if(estado === 'pagado') valueColor ='#367E18'
    if(estado === 'entregado') valueColor ='#B6E2A1'
    if(estado === 'armado') valueColor ='#EEBB4D'

    return valueColor
  }

  const {listSelected, addDeleteSale} = usePacking()

  const isSelected = listSelected.find(obj => obj._id === item?._id)

  
  return (
    <Pressable style={{borderBottomColor: '#d1d1d1', borderBottomWidth: 1, paddingVertical: 10, backgroundColor: isSelected && 'rgba(35,102,203,0.5)' }} onPress={()=>addDeleteSale(item)} >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.cliente?.apellido}, {item?.cliente?.nombre}</Text>
        <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>{item?.fechaPre}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.cliente?.direccion[0]?.calle} {item?.cliente?.direccion[0]?.numero} , {item?.cliente?.direccion[0]?.ciudad}</Text>
        <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: color()}}>{item?.estado}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: '#7F8487', marginEnd: 10}}>X</Text>
            <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>Productos</Text>
        </View>
        <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>${item?.total}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})