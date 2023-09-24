import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Metodo = ({ onSelectMethod }) => {
    const navigation = useNavigation();

    const handleMethodClick = (method) => {
        onSelectMethod(method);
        navigation.navigate('Carrinho');
    };

    return (
        <View style={styles.method_overlay}>
            <View style={styles.method_window}>
                <Text style={styles.method_title}>MÉTODO DE PAGAMENTO</Text>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('CRÉDITO')}>
                    <Text style={styles.Text}>CRÉDITO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('DÉBITO')}>
                    <Text style={styles.Text}>DÉBITO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.method_payment}
                    onPress={() => handleMethodClick('PIX')}>
                    <Text style={styles.Text}>PIX</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    method_overlay: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 20,
        borderRadius: 10,
        backgroundColor: '#A98467',
        alignItems: 'center',
        left: 0,
        bottom: 0,
        zIndex: 2,
        height: '88vh', 
    },
    method_window: {
   
        
    },
    method_title: {
        fontSize: 32,
        fontWeight: '800',
        margin: 0,
        textAlign: 'center',
        marginBottom: 20,
        color: '#332E2E',
    },
    method_payment: {
        display: 'flex',
        marginTop: 5,
        backgroundColor: '#332E2E',
        padding: 10,
        width: '90vw',
        height: 60,
        fontWeight: '800',
        fontSize: 24,
        color: '#fff',
        textAlign: 'right',
        marginBottom: 5,
        borderRadius: 100,
        borderWidth: 0, 
   
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    Text: {
        color: "#fff",
        justifyContent: "center",
        alignSelf: "center",
        lineHeight: "1.5",
        fontWeight: 600,
        fontSize: 24
    }
});


export default Metodo;