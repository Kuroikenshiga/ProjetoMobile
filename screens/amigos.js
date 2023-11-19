import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation}) {

  
  return (
    <ImageBackground source={require('../img/dark.jpg')} style={styles.container}>
        <View><Button title='Adicionar amigos'></Button></View>
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input:{
    width:'70%',
    height:'5%',
    backgroundColor:'white',
    borderRadius:45,
    marginTop:'5%'
  },
  text:{
    fontSize:15,
    color: "white",
    marginTop:'5%'
  },
  btn:{
    borderRadius:10,
    marginTop:'5%',
    
  }
});
