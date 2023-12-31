import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Chats from '../comps/conversasComponent.js'

export default function App({navigation,route}) {
  const {id} = route.params
  //console.log(id+'0000')

const [component,setComponent] = useState(<Chats conversas={[]} myId={id} users={[]}/>)
//const [id,setId] = useState(null)

const clearData = async()=>{

    try{
       AsyncStorage.setItem('meuId','')
      console.log('Dados limpos')
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
  navigation.setOptions({
    headerRight:()=>(<TouchableOpacity style={styles.btnExit} onPress={()=>{clearData();navigation.navigate('Login')}}><Text style={styles.text}>Sair</Text></TouchableOpacity>)
  })
  navigation.addListener('blur',()=>{
    clearInterval(refresher)
  })
    let refresher;
    navigation.addListener('focus',()=>{
      let isPaused = false;
      
        
        refresher = setInterval(()=>{
          if(!isPaused){
            isPaused = true;
          let obj = new Object();
          obj.id = id;
          obj.mvc = new Object();
          obj.mvc.class = 'conversa';
          obj.mvc.method = 'listarConversas';
          
          fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
          method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(obj)
          
          })
          .then((response)=>response.json())
          .then((objResponse)=>{setComponent(<Chats intervalToClear={refresher} navigation={navigation} conversas={objResponse.chats} users={objResponse.users} myId={id}/>); console.log('Conversas');isPaused = false})
          
          .catch((error)=>{console.log(error)})
        }
        },500)
      
    })
    

  return ()=>{
    clearInterval(refresher)
  }
 },[])
  return (

    <ImageBackground style={styles.container} source={require('../img/rm222-mind-14.jpg')} blurRadius={7}>
         <ScrollView contentContainerStyle={styles.scroll2} style={styles.scroll}> 
         {component}
            
          </ScrollView>
        
        
        <TouchableOpacity  style={styles.btn}  onPress={()=>{
         
          navigation.navigate('Nova conversa',{id:id})
          // console.log(id)
          //clearData()
        
            
             

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
          <Image source={require('../img/NewChat.png')} style={{width:30}}/>
        </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    //backgroundColor: '#a5c3e6',
    alignItems: 'center',
    
    flexDirection:'column',
    alignItems:'center',
    
    
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
    color: "#3C8BA0",
    textAlign:'center',
    fontWeight:'bold'
  },
  btn:{
    
   
    backgroundColor:'#3C8BA0',
    width:'20%',
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
    position:'absolute',
    right:0,
    bottom:0

  },
  scroll:{
    width:'100%',
  },
  scroll2:{
   
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  btnExit:{
    width:'40%',
    height:'70%',
    backgroundColor:'#64DCFC',
    borderRadius:50,
    justifyContent:'center'
  }
});
