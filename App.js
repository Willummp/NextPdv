import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Caixa from './components/Caixa';
import Carrinho from './components/Carrinho';
import Indisponivel from './components/Indisponivel'; // Importe o componente Indisponivel
import { useWindowDimensions } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const { width } = useWindowDimensions();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={width < 200 ? "Indisponivel" : "Caixa"}>
        {width < 220 ? (
          <Stack.Screen name="Indisponivel" component={Indisponivel} options={{ title: 'Indisponivel', headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Caixa" component={Caixa} options={{ title: 'Caixa', headerShown: false }} />
            <Stack.Screen name="Carrinho" component={Carrinho} options={{ title: 'Carrinho', headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
