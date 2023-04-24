import { StyleSheet, Text, View, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePacking } from '../context/PackingSaleContext'
import MapView from 'react-native-maps'
import ProductCard from './ProductCard'
import { Marker } from 'react-native-maps';
import OpenCageGeocoder from 'opencage-api-client';
import MyBottomSheet from './MyBottomSheet'

export default function ShippingSaleCard({length}) {

    const {indexPacking, saleActive, editQty, qtyMiss, qtyChange } = usePacking()

    const [filterSale, setFilterSale] = React.useState(saleActive?.lineaVenta)
    const [filterActive, setFilterActive] = React.useState('')
    const [rowClose, setRowClose] = React.useState(false)
    const [sheetProduct, setSheetProduct] = useState(false)

    const onFilterActive = (item) => {
        if(filterActive === item) setFilterActive('')
        if(filterActive === '' || filterActive !== item) setFilterActive(item)
    }

    React.useEffect(()=>{
        if(filterActive !== '') setFilterSale(saleActive?.lineaVenta.filter(item=> item.categoria === filterActive && item.estado !== 'entregado'))
        if(filterActive === '') setFilterSale(saleActive?.lineaVenta.filter(item=> item.estado !== 'entregado'))
    },[filterActive, saleActive])

  return (
    <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical:5}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>Entrega de pedido</Text>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>{indexPacking+1} de {length} pedidos</Text>
        </View>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 16}}>Numero de venta : #{saleActive?._id}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 15}}>Cliente:   {saleActive?.cliente.apellido}, {saleActive?.cliente.nombre}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 15}}>Direccion:   {saleActive?.cliente.direccion[0].calle} {saleActive?.cliente.direccion[0].numero}, {saleActive?.cliente.direccion[0].ciudad}</Text>
        <View style={{borderBottomColor: '#d9d9d9', borderBottomWidth: 1, marginHorizontal: '20%', marginTop: 10, marginBottom: 5}}/>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 15}}>Fecha Preventa:   {saleActive?.fechaPre}</Text> 
        <MyMap address={`${saleActive?.cliente?.direccion[0]?.calle} ${saleActive?.cliente?.direccion[0]?.numero} , ${saleActive?.cliente?.direccion[0]?.ciudad}, Tucumán, Argentina`} />
        <Pressable style={{borderWidth: 1, borderColor: '#d9d9d9', marginHorizontal: 15, marginVertical: 10, flexDirection: 'row', borderRadius: 15, padding: 5, justifyContent: 'space-around'}} onPress={()=>setSheetProduct(true)} >
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487', marginStart: 15}}>{saleActive?.lineaVenta.length}</Text> 
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 25}}>Productos</Text>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487', marginStart: 25}}>${saleActive?.total}</Text>
        </Pressable>
        <MyBottomSheet open={sheetProduct} onClose={()=>setSheetProduct(false)} height={450} >
              <FlatList 
                data={saleActive?.lineaVenta}
                renderItem={({item})=><ProductCard {...item} onClick={()=>console.log("cartsale productcard")} cart={true} />}
              />
        </MyBottomSheet>
    </View>
  )
}

const MyMap = ({ address }) => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    OpenCageGeocoder.geocode({
      key: '7a974c3f69e449b9b31ec5b3167c7214',
      q: address,
    }).then((response) => {
      const { lat, lng } = response.results[0].geometry;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setMarker({
        latitude: lat,
        longitude: lng,
      });
    }).catch((error) => console.warn(error));
  }, [address]);

  if (!region) {
    return <View style={styles.mapContainer} />;
  }

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={region}>
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
};

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
      mapContainer: {
        width: '100%',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#eee',
      },
      map: {
          marginTop: 10,
          height: '100%'
      },
})