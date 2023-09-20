import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCard from '../ProductCard/ProductCard';
import produtosData from '../../data/data.json';
import { produtosAdicionados } from '../Caixa/Caixa';
import Metodo from '../Metodo/Metodo';
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
        <View style={styles.container_cart}>
            <View style={styles.test}>{novoMap()}</View>

            <MenuCarrinho />
            {/* <TouchableOpacity onPress={limparLista}><Text>Limpar Carrinho</Text></TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container_cart: {
        // Estilos para o contêiner externo.
    },
    test: {
        // Estilos para o contêiner de lista de produtos.
    },
    menu_cart: {
        // Estilos para o contêiner do menu do carrinho.
    },
    menu_total: {
        // Estilos para o contêiner do total.
    },
    menu_total_rs: {
        // Estilos para o texto do total.
    },
    menu_confirm: {
        // Estilos para o contêiner de botões de confirmação.
    },
    menu_confirm_metodo: {
        // Estilos para o botão do método de pagamento.
    },
    menu_confirm_finalizar: {
        // Estilos para o botão de finalização.
    },
});

export default Carrinho;