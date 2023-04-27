import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [list, setList] = useState([])

    useEffect(()=>{
        const busqueda = info?.lineaVenta.reduce((acc, item) => {
          acc[item.idProducto] = ++acc[item.idProducto] || 0;
          return acc;
        }, {});

        const duplicados = info?.lineaVenta.filter( (item) => {
          return busqueda[item.idProducto];
        });

        isEnabled ? 

        setList(info?.lineaVenta.filter((item)=>{
            if(item.idProducto === duplicados[0]?.idProducto && item.modificado === true ){
                return item
            }
            if (item.idProducto !== duplicados[0]?.idProducto && item.modificado === false ) {
                return item
            }
        }))
        :
        setList(info?.lineaVenta.filter((item)=>{
            if(item.idProducto === duplicados[0]?.idProducto && item.modificado === false ){
                return item
            }
            if (item.idProducto !== duplicados[0]?.idProducto && item.modificado === false ) {
                return item
            }
        }))
    },[isEnabled])

    return (
        <View style={{padding: 15, flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: '600', fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Numero de venta : #{info._id}</Text>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Cliente : {info.cliente.apellido} , {info.cliente.nombre}</Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Direccion : {info.cliente.direccion[0].calle} {info.cliente.direccion[0].numero} , {info.cliente.direccion[0].ciudad}</Text>
            </View>
            <View style={{paddingVertical: 3, paddingHorizontal: 25}}>
                <Divider width={1} insetType={'middle'} />
            </View>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Estado : 
                    <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: color()}}> {info.estado} </Text>
                </Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >FechaPreventa : {info.fechaPre}</Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Fecha Entrega : {info.fechaEntrega || 'no entregado'}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}} >
                    <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Modificaciones : </Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                </View>
            </View>
            <View style={{flex: 1}} > 
                <FlatList
                    data={list}
                    style={styles.list}
                    renderItem={({item})=><ProductCard {...item} cart={true} />}
                />
            </View>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Descuento : {info.descuento || 'No hay descuento aplicado'}</Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Total : 
                    <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#7F8487'}} > $ {info.total}</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    list: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 15,
      },
})