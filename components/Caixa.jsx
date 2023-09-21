import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import produtosData from '../data/data.json';

export const produtosAdicionados = [];

function Teclas({ numero, funcao, style }) {
    return (
        <TouchableOpacity style={style} onPress={funcao}>
            <Text>{numero}</Text>
        </TouchableOpacity>
    );
}

function InputsDiversos({ onClick, value, style }) {
    return (
        <TouchableOpacity style={style} onPress={onClick}>
            <Text>{value}</Text>
        </TouchableOpacity>
    );
}

export default function EscreverCodigo() {
    const [codigo, setCodigo] = useState('');
    const [quant, setQuant] = useState('');
    const [produto, setProduto] = useState('');
    const [selecionado, setSelecionado] = useState(false);
    const [timerAdic, setTimerAdic] = useState(false);
    const [posfixo, setPosfixo] = useState('');
    const numeros = [];

    const prodNaoEncontrado = 'Produto não encontrado...';
    const buscProd = 'Busque seu produto';
    const prodAdicionado = 'Produto adicionado ao Carrinho!';

    useEffect(() => {
        const produtoEncontrado = produtosData.find(produto => produto.codigo === codigo);
        if (produtoEncontrado) {
            setProduto(produtoEncontrado.nome); // Defina qual propriedade do produto deseja exibir
            setPosfixo(codigo.slice(-2) === '01' ? 'g' : 'un');
        } else if (!produtoEncontrado && codigo !== '') {
            setProduto(prodNaoEncontrado);
            setPosfixo('');
        } else {
            if (timerAdic) {
                setProduto(prodAdicionado);
                setTimeout(() => {
                    setProduto(buscProd);
                }, 2000);
                setTimerAdic(false);
            } else setProduto(buscProd);
        }
    }, [codigo]);

    /* Um FOR para criar os numeros que quer nas Teclas, para mais tarde, fazer um map */
    for (let i = 0; i <= 9; i++) {
        if (i === 0) {
            continue; // Pula a iteração se i for igual a 0.
        }
        numeros.push(`${i}`);
    }
    numeros.push('0');

    /* Funções para alternar qual o input que será preenchido pelo usuário */
    function handleDigitarNumeros(item) {
        selecionado ? setQuant(quant + item) : setCodigo(codigo + item);
    }

    function handleApagarNumeros() {
        selecionado ? setQuant('') : setCodigo('');
    }

    function handleConfirmarNumeros() {
        if (produto !== prodNaoEncontrado && quant !== '') {
            const produtoEncontrado = produtosData.find(produto => produto.codigo === codigo);
            const precoTotal = codigo.slice(-2) === '01' ? (produtoEncontrado.preco * quant) / 100 : produtoEncontrado.preco * quant;
            produtosAdicionados.push(
                {
                    id: produtoEncontrado.id,
                    nome: produtoEncontrado.nome,
                    preco: produtoEncontrado.preco,
                    precoTotal: precoTotal,
                    imagemuri: produtoEncontrado.imagemuri,
                    codigo: codigo,
                    quant: quant
                }
            );
            setTimerAdic(true);
            setQuant('');
            setCodigo('');
        }
    }

    return (
        <View style={styles.caixa}>
            <View style={styles.inputbox}>
                <TextInput
                    style={styles.caixa_resul}
                    value={produto}
                    editable={false}
                />
                <InputsDiversos
                    onClick={() => setSelecionado(false)}
                    style={[styles.caixa__codigo_value, selecionado ? {} : styles.borda_grossa]}
                    value={codigo}
                />
                <View style={styles.caixa__quant}>
                    <Text style={{ fontSize: 22 }}>Quantidade</Text>
                    <InputsDiversos
                        onClick={() => setSelecionado(true)}
                        style={[styles.caixa__quant_value, selecionado ? styles.borda_grossa : {}]}
                        value={quant + ' ' + posfixo}
                    />
                </View>
            </View>
            <View style={styles.teclado}>
                {numeros.map(item => (
                    <Teclas
                        style={styles.teclas}
                        funcao={() => handleDigitarNumeros(item)}
                        numero={item}
                        key={item}
                    />
                ))}
                <Teclas
                    style={styles.teclas__apagar}
                    funcao={handleApagarNumeros}
                    numero={'Apagar'}
                />
                <Teclas
                    style={styles.teclas__confirmar}
                    funcao={handleConfirmarNumeros}
                    numero={'Confirmar'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    caixa: {
        // Estilos para o contêiner externo.
    },
    inputbox: {
        // Estilos para o contêiner dos inputs.
    },
    caixa_resul: {
        // Estilos para o input de resultado.
    },
    caixa__codigo_value: {
        // Estilos para o input de código.
    },
    borda_grossa: {
        // Estilos para a borda grossa.
    },
    caixa__quant: {
        // Estilos para o contêiner da quantidade.
    },
    caixa__quant_value: {
        // Estilos para o input de quantidade.
    },
    teclado: {
        // Estilos para o contêiner do teclado.
    },
    teclas: {
        // Estilos para as teclas do teclado.
    },
    teclas__apagar: {
        // Estilos para a tecla de apagar.
    },
    teclas__confirmar: {
        // Estilos para a tecla de confirmar.
    },
});