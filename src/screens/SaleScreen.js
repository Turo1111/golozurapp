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
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('http://10.0.2.2:3000')

export default function SaleScreen() {

    const navigation = useNavigation()
    const [filterActive, setFilterActive] = React.useState('')
    const [filterSale, setFilterSale] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [newSale, setNewSale] = useState(false)
    const {startPacking, startShipping} = usePacking()
    const search = useInputValue('','')
    const tag = [{"cliente": ["nombre", "apellido"]}, "total"]
    const listSale = useSearch(search.value, tag, filterSale)
    console.log(filterSale[0])

    useEffect(()=>{
      axios.get(`http://10.0.2.2:3000/venta`)
      .then(function(response){
        setFilterSale(response.data.body)
      })
      .catch(function(error){
          console.log("get ",error);
      })
    },[newSale])

    useEffect(()=>{
      socket.on('venta', (venta) => {
        console.log(venta)
        setNewSale(!newSale)
      })
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

    let [fontsLoaded] = useFonts({
        'Cairo-Regular': require('../../assets/fonts/Cairo-Regular.ttf'),
        'Cairo-Light': require('../../assets/fonts/Cairo-Light.ttf'),
        'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
      })
    
      if (!fontsLoaded) {
        return null;
      }

      

  return (
    <View style={styles.content}>
      <View style={{paddingHorizontal: 15}} >
        <Search placeholder={'Buscar venta'} width={'auto'} searchInput={search} />
      </View>
      {/* <Pressable style={{flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15}}  onPress={()=>setOpenModal(true)} >
        <FilterIcon name='sliders' size={22} color={'#7F8487'}/>
        <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginStart: 15 }}>Filtros</Text>
      </Pressable> */}
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
        marginTop: 30,
        backgroundColor: '#fff',
        height: '100%'
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
