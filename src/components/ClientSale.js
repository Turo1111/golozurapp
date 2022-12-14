import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Search from './Search'
import useCart from '../hooks/useCart'
import { useSearch } from '../hooks/useSearch'
import { useInputValue } from '../hooks/useInputValue'

export const ClientCard = ({item, onPress}) =>(
    <Pressable style={{paddingStart: 5, paddingVertical: 5, width: '100%'}} onPress={()=>onPress(item)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.apellido} , {item?.nombre}</Text>
            <Text style={{fontSize: 12, fontFamily: 'Cairo-Bold', color: item?.estado === "En forma" ? '#6BCB77' : '#F39D0B'}}>{item?.estado}</Text>
        </View>
        <View style={{}}>
            <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.direccion.calle}{item?.direccion.numero} , {item?.direccion.ciudad}</Text>
        </View>
        <View style={{}}>
            <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{item?.telefono}</Text>
        </View>
        <View style={{borderBottomColor: '#d9d9d9', borderBottomWidth: 1, marginHorizontal: '10%', marginTop: 5}} ></View>
    </Pressable>
)

const ClientSale = ({data}) => {

  const {addClientCart, client} = useCart()
  const search = useInputValue('','')

  const listClient = useSearch(search.value, ["nombre", "apellido"], data)

  return (
    <View>
      <Text style={styles.title}>Elegir cliente</Text>
      <View style={styles.search}>
        <Search placeholder={'Buscar cliente'} searchInput={search} />
      </View>
      <FlatList
          data={listClient}
          style={[styles.list, {paddingHorizontal: 10, height: '65%', marginVertical: 5}]}
          renderItem={({item})=><ClientCard item={item}  onPress={(item)=>addClientCart(item)}/>}
      />
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
        fontSize: 18,
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
      marginVertical: 15
    },
})
