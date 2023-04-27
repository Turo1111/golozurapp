import { StyleSheet, Text, View, Pressable, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePacking } from '../context/PackingSaleContext'
import MapView from 'react-native-maps'
import ProductCard from './ProductCard'
import { Marker } from 'react-native-maps';
import OpenCageGeocoder from 'opencage-api-client';
import MyBottomSheet from './MyBottomSheet'
import { SwipeListView } from 'react-native-swipe-list-view'
import RenderHiddenItem from './RenderHiddenItem'

export default function ShippingSaleCard({length}) {

    const {indexPacking, saleActive, editQty, qtyChange } = usePacking()

    const [rowClose, setRowClose] = React.useState(false)
    const [sheetProduct, setSheetProduct] = useState(false)

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
          <SwipeListView
            data={saleActive?.lineaVenta}
            style={styles.list}
            renderItem={
                ({item})=>(
                    <TouchableHighlight
                        style={styles.rowFront}
                        underlayColor={'#AAA'}
                    >
                        <ProductCard {...item} cart={true} onLongPress={()=>qtyChange(item._id)} />
                    </TouchableHighlight>
                )
            }
            renderHiddenItem={({item})=><RenderHiddenItem item={item} rowClose={rowClose} editQty={editQty} deleteItemCart={()=>console.log()} />}
            rightOpenValue={-200}
            leftOpenValue={78}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowOpen={()=>setRowClose(false)}
            onRowClose={()=>setRowClose(true)}
            ListEmptyComponent={
             <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
             }
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