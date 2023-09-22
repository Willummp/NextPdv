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
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 20,
        borderRadius: 10,
        backgroundColor: '#A98467',
        alignItems: 'center',
        left: 0,
        zIndex: 2,
        height: '82%', // Use a percentage or other valid unit in React Native.
        maxHeight: '88%', // Use a percentage or other valid unit in React Native.
        bottom: 0,
    },
    method_title: {
        fontSize: 32,
        fontWeight: '800',
        margin: 0,
        marginBottom: 20,
        color: '#332E2E',
    },
    method_payment: {
        marginTop: 5,
        backgroundColor: '#332E2E',
        padding: 10,
        width: '90%', // Use a percentage or other valid unit in React Native.
        height: 32,
        fontWeight: '800',
        fontSize: 24,
        color: 'white',
        textAlign: 'right',
        marginBottom: 5,
        borderRadius: 100,
        borderWidth: 0, // Use borderWidth instead of border:none in React Native.
        lineHeight: 1.2,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
});


export default Metodo;