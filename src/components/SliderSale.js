import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import useCart from '../hooks/useCart'
import { useNavigation } from '@react-navigation/native'

export default function SliderSale({itemSlide=[1,2,3], onCloseSheet}) {

    const [indexActive, setIndexActive] = useState(0)

    const {cart, client, totalCart, finishSale} = useCart()

    const upSlide = () => {
        indexActive < (itemSlide.length-1) && setIndexActive(indexActive+1)
    }

    const downSlide = () => {
        indexActive > 0 && setIndexActive(indexActive-1)
    }

  return (
    <View style={{paddingHorizontal: 15, paddingBottom: 10, flex: 1}} >
        <View style={{flex: 1, paddingBottom: 15}} >
            {
                itemSlide.map((item,index) => index === indexActive && <View style={{flex: 1}}  key={index}>{item}</View>)
            }
        </View>
        {/*      */}
        <View >
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button text={'Volver'} onPress={()=>downSlide()} backgroundColor={indexActive===0 && '#d9d9d9'}  />
                {
                    indexActive < (itemSlide.length-1) ? <Button text={'Siguiente'} onPress={()=>upSlide()}/> :
                    <Button text={'Terminar'} onPress={()=>{
                        finishSale(onCloseSheet)
                    }}/>
                }
                
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Cairo-Regular',
        color: '#7F8487'
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
    }
})