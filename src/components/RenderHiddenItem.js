import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import DeleteIcon from 'react-native-vector-icons/AntDesign'
import InputQty from './InputQty';

export default function RenderHiddenItem({item, rowClose, editQty}) {

    const [qty, setQty] = React.useState(item.cantidad)

    React.useEffect(()=>{
        !rowClose && setQty(item.cantidad)
        if (rowClose && qty !== item.cantidad) {
            editQty({
                ...item,
                modificado: true,
                cantidad: qty,
                total: (qty*item.precioUnitario).toFixed(2)
            })
        }
    },[rowClose])

    const reset = ( ) => {
      setQty(1)
      setTotal(item.precioUnitario)
    }

    return (
      <View style={styles.rowBack}>
          <TouchableOpacity
              style={[styles.backRightBtn, {backgroundColor: '#FF6B6B', width: 80}]}
              onPress={() => setQty(0)}
          >
              <DeleteIcon color={'#fff'} size={40} name='delete' />
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft, {width: 200}]}
          >
              <InputQty qty={qty} cart={true}
                upQty={()=> setQty(qty+1)}
                downQty={()=> {qty > 1 && setQty(qty-1)}}
                x5={()=>setQty(qty+5)}
                x10={()=>setQty(qty+10)}
                reset={reset}
              />
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        paddingHorizontal: 5
    },
    backRightBtnLeft: {
        backgroundColor: '#607EAA',
        right: 0,
    },
})