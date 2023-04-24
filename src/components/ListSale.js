import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import ItemSale from './../components/ItemSale';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import InfoSale from './InfoSale';
import axios from 'axios';
import MyBottomSheet from './MyBottomSheet';
import { useAuth } from '../context/AuthContext';


export default function ListSale({height='50%', renderItem, renderHiddenItem, rightOpenValue, listSale}) {

    const bottomSheet = useRef();
    const [saleInfo, setSaleInfo] = useState(undefined)
    const [openBS, setOpenBS] = useState(false)
    const {token} = useAuth()

  return (
    <View style={{paddingHorizontal: 15, flex: 1}} >
        <SwipeListView
            data={listSale}
            ListEmptyComponent={
                <Text style={{textAlign: 'center', marginTop: 15, fontSize: 25, fontWeight: 'bold', color: '#c9c9c9'}} >No hay Ventas</Text>
              }
            renderItem={
                ({item})=>(
                    <TouchableHighlight
                        style={styles.rowFront}
                        underlayColor={'#AAA'}
                    >
                        <ItemSale item={item}/>
                    </TouchableHighlight>
                )
            }
            renderHiddenItem={
                (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={async ()=>{
                                await axios.get(`https://gzapi.onrender.com/lineaVenta/${data.item._id}`,
                                {
                                    headers: {
                                      Authorization: `Bearer ${token}` // Agregar el token en el encabezado como "Bearer {token}"
                                    }
                                })
                                .then(function(response){
                                    console.log(response.data.body)
                                    setSaleInfo({...data.item , lineaVenta: response.data.body})
                                    setOpenBS(true)
                                })
                                .catch(function(error){
                                    console.log("get ",error);
                                })
                            }}
                        >
                           <Icon name='information-circle-outline' color='#fff' size={50}/>
                        </TouchableOpacity>
                    </View>
                )
            }
            style={{height: height, paddingHorizontal: 15, borderWidth: 1, borderColor: '#9e9e9e', borderRadius: 15}}
            rightOpenValue={-100}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
        />
        <MyBottomSheet open={openBS} onClose={()=>setOpenBS(false)} height={680} >
            <InfoSale info={saleInfo} />
        </MyBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100
    },
    backRightBtnRight: {
        backgroundColor: '#607EAA',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
    paddingView : {
        paddingHorizontal: 10
    }
})