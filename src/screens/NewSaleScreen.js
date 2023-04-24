import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import ProductCard from '../components/ProductCard';
import CartSale from '../components/CartSale';
import ClientSale from '../components/ClientSale';
import ResumeSale from '../components/ResumeSale';
import SliderSale from '../components/SliderSale';
import Search from '../components/Search';
import AddProduct from '../components/AddProduct';
import ResumeBottomSheet from './../components/ResumeBottomSheet';
import { useInputValue } from '../hooks/useInputValue';
import { useSearch } from '../hooks/useSearch';
import MyBottomSheet from '../components/MyBottomSheet';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
const axios = require('axios').default;


export default function NewSaleScreen() {

  const [openModal, setOpenModal] = useState(false)
  const [itemProduct, setItemProduct] = useState(undefined)
  const [products, setProducts] = useState([])
  const [openBS, setOpenBS] = useState(false)
  const [loading, setLoading] = useState(false)
  const {token} = useAuth()

  const search = useInputValue('','')

  const tag = ["descripcion", "codigoBarra", "marca", "categoria"]/* 

  console.log(products.filter((item)=>item.categoria === "Galletas")) */

  const listProduct = useSearch(search.value, tag, products)

  useEffect(()=>{
    setLoading(true)
    axios.get(`https://gzapi.onrender.com/producto`,
    {
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
      }
    })
    .then(function(response){
      setLoading(false)
      setProducts(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
  },[])

  const addProductCart = (item) => {
    setOpenModal(true)
    if(item) {
      setItemProduct(item)
    }
  }

  if (loading) {
    return <Loading text='Cargando productos'/>
  }

return (
  <SafeAreaView style={styles.content}>
    <View>
      <Text
        style={{
          color: '#9E9E9E',
          paddingVertical: 5,
          paddingHorizontal: 15,
          fontSize: 18 
        }}
      >Nueva venta</Text>
    </View>
    <View style={{paddingHorizontal: 15}} >
      <Search placeholder={'Buscar producto'} 
        searchInput={search}
      />
    </View>
    <FlatList
        data={listProduct}
        style={styles.list}
        renderItem={({item})=>{
          return item && <ProductCard {...item} onClick={addProductCart}/>
        }}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay productos</Text>
        }
    />
    <ResumeBottomSheet onPress={() => setOpenBS(true)} />
    <MyBottomSheet open={openBS} onClose={()=>setOpenBS(false)} height={0} >
      <SliderSale itemSlide={[<CartSale/>, <ClientSale />, <ResumeSale/>]} onCloseSheet={()=>setOpenBS(false)} />
    </MyBottomSheet>
    {
      itemProduct !== undefined && <AddProduct openModal={openModal} onClose={()=>setOpenModal(false)} item={itemProduct} />
    }
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  content: {
      position: 'relative',
      backgroundColor: '#Fff',
      height: '100%'
  },
  icon: {
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 15
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
  text: {
    color: "black",
    fontWeight: "600",
    fontFamily: 'Cairo-Regular'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
})
