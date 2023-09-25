import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Indisponivel() {
  return (
    <View style={styles.view}>
     
      <Text style={styles.text}>Conteúdo Indisponivel</Text>
      <Text style={styles.text}>O Next não suporta resoluções abaixo de 200px de largura.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    width: '100vw',
    height: "100vh",
    backgroundColor: "#000",
  },
  text: {
    textAlign: "center",
    color: "#fff",
 
  }
 

})