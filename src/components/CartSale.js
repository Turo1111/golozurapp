import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import useCart from '../hooks/useCart'
import { SwipeListView } from 'react-native-swipe-list-view'
import { TouchableOpacity } from 'react-native';
import InputQty from './InputQty'
import RenderHiddenItem from './RenderHiddenItem'


export default function CartSale() {

  const { cart, totalCart, editQty, deleteItemCart } = useCart()
  const [rowClose, setRowClose] = useState(false)

  return (
    <View>
      <Text style={styles.title}>Linea de venta</Text>
      <SwipeListView
       data={cart}
       style={[styles.list, {paddingHorizontal: 10, height: '84%', marginVertical: 5}]}
       renderItem={({item})=><ProductCard {...item} onClick={()=>console.log("cartsale productcard")} cart={true} />}
       renderHiddenItem={({item})=><RenderHiddenItem item={item} rowClose={rowClose} editQty={editQty} deleteItemCart={deleteItemCart} />}
       rightOpenValue={-200}
       leftOpenValue={78}
       previewRowKey={'0'}
       previewOpenValue={-40}
       previewOpenDelay={3000}
       onRowOpen={()=>setRowClose(false)}
       onRowClose={()=>setRowClose(true)}
       ListEmptyComponent={
        <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
        }
       />
       <View style={styles.total}>
          <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>{cart.length || 0}</Text>
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', fontWeight: '600', color: '#7F8487' }}>Productos</Text>
          <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', fontWeight: '800', color: '#7F8487' }}>${totalCart || 0}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Cairo-Regular',
        color: '#7F8487'
    },
    total: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#d7d7d7',
        borderTopWidth: 1
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