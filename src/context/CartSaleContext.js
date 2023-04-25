import { useNavigation } from '@react-navigation/native'
import React, { useState, createContext, useEffect } from 'react'
import { useDate } from '../hooks/useDate'
import { useAlert } from './AlertContext';
import { useLoading } from './LoadingContext';
import { useAuth } from './AuthContext';
const axios = require('axios').default;
const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')


export const CartSaleContext = createContext({
})

export function CartSaleProvider(props) {
    const {children} = props

    const [cart, setCart] = useState([])
    const [totalCart, setTotalCart] = useState(0)
    const [client, setClient] = useState(undefined)
    const {openAlert} = useAlert()
    const {setOpen} = useLoading()
    const {token} = useAuth()

    const {date} = useDate()

    const addItemCart = (item) => {
        if(item) {
            const exist = cart.some(elem => elem.idProducto === item.idProducto )
            !exist && setCart([...cart, item])
        }
    }

    const editQty = (item) => {
        /* console.log("editando :",item) */
        setCart(cart.map(obj => item.idProducto === obj.idProducto ? obj = item : obj))
    }

    const deleteItemCart = (item) => {
        setCart(cart.filter(obj => item.idProducto !== obj.idProduct))
    }

    const addClientCart = (item) => {
        setClient(item)
    }

    const finishSale = (onCloseSheet) => {

        if(client !== undefined || cart.length !== 0){
            const sale = {
                estado: 'pendiente',
                usuario: '63a9e9872423fabea1e4293b',
                cliente: client?._id,
                fechaPre: date,
                fechaEntrega: '',
                descuento: '0',
                total: totalCart
            }
            onCloseSheet()
            setOpen(true)
            axios.post(`https://gzapi.onrender.com/venta`, sale,
            {
                headers: {
                  Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                }
              })
            .then(function(response){
                cart.map(item=>{
                    axios.post(`https://gzapi.onrender.com/lineaVenta`, 
                        {
                            ...item,
                            idVenta: response.data.body._id
                        },
                        {
                            headers: {
                              Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                            }
                          }
                    )
                    .then(function(r){
                        socket.emit('venta', {...response.data.body, cliente: client});
                        setOpen(false)
                    })
                    .catch(function(error){
                        console.log("post",error);
                    })
                })

                openAlert("VENTA CREADA EXITOSAMENTE!", '#B6E2A1')
            })
            .catch(function(error){
                console.log("post",error);
            })
    
            setCart([]),
            setClient(undefined)
            setTotalCart(0)
        }else{
            openAlert("FALTAN DATOS QUE SELECCIONAR!", '#F7A4A4')
        }
    }

    useEffect(()=>{

        if (cart.length > 1) {

            const initialValue = 0

            const sum = cart?.reduce( (accumulator, currentValue) => {
                return (parseFloat(accumulator) + parseFloat(currentValue.total)).toFixed(2)
            }, initialValue)
    
            setTotalCart(sum)
        }
        if(cart.length === 1) setTotalCart(cart[0].total)
        if(cart.length === 0) setTotalCart(0)
        
    },[cart])

    const valueContext = {
        cart,
        addItemCart,
        totalCart,
        editQty,
        deleteItemCart,
        addClientCart,
        client,
        finishSale
    }

    return <CartSaleContext.Provider value={valueContext}>{children}</CartSaleContext.Provider>

}