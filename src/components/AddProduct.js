import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from './Button'
import { CheckBox } from '@rneui/themed';
import InputQty from './InputQty';
import useCart from '../hooks/useCart';

export default function AddProduct({openModal, onClose, item}) {

  const [total, setTotal] = useState(item.precioUnitario)
  const [qty, setQty] = useState(1)
  const [dropProduct, setDropProduct] = useState(false)
  const { addItemCart } = useCart()

  useEffect(()=>{
    qty === 1 ? setTotal((item.precioUnitario).toFixed(2)) : setTotal((qty*item.precioUnitario).toFixed(2))
  },[qty])

  useEffect(()=>{
    qty === 1 && setTotal(item.precioUnitario)
  })

  const addProduct = () => {
    const product = {
      idProducto: item._id,
      descripcion: item.descripcion,
      peso: item.peso,
      sabor: item.sabor,
      precioUnitario: item.precioUnitario,
      cantidad: qty,
      modificado: false,
      total,
      estado: dropProduct ? 'entregado' : 'sin entregar'
    }

    addItemCart(product)
    setQty(1)
    setTotal(item?.precioUnitario)
    setDropProduct(false)
    onClose()
  }

  const reset = ( ) => {
    setQty(1)
    setTotal(item.precioUnitario)
    setDropProduct(false)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={onClose}
    >
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(217,217,217,0.7)'}}>
        <View style={styles.modalView} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', color: '#9E9E9E'}}>{item?.descripcion || "undefined"}</Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#9E9E9E'}}>{item?.peso?.cantidad || "undefined"} {item?.peso?.unidad  || "undefined"}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E'}}>#{item?._id || "undefined"}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between'}}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#9E9E9E'}}><Text style={{fontFamily: 'Cairo-Bold', color: '#9E9E9E'}}>{item?.stock || "undefined"}</Text> unidades</Text>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#9E9E9E'}}>${item?.precioUnitario || "undefined"} u.</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
              <InputQty 
                qty={qty} 
                upQty={()=> setQty(qty+1)}
                downQty={()=> {qty > 1 && setQty(qty-1)}}
                x5={()=>setQty(qty+5)}
                x10={()=>setQty(qty+10)}
                reset={reset}
              />
              <View style={{}}>
                <Text style={{fontSize: 20, fontFamily: 'Cairo-Bold', color: '#7F8487', textAlign: 'center', marginBottom: 15}}>${total}</Text>
              </View>
            </View>
            <CheckBox
              center
              title={<Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>Entrega inmediata</Text>}
              checked={dropProduct}
              onPress={() => setDropProduct(!dropProduct)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
              <Button text={'Cancelar'} onPress={onClose} />
              <Button text={'Aceptar'} onPress={addProduct} />
            </View>
            
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalView: {
        marginHorizontal: 10,
        marginTop: '50%',
        width: '95%',
        margin: 1,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

