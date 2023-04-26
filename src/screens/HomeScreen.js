import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Pressable, FlatList, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from '@rneui/base';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext'
import axios from 'axios'/* 
import useLocalStorage from '../hooks/useLocalStorage' */
import { useAsyncStorage } from '../context/AsyncStorageContext '
import useLocalStorage from '../hooks/useLocalStorage'
import Button from '../components/Button'
const io = require('socket.io-client')
const socket = io('https://gzapi.onrender.com')

export default function HomeScreen({navigation}) {

  const {user, token} = useAuth()
  const {openAlert} = useAlert()
  const { saveData: saveProducto } = useLocalStorage([],'producto');
  const { saveData: saveCliente } = useLocalStorage([],'cliente');
  const { data, clearData } = useAsyncStorage();
  const [online, setOnline] = useState(true)

  const handleSubmitSale = () => {
    console.log(data)
    data.map((venta)=>{
      axios.post(`https://gzapi.onrender.com/venta`, venta.sale,
        {
          headers: {
            Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
          }
        })
        .then(function(response){
          venta.cart.map(item=>{
            axios.post(`https://gzapi.onrender.com/lineaVenta`, 
                {
                    ...item,
                    idVenta: response.data.body._id
                },
                {
                    headers: {
                      Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                    }
                }
            )
            .then(function(r){
                socket.emit('venta', {...response.data.body, cliente: venta.cliente});
                clearData()
                
            })
            .catch(function(error){
                console.log("post",error);
            })
          })
          openAlert("VENTA CREADA EXITOSAMENTE!", '#B6E2A1')
        })
        .catch(function(error){
            console.log("post",error);
        })
    })
  }
  
  useEffect(()=>{
    const socket = io('https://gzapi.onrender.com')
    socket.on('connect', () => {
      setOnline(true)
      openAlert("CONECTADO", '#B6E2A1')
    });
    
    socket.on('disconnect', () => {
      setOnline(false)
      openAlert("DESCONECTADO", '#F7A4A4')
    });
    return () => {
      socket.disconnect();
    };
  },[])

  useEffect(()=>{
    axios.get(`https://gzapi.onrender.com/cliente`,{
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
      }
    })
    .then(function(response){
      saveCliente(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
    axios.get(`https://gzapi.onrender.com/producto`,{
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
      }
    })
    .then(function(response){
      console.log(response.data.body.length)
      saveProducto(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
  },[])

  return (
    <SafeAreaView style={styles.content}>
        <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Bienvenido, {user?.usuario}</Text> 
          <Icon name='notifications-outline' color='#7F8487' size={30} 
          />
        </View>
        <ScrollView  horizontal={true} style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, maxHeight: 110}}>
          <Pressable style={{borderColor: '#d9d9d9d9', borderWidth: 1, padding: 8, margin: 5, borderRadius: 10, width: 100 }}
            onPress={()=>navigation.navigate('NewSale')}
          >
            <MaterialIcons name='point-of-sale' size={35} color='#9E9E9E' style={{textAlign: 'center'}} />
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#9E9E9E', textAlign: 'center' }}>Nueva venta</Text>
          </Pressable>
          <Pressable style={{borderColor: '#d9d9d9d9', borderWidth: 1, padding: 8, margin: 5, borderRadius: 10, width: 100}} 
            onPress={()=>navigation.navigate('Sale')}
          >
            <MaterialIcons name='list-alt' size={35} color='#9E9E9E' style={{textAlign: 'center'}} />
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#9E9E9E', textAlign: 'center' }}>Ventas</Text>
          </Pressable>
          <Pressable style={{borderColor: '#d9d9d9d9', borderWidth: 1, padding: 8, margin: 5, borderRadius: 10, width: 100}} 
            onPress={()=>navigation.navigate('Product')}
          >
            <FeatherIcons name='box' size={35} color='#9E9E9E' style={{textAlign: 'center'}} />
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#9E9E9E', textAlign: 'center' }}>Productos</Text>
          </Pressable>
          <Pressable style={{borderColor: '#d9d9d9d9', borderWidth: 1, padding: 8, margin: 5, borderRadius: 10, width: 100}} 
            onPress={()=>navigation.navigate('Client')}
          >
            <IonIcons name='person-outline' size={35} color='#9E9E9E' style={{textAlign: 'center'}} />
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#9E9E9E', textAlign: 'center' }}>Clientes</Text>
          </Pressable>
        </ScrollView>
        <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, margin: 5}} >
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Estado del servidor : {online ? 'online':'offline'}</Text>
        </View>
        {
          data && 
          <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, margin: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Ventas sin guardar : {data?.length || 0}</Text>
            <Button text={'Enviar'} fontSize={16} width={'30%'} onPress={handleSubmitSale} />
          </View>
        }
      
       <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, margin: 15}} >
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Ventas mes : Enero</Text> 
          <Divider style={{marginVertical: 5, paddingHorizontal: 35}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#FF6D28', fontSize: 16, fontFamily: 'Cairo-Bold' }}>ventas</Text>
              <Text style={{color: '#FF6D28', fontSize: 14, fontFamily: 'Cairo-Regular'}}>{data?.length || 0}</Text>
            </View>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#EEBB4D', fontSize: 16, fontFamily: 'Cairo-Bold' }}>armado</Text>
              <Text style={{color: '#EEBB4D', fontSize: 14, fontFamily: 'Cairo-Regular'}}>78</Text>
            </View>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#B6E2A1', fontSize: 16, fontFamily: 'Cairo-Bold' }}>entregado</Text>
              <Text style={{color: '#B6E2A1', fontSize: 14, fontFamily: 'Cairo-Regular'}}>653</Text>
            </View>
          </View>
        </View>
        <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, flex: 1, margin: 15}} >
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Actividades</Text> 
          <FlatList
            data={[1,3,4,2,5,6,7,8,9,0]}
            renderItem={()=>
            <Text style={{color: '#c9c9c9', fontSize: 14, fontFamily: 'Cairo-Bold' }}>
              #277BC0        Venta agregada : Zurita, Matias          $8952.33
            </Text>
            }
          />
        </View> 
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        height: '100%'
    },
    search : {
        flex: 1
    },
    buttonActive: {
      borderColor: '#fff', 
      borderWidth: 1, 
      paddingHorizontal: 15, 
      paddingVertical: 2, 
      borderRadius: 10, 
      backgroundColor: '#607EAA',
      elevation: 3,
    },
    buttonDisable: {
      color: '#7F8487', 
      paddingHorizontal: 15, 
      paddingVertical: 2, 
      elevation: 3,
    },
    text: {
      fontSize: 18, 
      fontFamily: 'Cairo-Regular', 
    }
})