import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Metodo from './components/Metodo';
import Carrinho from './components/Carrinho';
import Caixa from './components/Caixa';
import OpenCart from './components/OpenCart';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Caixa" component={Caixa} />
        <Tab.Screen name="Carrinho" component={Carrinho} />
      </Tab.Navigator>
      {/* <OpenCart /> */}
    </>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="App" component={App} screenOptions={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}