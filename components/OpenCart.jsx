import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function OpenCart() {
    const navigation = useNavigation();
    const [showCart, setShowCart] = useState(true);

    const handleShowCart = () => {
        setShowCart(!showCart);
        if (!showCart) {
            navigation.navigate('Carrinho'); // Certifique-se de configurar corretamente as rotas de navegação.
        } else {
            navigation.navigate('Home'); // Substitua 'Home' pelo nome da tela de destino ao fechar o carrinho.
        }
    };

    return (
        <View style={styles.open_cart}>
            <TouchableOpacity
                style={styles.open_cart_btn}
                onPress={handleShowCart}>
                <Text>{showCart ? 'ABRIR CARRINHO' : 'FECHAR CARRINHO'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    open_cart: {
        // Estilos para o contêiner do botão do carrinho.
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh', // Use a percentage or other valid unit in React Native.
        borderRadius: 5,
    },
    open_cart_btn: {
        // Estilos para o botão do carrinho.
        textDecorationLine: 'none',
        color: '#332E2E',
        lineHeight: 2.3,
        fontWeight: '800',
        backgroundColor: '#A98467',
        padding: 5,
        height: '4vh', // Use a percentage or other valid unit in React Native.
        width: '50vw', // Use a percentage or other valid unit in React Native.
        borderRadius: 100,
        borderWidth: 0, // Use borderWidth instead of border:none in React Native.
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
});

// O close não consegui pôr.
export default OpenCart;
