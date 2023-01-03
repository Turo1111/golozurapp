import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Search from '../components/Search'
import Slider from 'react-native-vector-icons/FontAwesome'
import ListSale from '../components/ListSale'
import ItemSale from '../components/ItemSale'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import BottomSheet from "react-native-gesture-bottom-sheet";
import NewProduct from '../components/NewProduct'
import Modal from '../components/Modal'
import { useAlert } from '../context/AlertContext'
import { useInputValue } from '../hooks/useInputValue'
import { useSearch } from '../hooks/useSearch'
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('http://10.0.2.2:3000')

export default function ProductScreen() {

  const bottomSheet = useRef();

  const [data, setData] = useState([])
  const [newProduct, setNewProduct] = useState(false)
  const {openAlert} = useAlert()

  const search = useInputValue('','')

  const tag = ["descripcion", "codigoBarra", "marca", "categoria"]

  const listProduct = useSearch(search.value, tag, data)

  useEffect(()=>{
    axios.get(`http://10.0.2.2:3000/producto`)
    .then(function(response){
      setData(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
  },[newProduct])

  useEffect(()=>{
    socket.on('producto', (producto) => {
      setData([...data, producto])
      setNewProduct(!newProduct)
      openAlert("NUEVO PRODUCTO AGREGADO", "#B6E2A1")
    })
  },[])

  return (
    <View style={styles.content}>
      <View style={{paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center'}} >
        <Search placeholder={'Buscar producto'} width={'65%'} searchInput={search} />
        <Button text={'Nuevo'} fontSize={15} width={'30%'} onPress={()=>bottomSheet.current.show()} />
      </View>
      <View style={{paddingHorizontal: 15}}>
        
        <FlatList
          data={listProduct}
          style={styles.list}
          renderItem={({item})=><ProductCard {...item} />}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
          }
        />
      </View>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={430} sheetBackgroundColor={'#fff'}  >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <NewProduct onClose={()=>bottomSheet.current.close()} />
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 30,
        backgroundColor: '#fff',
        height: '100%'
    },
    list: {
      paddingHorizontal: 15,
      marginHorizontal: 15,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 15,
      marginVertical: 5,
      height: '80%'
    },
})


