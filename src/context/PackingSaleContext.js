import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState, createContext, useEffect, useContext } from 'react'
import { useDate } from '../hooks/useDate'
import { useAlert } from './AlertContext'

export const PackingSaleContext = createContext({
})

export function PackingSaleProvider(props) {
    const {children} = props

    const [listSelected, setListSelected] = useState([])
    const [indexPacking, setIndexPacking] = useState(0)
    const [saleActive, setSaleActive] = useState(listSelected[indexPacking])
    const [qtyMiss, setQtyMiss] = useState([])
    const {openAlert} = useAlert()

    const addDeleteSale = (item) => {

        if(item) {
            const exist = listSelected.some(elem => elem._id === item._id )
            listSelected.length === 0 && changeSale(item)
            !exist ? setListSelected([...listSelected, item]) 
            : setListSelected(listSelected.filter(elem => elem._id !== item._id ))
            
        }
    }

    const nextPacking = ( navigation ) => {
        if(indexPacking === listSelected.length-1) {
            listSelected.map(item=>{
                console.log(item._id)
                axios.patch(`http://10.0.2.2:3000/venta/${item._id}`, {estado: "armado"})
                .then(function(response){
                    openAlert("SE ACTUALIZARON EL ESTADO DE LAS VENTAS!", '#B6E2A1')
                })
                .catch(function(error){
                    console.log("post",error);
                })
            })
            navigation.popToTop()
            setListSelected([])
            setIndexPacking(0)
            changeSale(listSelected[0])
            setQtyMiss([])
            navigation.navigate('Sale')
        }
        else {
            setListSelected(
                listSelected.map(elem => elem._id === saleActive._id ? elem = saleActive : elem)
            )
            changeSale(listSelected[indexPacking+1])
            /* setSaleActive(listSelected[indexPacking+1]) */
            setIndexPacking(indexPacking+1)
            setQtyMiss([])
        }
    }

    const afterPacking = ( navigation ) => {
        if(indexPacking === 0) {
            navigation.goBack()
        }
        else {
            changeSale(listSelected[indexPacking-1])
            /* setSaleActive(listSelected[indexPacking-1]) */
            setIndexPacking(indexPacking-1)
        }
    }

    const nextShipping = (navigation) => {
        
        axios.patch(`http://10.0.2.2:3000/venta/${saleActive._id}`, {estado: "entregado"})
                .then(function(response){
                    openAlert("SE ACTUALIZO EL ESTADO DE LAS VENTA!", '#B6E2A1')
                })
                .catch(function(error){
                    console.log("post",error);
                })

        setListSelected(
            listSelected.map(elem => elem._id === saleActive._id ? elem = saleActive : elem)
        )
        changeSale(listSelected[indexPacking+1])
        setIndexPacking(indexPacking+1)
        setQtyMiss([])
        if(indexPacking === listSelected.length-1) {
            console.log("esto",listSelected[0])
            navigation.popToTop()
            setListSelected([])
            setIndexPacking(0)
            changeSale(listSelected[0])
            setQtyMiss([])
            navigation.navigate('Sale')
        }
    }

    const holdShipping = (navigation) => {
        console.log("posponer")
    }

    const editQty = (item) => {

        const lineaVenta = saleActive.lineaVenta.map(prd=> prd.idProduct === item.idProduct ? prd = item : prd )
        const total = lineaVenta.reduce( (accumulator, currentValue) => {
            return (parseFloat(accumulator) + parseFloat(currentValue.total)).toFixed(2)
        }, 0)
        
        setSaleActive({
            ...saleActive,
            lineaVenta : lineaVenta,
            total: total
        })
    }

    const deleteItemCart = (item) => {
        setCart(cart.filter(obj => item.idProduct !== obj.idProduct))
    }

    const qtyChange = (id) => {

        qtyMiss.includes(id) ?  setQtyMiss(qtyMiss.filter(item => item !== id)) : setQtyMiss([...qtyMiss, id])

    }

    const changeSale = (sale) => {
        console.log(sale)
        if(sale){
            axios.get(`http://10.0.2.2:3000/lineaVenta/${sale._id}`)
                .then(function(response){
                    setSaleActive({...sale , lineaVenta: response.data.body})
                })
                .catch(function(error){
                    console.log("error aqui ",error);
                })
        }else{
            setSaleActive(undefined)
        }
    }

    const startPacking = (navigation) => {
        listSelected.some(item=>item.estado !== "pendiente") ? 
        openAlert("SOLO VENTAS CON ESTADO PENDIENTE !", '#F7A4A4')
        :
        navigation.navigate('Packing')
    }
    const startShipping = (navigation) => {
        listSelected.some(item=>item.estado !== "armado") ? 
        openAlert("SOLO VENTAS CON ESTADO ARMADO !", '#F7A4A4')
        :
        navigation.navigate('Shipping')
    }

    const valueContext = {
        listSelected,
        addDeleteSale,
        indexPacking,
        nextPacking,
        afterPacking,
        editQty,
        deleteItemCart,
        saleActive,
        qtyMiss,
        qtyChange,
        nextShipping,
        holdShipping,
        startPacking,
        startShipping
    }

    return <PackingSaleContext.Provider value={valueContext}>{children}</PackingSaleContext.Provider>

}

export function usePacking() {
    return useContext(PackingSaleContext);
  }