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
    },
    open_cart_btn: {
        // Estilos para o botão do carrinho.
    },
});

export default OpenCart;
