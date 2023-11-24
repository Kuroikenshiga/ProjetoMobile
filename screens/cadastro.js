import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import {StyleSheet, Text, View,ImageBackground,TextInput,Button, Alert } from 'react-native';
//import {AsyncStorage} from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation}) {
  const[nome,setNome] = useState("");
  const[senha,setSenha] = useState("");
  const obj = new Object();
  obj.mvc = new Object();
  obj.usuario = new Object()
  obj.mvc.class = "usuario";
  obj.mvc.method = "insert"
  obj.usuario.nome = nome;
  obj.usuario.senha = senha;
  const [value,setValue] = useState('')

  const guardaValor =  async(key,value)=>{
    try{
      await AsyncStorage.setItem(key,value);
      Alert.alert('Dados armazenados')
    }
    catch(error){
      Alert.alert("Erro no armazenamento")
    }
  }
  
  useEffect(()=>{},[])
  return (
    <ImageBackground source={require('../img/dark.jpg')} style={styles.container}>
        <Text style={styles.text}>
            Nome de usuario
        </Text>
        <TextInput style={styles.input} onChangeText={(nome)=>{setNome(nome)}} />
        
        <Text style={styles.text}>
            Senha
        </Text>
        <TextInput style={styles.input} onChangeText={(senha)=>{setSenha(senha)}}/>
        <View style={styles.btn}><Button title='Cadastrar' color='green' 
          onPress={()=>{
              fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(obj)
              }).then((response)=>response.json()).then((obj)=>{
                navigation.navigate('Login')
                
                

              }).catch((error)=>{Alert.alert('error',error)})
            }
          }
        
        /></View>
        <Text style={styles.text}>{value}</Text>
        
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
