import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/NavigationDrawer';
import { LogBox, Text, Modal, View } from "react-native";
import { useFonts } from '@expo-google-fonts/inter';
import { CartSaleContext, CartSaleProvider } from './src/context/CartSaleContext';
import Alert from './src/components/Alert';
import { PackingSaleProvider } from './src/context/PackingSaleContext';
import NavigationStack from './src/navigation/NavigationStack';
import { AlertProvider } from './src/context/AlertContext';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {

  let [fontsLoaded] = useFonts({
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Light': require('./assets/fonts/Cairo-Light.ttf'),
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AlertProvider>
        <CartSaleProvider>
          <PackingSaleProvider>
              <NavigationStack>
              </NavigationStack>
              <Alert/>
          </PackingSaleProvider>
        </CartSaleProvider>
      </AlertProvider>
    </NavigationContainer>
  );
}
