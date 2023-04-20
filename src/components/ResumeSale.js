import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import useCart from '../hooks/useCart'
import { ClientCard } from './ClientSale'
import { Marker } from 'react-native-maps';
import OpenCageGeocoder from 'opencage-api-client';

export default function ResumeSale() {
  const {cart, client, totalCart} = useCart()

  return (
    <View >
        <View style={{paddingStart: 5, width: '100%'}}>
          <Text style={styles.title}>Resumen</Text>
          {
            client === undefined ? <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487', marginVertical: 15 }}>Cliente no seleccionado</Text> :
            <ClientCard item={client} />
          }
         
        </View>
        <MyMap address={`${client?.direccion[0]?.calle} ${client?.direccion[0]?.numero} , ${client?.direccion[0]?.ciudad}, Tucumán, Argentina`} />
        <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1, marginVertical: 5 }}>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>{cart.length || "0"}</Text>
          <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Productos</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>${totalCart || "0"}</Text>
        </View>
        <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1, marginVertical: 5 }}>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>
            {cart.filter(item=> item.estado === "entregado").length}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Entrega inmediata</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>
            $ {cart.filter(item=> item.estado === "entregado" ).reduce(
                  (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.total),
                  0
                )
              }     
          </Text>
        </View>
        <View style={[styles.total, styles.borderTop]}>
          <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Total a pagar:</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>${totalCart || "0"}</Text>
        </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cairo-Regular',
    color: '#7F8487',
    marginVertical: 10
  },
  mapContainer: {
    width: '100%',
    height: '55%',
    backgroundColor: '#eee',
  },
  map: {
      marginTop: 10,
      height: '100%'
  },
  total: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '90%'
  },
  borderTop: {
    borderTopColor: '#d7d7d7',
    borderTopWidth: 1
  }
})