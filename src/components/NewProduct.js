import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import Button from './Button';
import Modal from './Modal';
import { FlatList } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { useAlert } from '../context/AlertContext';
import InputSelect from './InputSelect';
import { useLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext';
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')

export default function NewProduct({onClose}) {

    const [openModalSearch, setOpenModalSearch] = useState(false)
    const [enlace, setEnlace] = useState('')
    const {openAlert} = useAlert()
    const {setOpen} = useLoading()
    const {token} = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        onSubmit: (formValue) => {
            if (formValue.descripcion !== '', formValue.stock > 0, formValue.categoria !== '', formValue.precioCompra > 0, formValue.precioUnitario > 0) {
                onClose()
                setOpen(true)
                axios.post(`https://gzapi.onrender.com/producto`, {...formValue,
                    categoria: formValue.categoria._id,
                    marca: formValue.marca._id,
                    proveedor: formValue.proveedor._id,
                },
                {
                    headers: {
                      Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                    }
                  })
                .then(function(response){
                    openAlert("PRODUCTO AGREGADO CON EXITO", '#B6E2A1')
                    socket.emit('producto', formValue);
                    setOpen(false)
                })
                .catch(function(error){
                    openAlert("NO SE PUDO AGREGAR EL PRODUCTO", "#F7A4A4")
                }) 
            }else{
                openAlert("FALTA COMPLETAR DATOS", "#F7A4A4")
            }
        }
    })

  return (
    <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Descripcion :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.descripcion}
                onChangeText={(text)=> formik.setFieldValue('descripcion', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Codigo :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.codigoBarra}
                onChangeText={(text)=> formik.setFieldValue('codigoBarra', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Stock :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.stock}
                onChangeText={(text)=> formik.setFieldValue('stock', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Bulto :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.bulto}
                onChangeText={(text)=> formik.setFieldValue('bulto', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Peso :</Text>
            <TextInput placeholder={''} style={[styles.input, {width: '30%'}]}
                value={formik.values.peso.cantidad}
                onChangeText={(text)=> formik.setFieldValue('peso.cantidad', text)}
            />
            <InputSelect data={['ml', 'gr', 'unidad']} 
                onChangeText={(text)=> formik.setFieldValue('peso.unidad', text)} 
                value={formik.values.peso.unidad} 
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Categoria :</Text>
            <TextInput placeholder={''} style={[styles.input, {width:'55%'}]} editable={false}
                value={formik.values.categoria.descripcion || formik.values.categoria}
            />
            <Pressable style={{}} onPress={()=>{
                setOpenModalSearch(true)
                setEnlace('categoria')
            }} >
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Abrir</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Marca :</Text>
            <TextInput placeholder={''} style={[styles.input, {width:'55%'}]} editable={false}
                value={formik.values.marca.descripcion || formik.values.marca}
            />
            <Pressable style={{}} onPress={()=>{
                setOpenModalSearch(true)
                setEnlace('marca')
            }} >
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Abrir</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Proveedor :</Text>
            <TextInput placeholder={''} style={[styles.input, {width:'55%'}]} editable={false}
                value={formik.values.proveedor.descripcion}
            />
            <Pressable style={{}} onPress={()=>{
                setOpenModalSearch(true)
                setEnlace('proveedor')
            }} >
                <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Abrir</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Sabor :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.sabor}
                onChangeText={(text)=> formik.setFieldValue('sabor', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Precio Bulto :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.precioBulto}
                onChangeText={(text)=> formik.setFieldValue('precioBulto', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Precio compra :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.precioCompra}
                onChangeText={(text)=> formik.setFieldValue('precioCompra', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Precio venta :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.precioUnitario}
                onChangeText={(text)=> formik.setFieldValue('precioUnitario', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 5}} >
            <Button text={'Agregar'} onPress={formik.handleSubmit}  fontSize={16} width={'30%'} />
        </View>
        <ModalSearch open={openModalSearch} onClose={()=>{
            setOpenModalSearch(false)
            setEnlace('')
        }} enlace={enlace} 
            onChangeText={(text)=> formik.setFieldValue(enlace, text)}
        />
    </View>
  )
}

function initialValues(item) {
    return {
        descripcion: "",
        codigoBarra: "",
        stock: 0,
        bulto: 0,
        peso: {
            cantidad: 0,
            unidad: "unidad"
        },
        categoria: '',
        marca: '',
        proveedor: '',
        sabor: '',
        precioBulto: 0,
        precioCompra: 0,
        precioUnitario: 0
    }
}

const styles = StyleSheet.create({
    input: {
        margin: 3,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        color: '#7F8487',
        borderColor: '#D9D9D9',
        width: '60%',
        fontSize: 16,
    },
})

const ModalSearch = ({open, onClose, title, enlace, onChangeText}) => {
    const {token} = useAuth()
    const formik = useFormik({
        initialValues: {
          descripcion: ''
        },
        validateOnChange: false,
        onSubmit: (formValue) => {
            axios.post(`https://gzapi.onrender.com/${enlace}`, formValue,
            {
                headers: {
                  Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                }
              })
            .then(function(response){
                formik.setFieldValue('descripcion', '')
                socket.emit('categoria', formValue);
            })
            .catch(function(error){
                console.log("post ",error);
            })
        }
    })

    const [data, setData] = useState([])

    useEffect(() => {
    
        socket.on('categoria', (categoria) => {
            setData((prevData)=>[...prevData, categoria])
        })
        /* return () => {
          socket.off('categoria', ()=>console.log('off'))
        } */
      }, [])


    useEffect(()=>{
        axios.get(`https://gzapi.onrender.com/${enlace}`,
        {
            headers: {
              Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
            }
          })
        .then(function(response){
            setData(response.data.body)
        })
        .catch(function(error){
            console.log("get ",error);
        })
    },[enlace, data])

    return (
      <Modal openModal={open} onClose={onClose} header={true} title={title} >
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 3}} >
            <TextInput placeholder='' style={styles.input}
                autoCapitalize='none'
                value={formik.values.descripcion}
                onChangeText={(text)=> formik.setFieldValue('descripcion', text)}
            />
            <Pressable style={{}} onPress={formik.handleSubmit} >
                <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487', borderBottomWidth: 1, borderBottomColor: '#7F8487' }}>Agregar</Text>
            </Pressable>
        </View>
       <FlatList
           data={data}
           renderItem={({item})=>(
               <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', textAlign: 'center', marginVertical: 3 }}
                onPress={()=>{
                    onChangeText(item)
                    onClose()
                }}
               >{(item.descripcion).toUpperCase()}</Text>
           )}
       />
      </Modal>
    )
}
  