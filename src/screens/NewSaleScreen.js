import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import ProductCard from '../components/ProductCard';
import { useFonts } from '@expo-google-fonts/inter';
import { SafeAreaView, TouchableOpacity } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
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
const axios = require('axios').default;


export default function NewSaleScreen() {

  const bottomSheet = useRef();
  const [openModal, setOpenModal] = useState(false)
  const [itemProduct, setItemProduct] = useState(undefined)
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [openBS, setOpenBS] = useState(false)


  const search = useInputValue('','')

  const tag = ["descripcion", "codigoBarra", "marca", "categoria"]

  const listProduct = useSearch(search.value, tag, products)

  useEffect(()=>{
    axios.get(`http://10.0.2.2:3001/producto`)
    .then(function(response){
      setProducts(response.data.body)
    })
    .catch(function(error){
        console.log("get ",error);
    })
  },[])

  useEffect(()=>{
    axios.get(`http://10.0.2.2:3000/cliente`)
    .then(function(response){
      setClients(response.data.body)
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

return (
  <View style={styles.content}>
    <View>
      <Text
        style={{
          color: '#9E9E9E',
          paddingVertical: 5,
          paddingHorizontal: 15 
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
      <SliderSale itemSlide={[<CartSale/>, <ClientSale data={clients} />, <ResumeSale/>]} onCloseSheet={()=>setOpenBS(false)} />
    </MyBottomSheet>
    {
      itemProduct !== undefined && <AddProduct openModal={openModal} onClose={()=>setOpenModal(false)} item={itemProduct} />
    }
  </View>
)
}

const styles = StyleSheet.create({
  content: {
      marginTop: 30,
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

const products = [
  {
    id: 1,
    descripcion: "Galletas Mediatarde x3",
    stock: 999,
    codigoBarra: "546463446836468968",
    peso: {
      cantidad: 45,
      unidad: "gr"
    },
    sabor: "",
    precioCompra: 212.25,
    precioUnitario: 250.50,
    categoria: "Galletas",
    marca: "LIA",
    proveedor: "EFEY SRL"
  },
  {
    id: 2,
    descripcion: "Galleta Oreo",
    stock: 999,
    codigoBarra: "5464697854628968",
    peso: {
      cantidad: 52,
      unidad: "gr"
    },
    sabor: "Chocolate y vainilla",
    precioCompra: 50.99,
    precioUnitario: 75.99,
    categoria: "Galletas",
    marca: "Nabisco",
    proveedor: "EFEY SRL"
  },
  {
    id: 3,
    descripcion: "Baggio Pronto",
    stock: 999,
    codigoBarra: "5464663455211968",
    peso: {
      cantidad: 1,
      unidad: "lt"
    },
    sabor: "Durazno",
    precioCompra: 100.99,
    precioUnitario: 125.36,
    categoria: "Jugos",
    marca: "Baggio",
    proveedor: "EFEY SRL"
  },
  {
    id: 4,
    descripcion: "HAMLET",
    stock: 999,
    codigoBarra: "546466344211551968",
    peso: {
      cantidad: 25,
      unidad: "gr"
    },
    sabor: "Blanco y cookies",
    precioCompra: 26.38,
    precioUnitario: 38.96,
    categoria: "Chocolates",
    marca: "HAMLET",
    proveedor: "EFEY SRL"
  }
]