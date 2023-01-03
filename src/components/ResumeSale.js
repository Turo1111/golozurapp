import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import useCart from '../hooks/useCart'
import { ClientCard } from './ClientSale'
import Geocoder from 'react-native-geocoding';

export default function ResumeSale() {
  const {cart, client, totalCart} = useCart()

  // NECESITO CREAR CUENTA FACTURACION
  /* Geocoder.init("AIzaSyCr2_BCW5AF0KbNlVxDnN8f2NOvQJwlt6A")

  Geocoder.from("Colosseum")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error)); */

  return (
    <View >
        <View style={{paddingStart: 5, paddingVertical: 5, width: '100%'}}>
          <Text style={styles.title}>Resumen</Text>
          {
            client === undefined ? <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487', marginVertical: 25 }}>Cliente no seleccionado</Text> :
            <ClientCard item={client} />
          }
         
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -26.82474519979505,
            longitude: -65.20032463054747,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1 }}>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>{cart.length || "0"}</Text>
          <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Productos</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>${totalCart || "0"}</Text>
        </View>
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopColor: 'white', borderTopWidth: 1 }}>
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

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Cairo-Regular',
        color: '#7F8487'
    },
    map: {
        marginTop: 10,
        height: 200
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

/* {"code": 4, "message": "Error from the server while geocoding. The received datas are in the error's 'origin' field. Check it for more informations.", 
"origin": {"error_message": "This IP, site or mobile application is not authorized to use this API key. Request received from IP address 2803:9800:b442:7dbc:a078:98d2:31f8:cda8, with empty referer", 
"results": [], 
"status": "REQUEST_DENIED"}}
W */