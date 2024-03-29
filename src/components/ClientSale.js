import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from './Search'
import useCart from '../hooks/useCart'
import { useSearch } from '../hooks/useSearch'
import { useInputValue } from '../hooks/useInputValue'
import axios from 'axios'
import Loading from './Loading'
import { useAuth } from '../context/AuthContext'
import useLocalStorage from '../hooks/useLocalStorage'

export const ClientCard = ({item, onPress}) =>{

  return(
    <Pressable style={{paddingStart: 5, paddingVertical: 5, width: '100%', backgroundColor: '#fff'}} onPress={()=>onPress(item)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.apellido} , {item?.nombre}</Text>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: item?.estado === "En forma" ? '#6BCB77' : '#F39D0B'}}>{item?.estado || "Sin estado"}</Text>
        </View>
        <View style={{}}>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.direccion[0]?.calle || "No definido"} {item?.direccion[0]?.numero} , {item?.direccion[0]?.ciudad || "No definido"}</Text>
        </View>
        <View style={{}}>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.telefono || "No definido"}</Text>
        </View>
        <View style={{borderBottomColor: '#d9d9d9', borderBottomWidth: 1, marginHorizontal: '10%', marginTop: 5}} ></View>
    </Pressable>
  )
}


const ClientSale = ({}) => {

  const {addClientCart, client} = useCart()
  const search = useInputValue('','')
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const {token} = useAuth()
  const {data: clienteLocalStorage} = useLocalStorage([],'cliente')

  const listClient = useSearch(search.value, ["nombre", "apellido"], data)

  React.useEffect(()=>{
    setLoading(true)
    axios.get(`https://gzapi.onrender.com/cliente`,{
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
      }
    })
    .then(function(response){
      setData(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
        setData(clienteLocalStorage)
    })
    .finally(()=>setLoading(false))
  },[clienteLocalStorage, token])

  if (loading) {
    return <Loading text='Cargando clientes'/>
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Elegir cliente</Text>
      <View style={styles.search}>
        <Search placeholder={'Buscar cliente'} searchInput={search} />
      </View>
      <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, flex: 1}} >
        <FlatList
            data={listClient}
            renderItem={({item})=><ClientCard item={item}  onPress={(item)=>addClientCart(item)}/>}
        />
      </View>
      <View style={{borderBottomColor: '#d9d9d9', borderBottomWidth: 1, marginHorizontal: '10%', marginTop: 5}} ></View>
      <View style={{paddingHorizontal: 25}}>
        {client !== undefined && <ClientCard item={client}/>}
      </View> 
    </View>
  )
}

export default ClientSale

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Cairo-Regular',
        color: '#7F8487'
    },
    search : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '60%'
    },
    button: {
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#277BC0',
      },
    list: {
      paddingHorizontal: 15,
      marginHorizontal: 15,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 15,
      marginVertical: 15,
    },
})
