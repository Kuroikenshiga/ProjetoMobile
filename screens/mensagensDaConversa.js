import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Mensage from '../comps/msgComponent.js';
export default function App({navigation,route}) {
const {idConversa,idUser} = route.params;
const rolagem = ScrollView;
const [component,setComponent] = useState(null)
const [id,setId] = useState(null)
const [msg,setMsg] = useState('');
const clearData = async()=>{
   
    try{
       AsyncStorage.setItem('meuId','')
      Alert.alert('Dados limpos')
    }
    catch(error){
      Alert.alert('Erro ao limpar os dados',error.message)
    
   }
}

const recuperaValor = async(key)=>{
  try{
    const values =  await AsyncStorage.getItem(key)
    
    if(values !== null){
      
     // console.log(values)
      return values
    }
    return null
  }
  catch(error){
   return null
  }
}



 useEffect(()=>{
  
    setInterval(()=>{
      let obj = new Object();
    obj.usuario = new Object();
    obj.usuario.conversa = idConversa;
    obj.mvc = new Object();
    obj.mvc.class = 'mensagem';
    obj.mvc.method = 'listaMensagens';
    console.log(1)
    fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
    method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(obj)
    })
    .then((response)=>response.json())
    .then((objResponse)=>{setComponent(<Mensage msgs={objResponse.msg}myId={idUser} />)})
    
    .catch((error)=>{console.log(error)})
    },1000)
    // let xml = new XMLHttpRequest()
    //                     xml.open('POST','https://projeto-mobile.rogeriopalafoz1.repl.co',true);
    //                     xml.setRequestHeader('content-type','application/json')
            
    //                     xml.onreadystatechange = ()=>{
    //                       if(xml.readyState == 4 && xml.status == 200){
    //                         console.log(xml.responseText)
    //                       }
    //                     }
    //                     xml.send(JSON.stringify(obj))
 },[])
 
  return (

    <ImageBackground style={styles.container}>
      
        

         <ScrollView contentContainerStyle={styles.scroll2} style={styles.scroll}> 
         {component}
            
            
          </ScrollView>
        
        
        <View style={styles.bottom}>
            <TextInput onChangeText={(texto)=>{setMsg(texto)}} style={styles.input} />
            <TouchableOpacity  style={styles.btn} onPress={()=>{
             let  now = new Date()
            obj = new Object();
            obj.mvc = new Object();
            obj.mvc.class = 'mensagem';
            obj.mvc.method = 'novaMensagem';
            obj.usuario = new Object();
            obj.usuario.remetente = idUser;
            obj.usuario.data = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()
            obj.usuario.hora = (now.getHours()*60)+now.getMinutes()
            obj.usuario.mensagem = msg;
            obj.usuario.conversa = idConversa;
            
            // console.log(id)
            //clearData()
        
            fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
            method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(obj)
            })
            .then((response)=>response.json())
            .then((objResponse)=>{
              let obj = new Object();
            obj.usuario = new Object();
            obj.usuario.conversa = idConversa;
            obj.mvc = new Object();
            obj.mvc.class = 'mensagem';
            obj.mvc.method = 'listaMensagens';
            console.log(1)
            fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
            method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(obj)
            })
            .then((response)=>response.json())
            .then((objResponse)=>{setComponent(<Mensage msgs={objResponse.msg}myId={idUser} />)})
            
            .catch((error)=>{console.log(error)})
            })
            
            .catch((error)=>{console.log(error)});

                

                //  let xml = new XMLHttpRequest()
                //         xml.open('POST','https://projeto-mobile.rogeriopalafoz1.repl.co',true);
                //         xml.setRequestHeader('content-type','application/json')
            
                //         xml.onreadystatechange = ()=>{
                //           if(xml.readyState == 4 && xml.status == 200){
                //             console.log(xml.responseText)
                //           }
                //         }
                //         xml.send(JSON.stringify(obj))
            
            
            }}>
            <Image source={require('../img/add.png')}/>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
   
    flex: 1,
    backgroundColor: '#a5c3e6',
    alignItems: 'center',
    
    flexDirection:'column',
    alignItems:'center',
    
  },
  input:{
    width:'80%',
    height:'76%',
    backgroundColor:'white',
    borderRadius:45,
    marginRight:'2%'
  },
  text:{
    fontSize:15,
    color: "white",
    textAlign:'center'
  },
  btn:{
    
   
    backgroundColor:'#7C93AC',
    width:'16%',
    height:'80%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    

  },
  scroll:{
    width:'100%',
    
  },
  scroll2:{
    paddingBottom:'20%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  bottom:{
    alignSelf:'baseline',
    width:'100%',
    height:'10%',
    position:'absolute',
    flexDirection:'row',
    justifyContent:'flex-end',
    bottom:0
  }
});
