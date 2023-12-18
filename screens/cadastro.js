import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import {StyleSheet, Text, View,ImageBackground,TextInput,Button, Alert, TouchableOpacity } from 'react-native';
//import {AsyncStorage} from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation}) {
  const[nome,setNome] = useState("");
  const[senha,setSenha] = useState("");
  const obj = new Object();
  obj.mvc = new Object();
  obj.usuario = new Object()
  obj.usuario.nome = nome;
  obj.mvc.class = "usuario";
  obj.mvc.method = "verificaNomeJaEmUso";

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
    <ImageBackground source={require('../img/rm222-mind-14.jpg')} style={styles.container}>
        <Text style={styles.text}>
            Insira seu nome de usuário
        </Text>
        <TextInput style={styles.input} onChangeText={(nome)=>{setNome(nome)}} />
        
        <Text style={styles.text}>
            Insira uma senha
        </Text>
        <TextInput style={styles.input} onChangeText={(senha)=>{setSenha(senha)}}/>
        <TouchableOpacity style={styles.btnEntrar}
          onPress={()=>{
            // let xml = new XMLHttpRequest()
            // xml.open('POST','https://projeto-mobile.rogeriopalafoz1.repl.co',true);
            // xml.setRequestHeader('content-type','application/json')

            // xml.onreadystatechange = ()=>{
            //   if(xml.readyState == 4 && xml.status == 200){
            //     console.log(xml.responseText)
            //   }
            // }
            // xml.send(JSON.stringify(obj))
            if(nome == "" || senha == ""){
              Alert.alert('Preencha todos os campos');
              return
            }
              fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(obj)
              }).then((response)=>response.json()).then((obj)=>{
                console.log(JSON.stringify(obj))
                if(obj.msg == "OK"){
                  navigation.navigate('Selecionar imagem de perfil',{user:nome,password:senha})
                }
                else{
                  Alert.alert("Atenção",obj.msg)
                }
                

              }).catch((error)=>{Alert.alert('error')})
            }
          }>
            <Text>Próximo</Text>
          </TouchableOpacity>
        
       
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
  
  btn:{
    borderRadius:10,
    marginTop:'5%',
   
  },
  btnEntrar:{
    borderRadius:10,
    marginTop:'5%',
    backgroundColor:'#1EDEF9',
    width:'25%',
    height:'5%',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'bold'
  },
  text:{
    fontSize:18,
    color: "#1E3CF9",
    marginTop:'5%',
    fontWeight:'bold'
  },
});
