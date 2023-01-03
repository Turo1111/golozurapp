import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, Pressable, FlatList, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { useFonts } from '@expo-google-fonts/inter';
import { BarChart } from 'react-native-chart-kit';
import { color } from 'react-native-reanimated';
import MyBottomSheet from '../components/MyBottomSheet';
import InputSelect from '../components/InputSelect';

export default function HomeScreen() {

  const [open, setOpen] = React.useState(false)

  let [fontsLoaded] = useFonts({
    'Cairo-Regular': require('../../assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Light': require('../../assets/fonts/Cairo-Light.ttf'),
    'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return null;
  }

  const data = {
    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return (
    <SafeAreaView style={styles.content}>
        <View style={{flexDirection: 'row', padding: 15, justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: 22, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Bienvenido, Sergio</Text> 
          <Icon name='notifications-outline' color='#7F8487' size={30} 
          />
        </View>
        <Button title='abrir' onPress={()=>setOpen(true)}/>
        <MyBottomSheet open={open} onClose={()=>setOpen(false)} height={99}>
          <Text>MY BOTTOM SHEET LOCO</Text>
          <InputSelect/>
        </MyBottomSheet>
        {/* <View style={{flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center'}}>
          <Icon name='eye' color='#7F8487' size={25} 
          />
          <Text style={{fontSize: 16, fontFamily: 'Cairo-Regular', color: '#7F8487', marginStart: 10 }} >Ocultar numeros</Text> 
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center', justifyContent: 'space-around', marginBottom: 15}}>
          <Pressable style={styles.buttonActive}>
            <Text style={[styles.text, {color: '#fff'}]}>Semanal</Text>
          </Pressable>
          <Pressable style={styles.buttonDisable}>
            <Text style={[styles.text, {color: '#7F8487'}]}>Mensual</Text>
          </Pressable>
          <Pressable style={styles.buttonDisable}>
            <Text style={[styles.text, {color: '#7F8487'}]}>Anual</Text>
          </Pressable>
        </View>
        <BarChart
          data={data}
          width={Dimensions.get("window").width}
          height={200}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#F9F5EB",
            backgroundGradientFrom: "#F9F5EB",
            backgroundGradientTo: "#F9F5EB",
            decimalPlaces: 2, // optional, defaults to 2dp 
            color: (opacity = 1) => `rgba(28,56,121, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "6",
              stroke: "#ffa726"
            }
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#379059', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}>
            <Icon2 name='money' size={25} color='#379059'/>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#379059', fontSize: 16, fontFamily: 'Cairo-Bold' }}>Venta</Text>
              <Text style={{color: '#379059', fontSize: 12, fontFamily: 'Cairo-Regular'}}>$5151333.99</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FF0000', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}>
            <Icon2 name='money' size={25} color='#FF0000'/>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#FF0000', fontSize: 16, fontFamily: 'Cairo-Bold' }}>Compra</Text>
              <Text style={{color: '#FF0000', fontSize: 12, fontFamily: 'Cairo-Regular'}}>$5151333.99</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#c9c9c9', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}>
            <Icon2 name='money' size={25} color='#c9c9c9'/>
            <View style={{marginStart: 10}}>
              <Text style={{color: '#c9c9c9', fontSize: 16, fontFamily: 'Cairo-Bold' }}>Pendiente</Text>
              <Text style={{color: '#c9c9c9', fontSize: 12, fontFamily: 'Cairo-Regular'}}>$5151333.99</Text>
            </View>
          </View>
        </View>
        <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, borderColor: '#d9d9d9', borderWidth: 1, height: 180, margin: 15}} >
          <Text style={{fontSize: 18, fontFamily: 'Cairo-Bold', color: '#7F8487' }} >Actividades</Text> 
          <FlatList
            data={[1,3,4,2,5,6,7,8,9,0]}
            renderItem={()=>
            <Text style={{color: '#c9c9c9', fontSize: 14, fontFamily: 'Cairo-Bold' }}>
              #277BC0        Venta agregada : Zurita, Matias          $8952.33
            </Text>
            }
          />
        </View> */}
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    content: {
        marginTop: 30,
    },
    search : {
        flex: 1
    },
    buttonActive: {
      borderColor: '#fff', 
      borderWidth: 1, 
      paddingHorizontal: 15, 
      paddingVertical: 2, 
      borderRadius: 10, 
      backgroundColor: '#607EAA',
      elevation: 3,
    },
    buttonDisable: {
      color: '#7F8487', 
      paddingHorizontal: 15, 
      paddingVertical: 2, 
      elevation: 3,
    },
    text: {
      fontSize: 18, 
      fontFamily: 'Cairo-Regular', 
    }
})