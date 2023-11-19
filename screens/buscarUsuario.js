import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({navigation,route}) {
  const {id} = route.params
  
  const [nome,setNome] = useState('')
  const [user1,setUser1] = useState(null)
  const recuperaValor = async(key)=>{
    try{
      const values =  await AsyncStorage.getItem(key)
      
      if(values !== null){
        
        //console.log(values)
        return values
      }
      return null
    }
    catch(error){
     return null
    }
  }
 
  return (

    <ImageBackground style={styles.container}>
        <Text>Informe o nome de usuário para conversar</Text>
        <TextInput style={styles.input} onChangeText={(t)=>{setNome(t)}}></TextInput>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          const obj = new Object()
          obj.usuario = new Object()
          obj.usuario.nome = nome
          obj.mvc = new Object()
          obj.mvc.class = 'usuario'
          obj.mvc.method = 'buscarUsuario'

          fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
            method:'Post', headers:{'content-type':'application/json'},body:JSON.stringify(obj)
          })
          .then((response)=>response.json())
          .then((obj)=>{
            objRequest = new Object();
            objRequest.usuario = new Object()
            objRequest.usuario.user1 = id;
            objRequest.usuario.user2 = obj.msg.id;
            objRequest.mvc = new Object()
            objRequest.mvc.class = 'conversa'
            objRequest.mvc.method = 'novaConversa'
           
            fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
              method:'Post', headers:{'content-type':'application/json'},body:JSON.stringify(objRequest)
            })
            .then((response)=>response.json())
            .then((objResponse)=>{if(objResponse.msg == 'OK'){navigation.navigate('Conversas')}else{Alert.alert('Falha')}})
            .catch((error)=>{
              Alert.alert('erro',error.message)
            })
          //   let xml = new XMLHttpRequest()
          //   xml.open('POST','https://projeto-mobile.rogeriopalafoz1.repl.co',true);
          //   xml.setRequestHeader('content-type','application/json')

          //   xml.onreadystatechange = ()=>{
          //     if(xml.readyState == 4 && xml.status == 200){
          //       console.log(xml.responseText)
          //     }
          //   }
          //   xml.send(JSON.stringify(objRequest))
          // })
          // .catch((error)=>{
          //   Alert.alert('Error',error.message)
          })
        
  }}>
          <Image source={require('../img/add.png')}/>
        </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    backgroundColor: '#a5c3e6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    alignItems:'center'
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
    textAlign:'center'
  },
  btn:{
    
   
    backgroundColor:'#7C93AC',
    width:'20%',
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
     marginTop:'5%'

  },
  scroll:{
    width:'100%',
    flex:1,
    flexGrow:1,
    flexDirection:'column',
    
  }
});
