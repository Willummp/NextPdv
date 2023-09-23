import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Caixa from './components/Caixa';
import Carrinho from './components/Carrinho';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Caixa"  >
        <Stack.Screen name="Caixa" component={Caixa} options={{ title: 'Caixa', headerShown: false}} />
        <Stack.Screen name="Carrinho" component={Carrinho} options={{ title: 'Carrinho', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
