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
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(product.id)}></TouchableOpacity>

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
        // Estilos para o contêiner do cartão.
    },
    productName: {
        // Estilos para o nome do produto.
    },
    deleteButton: {
        // Estilos para o botão de exclusão.
    },
    pricePerKg: {
        // Estilos para o preço por kg ou unidade.
    },
    info: {
        // Estilos para o contêiner de informações.
    },
    quantity: {
        // Estilos para a quantidade.
    },
    price: {
        // Estilos para o preço.
    },
});

export default ProductCard;
