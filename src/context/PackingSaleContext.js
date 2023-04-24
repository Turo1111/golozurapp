import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState, createContext, useEffect, useContext } from 'react'
import { useDate } from '../hooks/useDate'
import { useAlert } from './AlertContext'
import { useLoading } from './LoadingContext'
import { useAuth } from './AuthContext'
const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')


export const PackingSaleContext = createContext({
})

export function PackingSaleProvider(props) {
    const {children} = props

    const [listSelected, setListSelected] = useState([])
    const [indexPacking, setIndexPacking] = useState(0)
    const [saleActive, setSaleActive] = useState(listSelected[indexPacking])
    const [qtyMiss, setQtyMiss] = useState([])
    const {openAlert} = useAlert()
    const  {setOpen} = useLoading()
    const {token} = useAuth()

    //para agregar o quitar ventas a la lista seleccionada

    const addDeleteSale = (item) => {
        if(item) {
            const exist = listSelected.some(elem => elem._id === item._id ) // preg si existe
            listSelected.length === 0 && changeSale(item)  //si no hay elementos en la lista llamo a esta funcion para traer los productos de la venta
            //se agrega si no existe o se elimina si existe
            !exist ? setListSelected([...listSelected, item]) 
            : setListSelected(listSelected.filter(elem => elem._id !== item._id ))
        }
    }

    //

    const nextPacking = ( navigation ) => {
        if(indexPacking === listSelected.length-1) {
            setOpen(true)
            listSelected.map(item=>{
                axios.patch(`https://gzapi.onrender.com/venta/${item._id}`, {estado: "armado"},
                {
                    headers: {
                      Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                    }
                  })
                .then(function(response){
                    openAlert("SE ACTUALIZARON EL ESTADO DE LAS VENTAS!", '#B6E2A1')
                    socket.emit('venta', {...item,estado: "armado"});
                    setOpen(false)
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

            setOpen(true)
            setListSelected(
                listSelected.map(elem => elem._id === saleActive._id ? elem = saleActive : elem)
            )
            setOpen(false)
            changeSale(listSelected[indexPacking+1])
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
        if(indexPacking === listSelected.length-1) {
            setOpen(true)
            listSelected.map(item=>{
                axios.patch(`https://gzapi.onrender.com/venta/${item._id}`, {estado: "entregado"},
                {
                    headers: {
                      Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                    }
                  })
                .then(function(response){
                    openAlert("SE ACTUALIZARON EL ESTADO DE LAS VENTAS!", '#B6E2A1')
                    socket.emit('venta', {...item,estado: "entregado"});
                    setOpen(false)
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
        }else{
            setListSelected(
                listSelected.map(elem => elem._id === saleActive._id ? elem = saleActive : elem)
            )
            changeSale(listSelected[indexPacking+1])
            setIndexPacking(indexPacking+1)
            setQtyMiss([])
        }
    }

    const holdShipping = (navigation) => {
        let result = listSelected.filter(elem => elem._id !== saleActive._id )
        result.splice(1,0,saleActive)
        setListSelected(result)
        changeSale(listSelected[indexPacking+1])
    }

    const editQty = (item) => {
        console.log(item)
        const lineaVenta = saleActive.lineaVenta.map(prd=> prd._id === item._id ? prd = item : prd )
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
        setSaleActive({
            ...saleActive,
            lineaVenta : saleActive.lineaVenta.filter(obj => item._id !== obj._id)
        })
    }

    const qtyChange = (id) => {

        qtyMiss.includes(id) ?  setQtyMiss(qtyMiss.filter(item => item !== id)) : setQtyMiss([...qtyMiss, id])

    }

    const changeSale = (sale) => {
        //cambia el saleactive y trae productos de la venta
        if(sale){
            axios.get(`https://gzapi.onrender.com/lineaVenta/${sale._id}`,
            {
                headers: {
                  Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                }
              })
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