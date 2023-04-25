import { Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import ProductCard from './ProductCard';
import Icon from 'react-native-vector-icons/Ionicons'
import RenderHiddenItem from './RenderHiddenItem';
import { usePacking } from '../context/PackingSaleContext';

export default function PackingSaleCard({length}) {

    const {indexPacking, saleActive, editQty, qtyMiss, qtyChange, deleteItemCart } = usePacking()

    const [filterSale, setFilterSale] = React.useState(saleActive?.lineaVenta)
    const [filterActive, setFilterActive] = React.useState('')
    const [rowClose, setRowClose] = React.useState(false)

    const onFilterActive = (item) => {
        if(filterActive === item) setFilterActive('')
        if(filterActive === '' || filterActive !== item) setFilterActive(item)
    }

    React.useEffect(()=>{
        if(filterActive !== '') setFilterSale(saleActive?.lineaVenta.filter(item=> item.categoria.toLowerCase() === filterActive && item.estado !== 'entregado'))
        if(filterActive === '') setFilterSale(saleActive?.lineaVenta.filter(item=> item.estado !== 'entregado'))
    },[filterActive, saleActive])

  return (
    <View style={{height: '90%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical:5}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>Armado de pedido</Text>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>{indexPacking+1} de {length} pedidos</Text>
        </View>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 16}}>Numero de venta : #{saleActive?._id}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 15}}>Cliente:   {saleActive?.cliente.apellido}, {saleActive?.cliente.nombre}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 15}}>Direccion:   {saleActive?.cliente.direccion[0].calle} {saleActive?.cliente.direccion[0].numero}, {saleActive?.cliente.direccion[0].ciudad}</Text>
        <View style={{borderBottomColor: '#d9d9d9', borderBottomWidth: 1, marginHorizontal: '20%', marginTop: 10, marginBottom: 5}}/>
        <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginStart: 15 }}>Categorias:</Text>
        <ScrollView  horizontal={true} style={{flex: 1, marginStart: 15, marginVertical: 5, maxHeight: 32}} >
          {
              ['galletas', 'jugos', 'snacks', 'chocolates', 'congelados'].map(item=>(
                    <Pressable key={item} onPress={()=>onFilterActive(item)}>
                        <Text style={[styles.state, 
                            {
                                borderColor: filterActive === item ? '#2366CB' : '#d9d9d9',
                                color: filterActive === item ? '#2366CB' : '#7F8487',
                            }]}
                        >
                            {item}
                        </Text>
                    </Pressable>
              ))
          }
        </ScrollView>
        <SwipeListView
          data={filterSale}
          style={styles.list}
          renderItem={
              ({item})=>(
                  <TouchableHighlight
                      style={styles.rowFront}
                      underlayColor={'#AAA'}
                  >
                      <ProductCard {...item} cart={true} onLongPress={()=>qtyChange(item._id)} />
                  </TouchableHighlight>
              )
          }
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
        <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginEnd: 15, textAlign: 'right' }}>{qtyMiss.length} agregado de {saleActive?.lineaVenta.filter(item=>item.estado !== "entregado").length}</Text>
        <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#9E9E9E', marginEnd: 15, textAlign: 'right' }}>Total: ${saleActive?.total}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
    state: {
        fontSize: 18, 
        fontFamily: 'Cairo-Regular', 
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        color: '#9E9E9E',
        borderColor: '#9e9e9e',
        height: 25
    },
    list: {
      paddingHorizontal: 15,
      marginHorizontal: 15,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 15,
      marginVertical: 15,
      flex:1
    },
})