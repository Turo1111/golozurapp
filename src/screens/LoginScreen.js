import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import Button from '../components/Button'
import { useAlert } from '../context/AlertContext';
import { useFonts } from 'expo-font';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';
const axios = require('axios').default;

export default function LoginScreen({navigation}) {

    const {openAlert} = useAlert()
    const [loading, setLoading] = useState(false)
    const {addUser, addToken} = useAuth()
    const { saveData: saveUser, data: userLocalStorage } = useLocalStorage([],'user');

    useEffect(()=>{
        if (userLocalStorage) {
            addUser(userLocalStorage.user)
            addToken(userLocalStorage.token)
            navigation.navigate('NavigationDrawer')
        }
    },[])

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        },
        validateOnChange: false,
        onSubmit: (formValue) => {
           setLoading(true)
            axios.post(`https://gzapi.onrender.com/user/login`, formValue)
            .then(function(response){
                addUser(response.data.data)
                addToken(response.data.token)
                saveUser({
                    user: response.data.data,
                    token: response.data.token
                })
                setLoading(false)
                navigation.navigate('NavigationDrawer')
                openAlert("LOGEADO CORRECTAMENTE CHE!", '#B6E2A1')
            })
            .catch(function(error){
                console.log("post ",error);
                setLoading(false)
                openAlert("DATOS INCORRECTOS WACHO!", '#F7A4A4')
            })  
            /* navigation.navigate('NavigationDrawer')
            openAlert("LOGEADO CORRECTAMENTE CHE!", '#B6E2A1') */
        }
    })

    if (loading) {
        return <Loading/>
    }

  return (
    <View style={styles.content}>
        <Text style={{fontSize: 24, fontFamily: 'Cairo-Regular', color: '#7F8487', marginVertical: 10, textAlign: 'center'}}>GOLOZUR APP</Text>
        <View>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: '10%', marginVertical: 5,}}>Usuario</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <TextInput placeholder={''} style={styles.input}
                    value={formik.values.usuario}
                    onChangeText={(text)=> formik.setFieldValue('usuario', text)}
                />
            </View>
            <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: '10%', marginVertical: 5}}>Contraseña</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}} >
                <TextInput placeholder={''} style={styles.input}
                    value={formik.values.password}
                    secureTextEntry={true}
                    onChangeText={(text)=> formik.setFieldValue('password', text)}
                />
            </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}} >
            <Button text={'INGRESAR'} fontSize={16} width={'30%'} style={{marginTop: 15}} onPress={formik.handleSubmit} />
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
        width: '80%',
        fontSize: 12
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        height: '100%'
    }
})