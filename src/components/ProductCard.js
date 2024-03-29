import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usePacking } from '../context/PackingSaleContext';

export default function ProductCard({_id, idProduct, descripcion, stock, peso, precioUnitario, sabor, categoria, cantidad, total, estado, onClick=()=>console.log(""), cart, onLongPress}) {

    const item = {_id, descripcion, stock, peso, precioUnitario, sabor}

    const {qtyMiss} = usePacking()

  return (      
      <Pressable style={{paddingVertical: 5, borderBottomColor: '#d9d9d9', borderBottomWidth: 1, backgroundColor: qtyMiss.includes(_id) ? '#d9d9d9' : '#fff'}} onPress={()=>onClick(item)} onLongPress={onLongPress} >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Text style={{fontSize: 20, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>{descripcion || "undefined"} </Text>
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>{peso?.cantidad || ""} {peso?.unidad || ""}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>#{_id || idProduct || "undefined"}</Text>
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: estado === "entregado" ? '#6BCB77' : '#F39D0B'}}>{estado || ""}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>sabor: {sabor || "undefined"}</Text> */}
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>Categoria: {categoria || "undefined"}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>
                {cart ? cantidad : stock} unidades
                </Text>
              <Text style={{fontSize: 16, fontFamily: 'Cairo-Bold', color: '#7F8487'}}>${cart ? total : precioUnitario}</Text>
          </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
})