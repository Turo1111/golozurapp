import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
import { ClientCard } from '../components/ClientSale'
import NewClient from '../components/NewClient'
import { useFonts } from '@expo-google-fonts/inter'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/Ionicons'
import EditIcon from 'react-native-vector-icons/AntDesign'
import InfoClient from '../components/InfoClient'
import EditClient from '../components/EditClient'
import Loading from '../components/Loading'
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')

export default function ClientScreen() {

  const [open, setOpen] = React.useState(false)

  const bottomSheet = useRef();

  const [data, setData] = useState([])
  const [newClient, setNewClient] = useState(false)
  const [openBS, setOpenBS] = useState(false)
  const [infoClient, setInfoClient] = useState(undefined)
  const [openInfo, setOpenInfo] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const {openAlert} = useAlert()

  const search = useInputValue('','')

  const tag = ["descripcion", "codigoBarra", "marca", "categoria"]

  const listClient = useSearch(search.value, tag, data)

  useEffect(()=>{
    setLoading(true)
    axios.get(`https://gzapi.onrender.com/cliente`)
    .then(function(response){
      setLoading(false)
      setData(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
  },[newClient])

  useEffect(()=>{
    socket.on('cliente', (cliente) => {
      setNewClient(!newClient)
      openAlert("NUEVO CLIENTE AGREGADO", "#B6E2A1")
    })
  },[])

  if (loading) {
    return <Loading text='Cargando clientes'/>
  }

  return (
    <View style={styles.content}>
      <View style={{paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center'}} >
        <Search placeholder={'Buscar cliente'} width={'65%'} searchInput={search} />
        <Button text={'Nuevo'} fontSize={14} width={'30%'} onPress={()=>setOpenBS(true)} />
      </View>
      <View style={{paddingHorizontal: 15}}>
      <SwipeListView
          data={listClient}
          renderItem={({item})=><ClientCard item={item} onPress={()=>setInfoClient(item)} />}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
          }
          renderHiddenItem={
            (data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity
                        style={[styles.backRightBtn, {backgroundColor: '#607EAA'}]}
                        onPress={()=>{
                          setInfoClient(data.item)
                          setOpenInfo(true)
                        }}
                    >
                       <Icon name='information-circle-outline' color='#fff' size={50}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight, {backgroundColor: '#F39D0B', width: 80}]}
                        onPress={()=>{
                          setInfoClient(data.item)
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
      <MyBottomSheet open={openBS} onClose={()=>setOpenBS(false)} height={260} >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <NewClient onClose={()=>setOpenBS(false)} />
        </View>
      </MyBottomSheet>
      <MyBottomSheet open={openInfo} onClose={()=>setOpenInfo(false)} height={210} >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <InfoClient onClose={()=>setOpenInfo(false)} item={infoClient} />
        </View>
      </MyBottomSheet>
      <MyBottomSheet open={openEdit} onClose={()=>setOpenEdit(false)} height={295} >
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <EditClient onClose={()=>setOpenEdit(false)} item={infoClient} />
        </View>
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


