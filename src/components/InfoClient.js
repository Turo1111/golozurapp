import { View, Text } from 'react-native'
import React from 'react'
import InputListAdd from './InputListAdd'

export default function InfoClient({item}) {


  return (
    <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Nombre : {item?.nombre || "No definido"} </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Apellido : {item?.apellido || "No definido"}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Email : {item?.email || "No definido"}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Telefono :</Text>
            <InputListAdd data={item?.telefono} width={80} editable={false} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Direcciones :</Text>
            <InputListAdd data={item?.direccion?.map((item)=>item.calle+' '+item.numero+','+' '+item.ciudad)} width={80} editable={false} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Estado : {item?.estado || "No definido"}</Text>
        </View>
    </View>
  )
}
