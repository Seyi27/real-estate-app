import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Pages/SignUp';
import DrawerNav from './Pages/DrawerNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Maps from './Pages/Maps';
import ContentPage from './Pages/ContentPage';
import MyFavourite from './Pages/MyFavourite';
import ContactUs from './Pages/ContactUs';
import Settings from './Pages/Settings';
import Account from './Pages/Account';
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();

const globalstyle={
  headerShown:false
}

export default function App() {



  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' >
        <Stack.Screen name="Welcome" component={Welcome}  options={globalstyle}/>
        <Stack.Screen name="SignUp" component={SignUp} options={globalstyle}/>
        <Stack.Screen name="Login" component={Login} options={globalstyle}/>
        <Stack.Screen name="DrawerNav" component={DrawerNav} options={globalstyle} />
        <Stack.Screen name="Map" component={Maps} />
        <Stack.Screen name="Content" component={ContentPage} options={globalstyle} />
        <Stack.Screen name="Myfavourite" component={MyFavourite} />
        <Stack.Screen name="Contact" component={ContactUs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Account" component={Account} />

      </Stack.Navigator>
    </NavigationContainer>

  </BottomSheetModalProvider>
</GestureHandlerRootView>
</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
