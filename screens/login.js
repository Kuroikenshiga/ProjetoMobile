import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert,StyleSheet, Text, View,ImageBackground,TextInput,Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation}) {
//Beggin data section//
  const[nome,setNome] = useState("");
  const[senha,setSenha] = useState("");
  const [responset,setResponset] = useState(null)
  const obj = new Object();
  obj.mvc = new Object();
  obj.usuario = new Object()
  obj.mvc.class = "usuario";
  obj.mvc.method = "login"
  obj.usuario.nome = nome;
  obj.usuario.senha = senha;
//End data section//
const clearData = async()=>{
   
  try{
     AsyncStorage.setItem('meuId','')
    Alert.alert('Dados limpos')
  }
  catch(error){
    Alert.alert('Erro ao limpar os dados',error.message)
  
 }
}
const guardaValor =  async(key,value)=>{
  value = JSON.stringify(value)
  try{
    await AsyncStorage.setItem(key,value);
    console.log('Dados armazenados')
  }
  catch(error){
    Alert.alert("Erro no armazenamento",error.message)
  }
}


const recuperaValor = async(key)=>{
  try{
    const values =  await AsyncStorage.getItem(key)
    
    if(values !== null){
      
      console.log(values+89)
      return values
    }
    return null
  }
  catch(error){
   return null
  }
}

useEffect(()=>{
  recuperaValor('meuId').then((id)=>{ if(id != null){
    let objV = new Object();
    objV.mvc = new Object();
    objV.usuario = new Object()
    objV.mvc.class = "usuario";
    objV.mvc.method = "verificaUsuario";
    objV.usuario.id = id;
    fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(objV)
              }).then((response)=>{ 
              return response.json()})
              .then((obj1)=>{ console.log(JSON.stringify(obj1))
                if(obj1.msg != "NA"){
               navigation.navigate('Conversas',{id:obj1.msg})}
              else{Alert.alert('Aviso',"Usuario não encotrado");clearData()}})
              .catch((error)=>{})
  }
  else{
   console.log(id+'////')
  }})
  
  
},[])


  return (
    <ImageBackground source={require('../img/rm222-mind-14.jpg')} style={styles.container}>
        <Text style={styles.text}>
            Nome de usuario
        </Text>
        <TextInput style={styles.input} onChangeText={(nome)=>{setNome(nome)}} />
        
        <Text style={styles.text}>
            Senha
        </Text>
        <TextInput style={styles.input} onChangeText={(senha)=>{setSenha(senha)}}/>
        <TouchableOpacity style={styles.btnEntrar} onPress={()=>{
              fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(obj)
              }).then((response)=>{ 
              return response.json()})
              .then((obj1)=>{console.log(JSON.stringify(obj1))
                if(obj1.msg != "NA"){ guardaValor('meuId',obj1.msg)
               navigation.navigate('Conversas',{id:obj1.msg})}
              else{Alert.alert('Aviso',"Usuario não encotrado")}})
              .catch((error)=>{})
              
            }
          }>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
          
        
      
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Cadastro')}}> 
          <Text style={styles.btnText}>Cadastrar-me</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
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
    fontSize:18,
    color: "#1E3CF9",
    marginTop:'5%',
    fontWeight:'bold'
  },
  btn:{
    borderRadius:10,
    marginTop:'5%',
    backgroundColor:'#FEFE40',
    width:'25%',
    height:'5%',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'bold'
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
  btnText:{
    fontWeight:'bold'
  }
});
