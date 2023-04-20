import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/base'

export default function InfoProduct({item}) {

  console.log(item)

  return (
    <View  style={{paddingVertical: 10, paddingHorizontal: 15}}>
      <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 10 }}>{item.descripcion}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E' }}>#{item.codigoBarra || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 5 }}>Unidades disponibles : {item.stock || 'No definido'} unidades</Text>
      <Divider style={{marginVertical: 10, marginHorizontal: 30}}/>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Peso : {item.peso === undefined && 'No definido' } {item.peso?.cantidad} {item.peso?.unidad}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Bulto : {item.bulto || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Marca : {item.marca || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Categoria: {item.categoria || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Precio bulto : ${item.precioBulto || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Precio unitario : ${item.precioUnitario || 'No definido'}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginVertical: 2 }}>Precio compra : ${item.precioCompra || 'No definido'}</Text>
    </View>
  )
}