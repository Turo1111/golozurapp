import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

export default function InputQty({qty, upQty, downQty, x5, x10, reset, cart}) {
  return (
    <View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#D9D9D9'}}>
            <Pressable style={{marginVertical: 5}} onPress={downQty}>
                <View style={{paddingHorizontal: 20, borderEndWidth: 1, borderColor: '#D9D9D9' }}>
                <Text style={{fontSize: 30, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487'}}>-</Text>
                </View>
            </Pressable>
            <View style={{marginVertical: 5}}>
                <View style={{paddingHorizontal: 10}}>
                <Text style={{fontSize: 30, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487'}}>{qty}</Text>
                </View>
            </View>
            <Pressable style={{marginVertical: 5}} onPress={upQty}>  
                <View style={{paddingHorizontal: 20, borderStartWidth: 1, borderColor: '#D9D9D9'}}>
                <Text style={{fontSize: 30, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487'}}>+</Text>
                </View>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#D9D9D9', borderBottomWidth: 1, borderRadius: 10, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0 }} >
            <Pressable onPress={x5}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487', marginStart: 15}}>+5</Text>
            </Pressable>
            <Pressable onPress={x10}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487', borderColor: '#D9D9D9', borderLeftWidth: 1, borderRightWidth: 1, paddingHorizontal: 10}}>+10</Text>
            </Pressable>
            <Pressable onPress={reset}>
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: cart? '#fff':'#7F8487', marginEnd: 15}}>reset</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

})