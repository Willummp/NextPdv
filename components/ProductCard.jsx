import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ProductCard({ product, onDelete }) {
    const un = verificarFormaUnidadeOuKg();

    function verificarFormaUnidadeOuKg() {
        let ultimosDoisNumeros = product.codigo.slice(-2);
        if (ultimosDoisNumeros === '01') {
            return true;
        } else if (ultimosDoisNumeros === '00') {
            return false;
        }
    }

    return (
        <View style={styles.card}>
            <Text style={styles.productName}>{product.nome}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(product.id)}>🗑️</TouchableOpacity>

            <Text style={styles.pricePerKg}>Preço p/ {un ? '100g' : 'un'} R${product.preco}</Text>
            <View style={styles.info}>
                <Text style={styles.quantity}>QTD: {product.quant} {un ? 'g' : 'un'}</Text>
                <Text style={styles.price}>Preço: R${product.precoTotal.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#332E2E',
        color: '#FFF9F4',
        borderRadius: 8,
        marginBottom: 16,
        width: '90vw', // Use a percentage or other valid unit in React Native.
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignSelf: 'center',
        paddingBottom: 5
    },
    productName: {
        fontSize: 24, // Font size is represented in pixels in React Native.
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 8,
        color: "#fff"
    },
    deleteButton: {
        backgroundColor: '#ce5858',
       // Use a percentage or other valid unit in React Native.
        color: 'white',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        cursor: 'pointer',
        position: 'absolute',
        top: 8,
        right: 8,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: "center",
        width: "95%"
    },
    pricePerKg: {
        display: 'flex',
        fontSize: 12, // Font size is represented in pixels in React Native.
        fontWeight: 'bold',
        color: '#d49764',
        textAlign: 'right',
        marginTop: '6%', // Use a percentage or other valid unit in React Native.
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    pricePerUn: {
        display: 'flex',
        fontSize: 16, // Font size is represented in pixels in React Native.
        fontWeight: 'bold',
        color: '#d49764',
        textAlign: 'right',
        marginTop: '6%', // Use a percentage or other valid unit in React Native.
        justifyContent: 'flex-end',

    },
    quantity: {
        fontSize: 14, // Font size is represented in pixels in React Native.
        color: '#dfdfdf',
        fontWeight: '800',
        textAlign: 'left',
        marginTop: 4,
        justifyContent: 'flex-end',
    },
    price: {
        fontSize: 18, // Font size is represented in pixels in React Native.
        color: '#FFF9F4',
        fontWeight: 'bold',
        textAlign: 'right',
        color: "#fff"
    },
  
});

export default ProductCard;
