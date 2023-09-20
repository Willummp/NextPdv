import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Metodo = ({ onSelectMethod }) => {
    const navigation = useNavigation();

    const handleMethodClick = (method) => {
        onSelectMethod(method);
        navigation.navigate('Carrinho'); // Certifique-se de configurar corretamente as rotas de navegação.
    };

    return (
        <View style={styles.method_overlay}>
            <View style={styles.method_window}>
                <Text style={styles.method_title}>MÉTODO DE PAGAMENTO</Text>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('CRÉDITO')}>
                    <Text>CRÉDITO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('DÉBITO')}>
                    <Text>DÉBITO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('PIX')}>
                    <Text>PIX</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    method_overlay: {
        // Estilos para o contêiner do overlay.
    },
    method_window: {
        // Estilos para a janela de seleção do método de pagamento.
    },
    method_title: {
        // Estilos para o título do método de pagamento.
    },
    method_payment: {
        // Estilos para as opções de pagamento.
    },
});

export default Metodo;