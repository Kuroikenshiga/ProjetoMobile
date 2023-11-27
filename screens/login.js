import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert,StyleSheet, Text, View,ImageBackground,TextInput,Button } from 'react-native';
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
    Alert.alert('Dados armazenados')
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
               navigation.navigate('Conversas')}
              else{Alert.alert('Aviso',"Usuario não encotrado");clearData()}})
              .catch((error)=>{})
  }
  else{
   console.log(id+'////')
  }})
  
  
},[])


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
        <View style={styles.btn}><Button title='Entrar' color='green' 
          onPress={()=>{
              fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(obj)
              }).then((response)=>{ 
              return response.json()})
              .then((obj1)=>{Alert.alert(JSON.stringify(obj1))
                if(obj1.msg != "NA"){ guardaValor('meuId',obj1.msg)
               navigation.navigate('Conversas')}
              else{Alert.alert('Aviso',"Usuario não encotrado")}})
              .catch((error)=>{})
              
            }
          }
        
        /></View>
        <View style={styles.btn}><Button title='Me cadastrar' color='#00000000' onPress={()=>{navigation.navigate('Cadastro')}}/></View>
        <View style={styles.btn}><Button title='Amigos' color='#00000000' onPress={()=>{console.log(teste)+'23'}}/></View>
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
