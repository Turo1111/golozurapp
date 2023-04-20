import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useFormik } from 'formik'
import Button from './Button'
import Modal from './Modal'
import InputListAdd from './InputListAdd'
import { useAlert } from '../context/AlertContext'
import { useLoading } from '../context/LoadingContext'
const axios = require('axios').default;

const io = require('socket.io-client')

const socket = io('https://gzapi.onrender.com')

export default function NewClient({onClose}) {

    const [openModalSearch, setOpenModalSearch] = useState(false)
    const {openAlert} = useAlert()
    const { setOpen } = useLoading()

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        onSubmit: (formValue) => {
            if(formValue.apellido !== '' && formValue.nombre !== '' && formValue.email !== ''){
                setOpen(true)
                onClose()
                axios.post(`https://gzapi.onrender.com/cliente`, formValue)
                .then(function(response){
                    socket.emit('cliente', formValue);
                    setOpen(false)
                })
                .catch(function(error){
                    setOpen(false)
                    openAlert("NO SE PUDO AGREGAR EL CLIENTE", "#F7A4A4")
                })
            }else{
                openAlert("COMPLETE APELLIDO O NOMBRE O EMAIL", "#F7A4A4")
            }
        }
    })

  return (
    <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Nombre :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.nombre}
                onChangeText={(text)=> formik.setFieldValue('nombre', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Apellido :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.apellido}
                onChangeText={(text)=> formik.setFieldValue('apellido', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Email :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.email}
                onChangeText={(text)=> formik.setFieldValue('email', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Telefono :</Text>
            <InputListAdd data={formik.values.telefono} onChangeData={(data)=>formik.setFieldValue("telefono",data)} width={90} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Direcciones :</Text>
            <TextInput placeholder={formik.values.direccion.ciudad === '' ? 'Direcciones' : 
                    `${formik.values.direccion[0].ciudad}, ${formik.values.direccion[0].calle}, ${formik.values.direccion[0].numero}`
                }  
                style={[styles.input, {width:'55%'}]} editable={false}
            />
            <Pressable style={{}} onPress={()=>{
                setOpenModalSearch(true)
            }} >
                <Text style={{fontSize: 12, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Abrir</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 5}} >
            <Button text={'Agregar'} onPress={formik.handleSubmit}  fontSize={14} width={'30%'} />
        </View>
        <ModalSearch open={openModalSearch} onClose={()=>{
            setOpenModalSearch(false)
        }} 
            onChangeText={(text)=> formik.setFieldValue("direccion",text)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        margin: 3,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        color: '#7F8487',
        borderColor: '#D9D9D9',
        width: '70%',
        fontSize: 12,
    },
})

function initialValues() {
    return {
        nombre: "",
        apellido: "",
        email: "",
        direccion: [{
            ciudad: "",
            calle: "",
            numero: ""
        }],
        telefono: [],
        estado: 'En forma',
    }
}

const ModalSearch = ({open, onClose, title, onChangeText}) => {

    const formik = useFormik({
        initialValues: {
          ciudad: '',
          calle: '',
          numero: ''
        },
        validateOnChange: false,
        onSubmit: (formValue, { resetForm }) => {
            setData([...data, formValue])
            resetForm()
        }
    })

    const [data, setData] = useState([])

    return (
      <Modal openModal={open} onClose={()=>{
            onClose()
            onChangeText(data)
        }} 
        header={true} title={title} height={350} 
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Ciudad :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.ciudad}
                onChangeText={(text)=> formik.setFieldValue('ciudad', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Calle :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.calle}
                onChangeText={(text)=> formik.setFieldValue('calle', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487' }}>Numero :</Text>
            <TextInput placeholder={''} style={[styles.input]}
                value={formik.values.numero}
                onChangeText={(text)=> formik.setFieldValue('numero', text)}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 5}} >
            <Button text={'Agregar'} onPress={formik.handleSubmit}  fontSize={14} width={'30%'} />
        </View>
       <FlatList
           data={data}
           renderItem={({item})=>(
               <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', textAlign: 'center', marginVertical: 3 }}>{item.ciudad}, {item.calle}, {item.numero}</Text>
           )}
           ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay direcciones</Text>
          }
       />
      </Modal>
    )
}