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
    <View style={{height: '100%', width: '100%', paddingHorizontal: 15, paddingBottom: 25}} >
            {
                itemSlide.map((item,index) => index === indexActive && <View style={{height: '91%', marginVertical: 0}} key={index}>{item}</View>)
            }
        <View style={{flex: 1, justifyContent: 'flex-end'}} >
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