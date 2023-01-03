import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { useFormik } from 'formik'
import Button from '../components/Button'
import { useAlert } from '../context/AlertContext';
const axios = require('axios').default;

export default function LoginScreen({navigation}) {

    const {openAlert} = useAlert()

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        },
        validateOnChange: false,
        onSubmit: (formValue) => {
            /* axios.post(`http://10.0.2.2:3000/user/login`, formValue)
            .then(function(response){
                console.log(response.data.body)
                navigation.navigate('NavigationDrawer')
                openAlert("LOGEADO CORRECTAMENTE CHE!", '#B6E2A1')
            })
            .catch(function(error){
                console.log("post ",error);
                openAlert("DATOS INCORRECTOS WACHO!", '#F7A4A4')
            }) */
            navigation.navigate('NavigationDrawer')
            openAlert("LOGEADO CORRECTAMENTE CHE!", '#B6E2A1')
        }
    })

  return (
    <View style={styles.content}>
        <Text style={{fontSize: 22, fontFamily: 'Cairo-Regular', color: '#7F8487', marginVertical: 10, textAlign: 'center'}}>GOLOZUR APP</Text>
        <View>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: '20%', marginVertical: 5,}}>Usuario</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <TextInput placeholder={''} style={[styles.input]}
                    value={formik.values.usuario}
                    onChangeText={(text)=> formik.setFieldValue('usuario', text)}
                />
            </View>
            <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: '20%', marginVertical: 5}}>Contraseña</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <TextInput placeholder={''} style={[styles.input]}
                    value={formik.values.password}
                    secureTextEntry={true}
                    onChangeText={(text)=> formik.setFieldValue('password', text)}
                />
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}} >
            <Button text={'INGRESAR'} fontSize={12} width={'30%'} style={{marginTop: 15}} onPress={formik.handleSubmit} />
        </View>
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
        width: '60%',
        fontSize: 12
    },
    content: {
        marginTop: '40%',
        padding: 15,
    }
})