import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Finalizar = () => {
    const navigation = useNavigation();

    const handleCloseClick = (close) => {
        navigation.navigate('Caixa');
    };

    return (
        <View style={styles.finalizar_overlay}>
            <Text style={styles.finalizar_checkmark}>✓</Text>
            <Text style={styles.finalizar_text}>Compra confirmada com sucesso</Text>
            <TouchableOpacity style={styles.finalizar_button}
            onPress={() => handleCloseClick()}>                                
                <Text style={styles.finalizar_button_text}>Fechar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    finalizar_overlay: {
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
    finalizar_checkmark: {
        color: '#FFEBDD',
        fontSize: '180px',
        marginTop: '15vh',
        textShadow: '3px 2px 6px rgba(80, 80, 80, 1)',
    },
    finalizar_text: {
        color: '#FFEBDD',
        fontSize: 32,
        fontWeight: '800',
        margin: 0,
        textAlign: 'center',
        marginBottom: 20,
        textShadow: '2px 1px 5px rgba(80, 80, 80, 1)',
    },
    finalizar_button: {
        backgroundColor: '#332E2D',
        paddingVertical: '10px',
        paddingHorizontal: '30px',
        borderRadius: '9px',
        marginTop: '20vh',
    },
    finalizar_button_text: {
        color: '#FFEBDD',
    }
});


export default Finalizar;