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
import ModalLoading from './src/components/ModalLoading';
import { LoadingProvider } from './src/context/LoadingContext';
import { AuthProvider } from './src/context/AuthContext';

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
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            <CartSaleProvider>
              <PackingSaleProvider>
                  <NavigationStack>
                  </NavigationStack>
                  <Alert/>
                  <ModalLoading/>
              </PackingSaleProvider>
            </CartSaleProvider>
          </AuthProvider>
        </AlertProvider>
      </LoadingProvider>
    </NavigationContainer>
  );
}
