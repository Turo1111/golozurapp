import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useFonts } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import ListSale from '../components/ListSale';
import Button from '../components/Button';
import Search from '../components/Search';
import FilterIcon from 'react-native-vector-icons/FontAwesome'
import ModalFilterSale from '../components/ModalFilterSale';
import { usePacking } from '../context/PackingSaleContext';
import { useInputValue } from '../hooks/useInputValue';
import { useSearch } from '../hooks/useSearch';
import Loading from '../components/Loading';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')

export default function SaleScreen() {

    const navigation = useNavigation()
    const [filterActive, setFilterActive] = React.useState('')
    const [filterSale, setFilterSale] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [newSale, setNewSale] = useState(false)
    const [loading, setLoading] = useState(false)
    const {startPacking, startShipping} = usePacking()
    const search = useInputValue('','')
    const tag = [{"cliente": ["nombre", "apellido"]}, "total"]
    const listSale = useSearch(search.value, tag, filterSale)
    const {openAlert} = useAlert()
    const {token} = useAuth()

    useEffect(()=>{
      setLoading(true)
      axios.get(`https://gzapi.onrender.com/venta`,
      {
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
        }
      })
      .then(function(response){
        setLoading(false)
        setFilterSale(response.data.body)
      })
      .catch(function(error){
          console.log("get ",error);
      })
    },[newSale])

    /* useEffect(()=>console.log("lista sale 1",filterSale.length),[filterSale]) */

    useEffect(()=>{
      const socket = io('https://gzapi.onrender.com')
      socket.on('venta', (venta) => {
        setFilterSale((prevData)=>{
          const exist = prevData.find(elem => elem._id === venta._id )
          if (exist) {
            // Si existe, actualizamos sus valores sin perder los demás
            openAlert("VENTA MODIFICADA", "#B6E2A1")
            return prevData.map((item) =>
              item._id === venta._id ? venta : item
            )
          } else {
            // Si no existe, agregamos el nuevo producto a la lista
            openAlert("NUEVA VENTA AGREGADA", "#B6E2A1")
            return [...prevData, venta]
          }
        })
      })
      return () => {
        socket.disconnect();
      };
      
    },[])

    const onFilterActive = (item) => {
        if(filterActive === item) setFilterActive('')
        if(filterActive === '' || filterActive !== item) setFilterActive(item)
    }

    React.useEffect(()=>{
        if(filterActive !== '') setFilterSale(filterSale.filter(item=> item.estado === filterActive))
        if(filterActive === '') setFilterSale(filterSale)
    },[filterActive])

    const {listSelected} = usePacking()

    if (loading) {
      return <Loading text='Cargando ventas'/>
    }

  return (
    <View style={styles.content}>
      <View style={{paddingHorizontal: 15}} >
        <Search placeholder={'Buscar venta'} width={'auto'} searchInput={search} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
        <Button text={`Armado ${listSelected.length !== 0 ? listSelected.length : ""}`} onPress={()=>startPacking(navigation)} disabled={listSelected.length === 0 ? true : false}/>
        <Button text={`Entrega ${listSelected.length !== 0 ? listSelected.length : ""}`} onPress={()=>startShipping(navigation)}  disabled={listSelected.length === 0 ? true : false}/>
      </View>
      <ListSale height='75%' listSale={listSale} />
      <ModalFilterSale 
        openModal={openModal} onClose={()=>setOpenModal(false)}
        filterActive={filterActive}
        onFilterActive={onFilterActive}
       />
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        height: '100%',
        flex: 1,
        paddingVertical: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        padding: 10,
        borderRadius: 10,
        width: '60%'
    },
    button: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#277BC0',
    },
    
})
