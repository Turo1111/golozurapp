import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Divider } from '@rneui/base'
import ProductCard from './ProductCard'

export default function InfoSale({info}) {
  
    const color = () => {

        let valueColor = '#FF6D28'
        const estado = info.estado
        if(estado === 'pagado') valueColor ='#367E18'
        if(estado === 'entregado') valueColor ='#B6E2A1'
        if(estado === 'armado') valueColor ='#EEBB4D'
    
        return valueColor
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <Text style={{fontSize: 14, fontWeight: '600', fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Numero de venta : #{info._id}</Text>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Cliente : {info.cliente.apellido} , {info.cliente.nombre}</Text>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Direccion : {info.cliente.direccion.calle} {info.cliente.direccion.numero} , {info.cliente.direccion.ciudad}</Text>
            </View>
            <View style={{paddingVertical: 3, paddingHorizontal: 25}}>
                <Divider width={1} insetType={'middle'} />
            </View>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Estado : 
                    <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: color()}}> {info.estado} </Text>
                </Text>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >FechaPreventa : {info.fechaPre}</Text>
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Fecha Entrega : {info.fechaEntrega || 'no entregado'}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}} >
                    <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Modificaciones : </Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                </View>
            </View>
            <FlatList
                data={info.lineaVenta}
                style={[styles.list, {paddingHorizontal: 10, height: '55%', marginVertical: 5}]}
                renderItem={({item})=><ProductCard {...item} cart={true} />}
            />
            <View style={{padding: 5}}>
                <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Descuento : {info.descuento || 'No hay descuento aplicado'}</Text>
                <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Total : 
                    <Text style={{fontSize: 14, fontFamily: 'Cairo-Bold', color: '#7F8487'}} > $ {info.total}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    list: {
        paddingHorizontal: 15,
        marginHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 15,
        marginVertical: 15
      },
})