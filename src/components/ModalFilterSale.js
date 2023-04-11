import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react'
import Modal from './Modal'
import { useDate } from '../hooks/useDate'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ModalFilterSale({openModal, onClose, filterActive, onFilterActive, }) {

    const [dateFrom, setDateFrom] = React.useState(new Date());
    const [dateTo, setDateTo] = React.useState(new Date())
    const [showFrom, setShowFrom] = useState(false)
    const [showTo, setShowTo] = useState(false)

    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateFrom(currentDate);
        setShowFrom(false);
    };

    const onChangeTo = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateTo(currentDate);
        setShowTo(false);
    };

  return (
    <Modal
        openModal={openModal}
        onClose={onClose}
        header={true}
        title='Filtros'
        height={'30%'}
    >
        <Text  style={{fontSize: 14, fontFamily: 'Cairo-Bold', color: '#7F8487'}} >Estados</Text>
        <View style={{flexDirection: 'row', marginVertical: 5}} >
            {
                ['pendiente', 'armado', 'entregado', 'pagado'].map(item=>(
                    <Pressable key={item} onPress={()=>onFilterActive(item)}>
                        <Text style={[styles.state, 
                            {
                                borderColor: filterActive === item ? '#2366CB' : '#d9d9d9',
                                color: filterActive === item ? '#2366CB' : '#7F8487',
                            }]}
                        >
                            {item}
                        </Text>
                    </Pressable>
                ))
            }
        </View> 
        <Text  style={{fontSize: 14, fontFamily: 'Cairo-Bold', color: '#7F8487'}} >Fecha</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >    
            <Pressable onPress={()=>setShowFrom(true)} >
                <Text style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487'}}>Desde : {(useDate(dateFrom).date).toString()}</Text>
            </Pressable>
            <Pressable onPress={()=>setShowTo(true)}>
                <Text  style={{fontSize: 14, fontFamily: 'Cairo-Regular', color: '#7F8487'}} >Hasta : {(useDate(dateTo).date).toString()}</Text>
            </Pressable>
        </View>
        {
            showFrom &&
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFrom}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChangeFrom}
                />
        }
        {
            showTo &&
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateTo}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChangeTo}
                />
        }
    </Modal>
  )
}

const styles = StyleSheet.create({
    state: {
        fontSize: 12, 
        fontFamily: 'Cairo-Regular', 
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10
    },
})