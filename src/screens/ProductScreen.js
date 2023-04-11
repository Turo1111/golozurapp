import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
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
import MyBottomSheet from '../components/MyBottomSheet'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/Ionicons'
import EditIcon from 'react-native-vector-icons/AntDesign'
import InfoProduct from '../components/InfoProduct'
import EditProduct from '../components/EditProduct'
import getEnvVars from '../../env'
import axios from 'axios'

const io = require('socket.io-client')

const socket = io('http://10.0.2.2:3000')

export default function ProductScreen() {

  const bottomSheet = useRef();

  const [data, setData] = useState([])
  const [newProduct, setNewProduct] = useState(false)
  const [openBS, setOpenBS] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const {openAlert} = useAlert()
  const [infoProduct, setInfoProduct] = useState(undefined)

  const search = useInputValue('','')

  const tag = ["descripcion", "codigoBarra", "marca", "categoria"]

  const listProduct = useSearch(search.value, tag, data)

  const { URL_BD } = getEnvVars();

  console.log(URL_BD)

  fetch(`${URL_BD}/producto`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  useEffect(()=>{
    axios.get(`${URL_BD}/producto`)
    .then(function(response){
      console.log('entre aqui')
      console.log(response.data.body)
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
        <Button text={'Nuevo'} fontSize={14} width={'30%'} onPress={()=>{
          setOpenBS(true)
          setInfoProduct(undefined)
        }} />
      </View>
      <View style={{paddingHorizontal: 15}}>
        
        <SwipeListView
          data={listProduct}
          renderItem={({item})=><ProductCard {...item} />}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
          }
          renderHiddenItem={
            (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity
                        style={[styles.backRightBtn, {backgroundColor: '#607EAA'}]}
                        onPress={()=>{
                          setInfoProduct(data.item)
                          setOpenInfo(true)
                        }}
                    >
                       <Icon name='information-circle-outline' color='#fff' size={50}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight, {backgroundColor: '#F39D0B', width: 80}]}
                        onPress={()=>{
                          setInfoProduct(data.item)
                          setOpenEdit(true)
                        }}
                    >
                        <EditIcon color={'#fff'} size={40} name='edit' />
                    </TouchableOpacity>
                </View>
            )
          }
          style={[styles.list, {paddingHorizontal: 15, borderWidth: 1, borderColor: '#9e9e9e', borderRadius: 15}]}
          rightOpenValue={-78}
          leftOpenValue={100}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
      <MyBottomSheet open={openBS} onClose={()=>setOpenBS(false)} height={510} >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <NewProduct onClose={()=>setOpenBS(false)} />
        </View>
      </MyBottomSheet>
      <MyBottomSheet open={openEdit} onClose={()=>setOpenEdit(false)} height={510} >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <EditProduct  item={infoProduct}/>
        </View>
      </MyBottomSheet>
      <MyBottomSheet open={openInfo} onClose={()=>setOpenInfo(false)} height={380} >
        <InfoProduct item={infoProduct} />
      </MyBottomSheet>
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
    rowFront: {
      backgroundColor: '#fff',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100
    },
    backRightBtnRight: {
        backgroundColor: '#607EAA',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
})


