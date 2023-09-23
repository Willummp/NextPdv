import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import produtosData from '../data/data.json';
import { produtosAdicionados } from './Caixa';
import Metodo from './Metodo';
import { useNavigation } from '@react-navigation/native';

let chaveAtivacao = [];

function MenuCarrinho() {
    const navigation = useNavigation();
    const [mostrarMetodo, setMostrarMetodo] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);

    const handleBotaoClick = () => {
        setMostrarMetodo(true);
        navigation.navigate('Metodo'); // Certifique-se de configurar corretamente as rotas de navegação.
    };

    useEffect(() => {
        let soma = 0;
        for (let i = 0; i < produtosAdicionados.length; i++) {
            soma += produtosAdicionados[i].precoTotal;
        }
        setValorTotal(soma.toFixed(2));
    }, [produtosAdicionados, chaveAtivacao]);

    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        setMostrarMetodo(false);
    };

    

    return (
       

            <View style={styles.menu_cart}>
                <View style={styles.menu_total}>
                    <Text style={styles.menu_total_rs}>TOTAL: R$ {valorTotal}</Text>
                </View>
                <View style={styles.menu_confirm}>
                    <TouchableOpacity
                        style={styles.menu_confirm_metodo}
                        id='btn_cart'
                        onPress={handleBotaoClick}>
                        <Text>
                            {selectedMethod ? `${selectedMethod}` : 'METODO'}
                        </Text>
                    </TouchableOpacity>

                    {mostrarMetodo && <Metodo onSelectMethod={handleMethodSelect} />}
                    <TouchableOpacity
                        style={styles.menu_confirm_finalizar}
                        id="btn_cart">
                        <Text>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
   

    );
}

function Carrinho() {
    const [elementos, setElementos] = useState(produtosAdicionados);
    const navigation = useNavigation();

    const handleNavegarParaCaixa = () =>{
        navigation.navigate('Caixa')
    }


    const removerElemento = (index) => {
        const novosElementos = [...elementos];
        novosElementos.splice(index, 1);
        produtosAdicionados.splice(index, 1);
        setElementos(novosElementos);
        chaveAtivacao = [...novosElementos];
    };

    const limparLista = () => {
        setElementos([]);
    };

    function novoMap() {
        return (
            elementos.map((produto, index) => (
                <ProductCard
                    key={produto.id}
                    product={produto}
                    onDelete={() => removerElemento(index)}
                />
            ))
        );
    }

    useEffect(() => {
        novoMap();
    }, [elementos]);

  
    return (
        <View style={styles.fundo}>
            <TouchableOpacity style={styles.botaoCarrinho} onPress={handleNavegarParaCaixa}>
                <Text>Ir para o Carrinho</Text>
            </TouchableOpacity>


        <View style={styles.container_cart}>
            <View style={styles.test}>{novoMap()}</View>

            <MenuCarrinho />
            {/* <TouchableOpacity onPress={limparLista}><Text>Limpar Carrinho</Text></TouchableOpacity> */}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: "#725844",
        height: "100vh"
    },
    botaoCarrinho: {
        backgroundColor: '#D0B6A2',
        width: '60vw',
        height: "5vh",
        alignSelf: "center",
        borderRadius: 100,
        padding: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '800',
    },
    container_cart: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 20,
        borderRadius: 10,
        backgroundColor: '#A98467',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowRadius: 4,
        alignItems: 'center',
        height: '90vh', // Use a percentage or other valid unit in React Native.
        bottom: 0,
    },
    hidden: {
        display: 'none',
    },
    menu_cart: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        height: '20%', // Use a percentage or other valid unit in React Native.
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    test: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        scrollBehavior: 'smooth',
        overflow: 'auto',
        width: '90vw',
        height: '60vh', // Use a percentage or other valid unit in React Native.
    },
    menu_total: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '92%',
        height: '8vh', // Use a percentage or other valid unit in React Native.
        backgroundColor: '#D0B6A2',
        borderRadius: 100,
        fontWeight: '800',
        fontSize: 32,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    menu_confirm: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '92%',
        height: '8vh', // Use a percentage or other valid unit in React Native.
        border: 'none',
    },
    btn_cart: {
        backgroundColor: '#332E2E',
        fontFamily: 'Open Sans',
        fontSize: 20,
        color: '#FFF9F4',
        width: '48%', // Use a percentage or other valid unit in React Native.
        fontWeight: '800',
        borderRadius: 12,
        border: 'none',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
});

// Não consegui por o webkit
export default Carrinho;