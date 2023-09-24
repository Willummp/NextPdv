import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import produtosData from '../data/data.json';
import { useNavigation } from '@react-navigation/native';

export const produtosAdicionados = [];

function Teclas({ numero, funcao, style }) {
    return (
        <TouchableOpacity style={style} onPress={funcao}>
            <Text style={styles.textLight}>{numero}</Text>
        </TouchableOpacity>
    );
}

function InputsDiversos({ onClick, value, style }) {
    return (
        <TouchableOpacity style={style} onPress={onClick}>
            <Text style={styles.textLight}>{value}</Text>
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

    const navigation = useNavigation();


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

    for (let i = 1; i <= 9; i++) {
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

    function handleNavegarParaCarrinho() {
        navigation.navigate('Carrinho');
    }

    return (
        <View style={styles.fundo}>
            <TouchableOpacity style={styles.botaoCarrinho} onPress={handleNavegarParaCarrinho}>
                <Text>Ir para o Carrinho</Text>
            </TouchableOpacity>


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
                            key={`tecla_${item}`} // Append a unique identifier to the key
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
    caixa: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        width: '100vw',
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
    inputbox: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
        marginTop: 20,
        height: '20vh',
    },
    caixa_resul: {
        backgroundColor: '#332E2E',
        width: '90vw',
        height: 48,
        borderRadius: 100,
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        color: 'white',
    },
    caixa__codigo_value: {
        display: 'flex',
        width: '90vw', 
        marginBottom: 5,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        backgroundColor: '#332E2E',
        height: 48,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '800',
        fontSize: 24,
        color: 'white',
    },
    caixa__quant: {
        flexDirection: 'row',
        width: '90vw',
        color: '#332E2E',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    caixa__quant_value: {
        display: 'flex',
        marginBottom: 5,
        backgroundColor: '#332E2E',
        width: '50vw',
        height: '4vh', 
        borderRadius: 100,
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    teclado: {
        display: 'grid',
        position: 'absolute',
        bottom: 20,
        width: '90%',
        maxWidth: '400px', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
    },
    teclas: {
        display: "flex",
        height: '10.5vh',
        width: '24vw',
        maxWidth: 100,
        justifySelf: 'center',
        borderRadius: 10,
        backgroundColor: '#332E2E',
        border: 'none',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        justifyContent: "center",
        alignItems: "center"
    },
    teclas__apagar: {
        height: '10.5vh',
        gridColumn: 'span 2',
        backgroundColor: '#733333',
        borderRadius: 100,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        justifyContent: "center",
        alignItems: "center"
    },
    teclas__confirmar: {
        height: '10.5vh',
        gridColumn: 'span 3',
        backgroundColor: '#424B6A',
        borderRadius: 100,
        width: '100vw',
        border: 'none',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        justifyContent: "center",
        alignItems: "center"
    },
    borda_grossa: {
        border: '1px solid #D0B6A2',
    },
    textLight:{
        color: '#fff',
       
        alignItems: "center",
        fontSize:'24px',
        fontWeight: '800',
     
    },
    textDark:{
        color: '#000',

    },
});