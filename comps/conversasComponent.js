import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({conversas,users,myId,navigation,intervalToClear}) {
    
    const searchUserName = (array,id)=>{
      for(let i = 0;i < array.length;i++){
        if(array[i].id == id){
          return array[i].nome;
        }
      }
      return null;
    }

    elements = new Array();
    for(let i = 0;i < conversas.length;i++){
        elements.push(
          
            <TouchableOpacity onPress={()=>{navigation.navigate('Mensagens',{idConversa:conversas[i].id,idUser:myId,intervalToClear:intervalToClear})}} key={conversas[i].id} style={styles.containerPressable}>
              <Image style={styles.imageUser} key={i} source={require('../img/user.png')}/>
              <Text key={i+1} style={styles.text}>{conversas[i].user1 == myId?searchUserName(users,conversas[i].user2):searchUserName(users,conversas[i].user1)}</Text>
              
            </TouchableOpacity>
          
          )
    }

    
    
    return (

        <View style={styles.container}>
        
            {elements}
            
     
           
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    backgroundColor: '#a5c3e6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection:'column',
    alignItems:'flex-end'
  },
  containerPressable: {
   
    width:'100%',
    backgroundColor: '#a5c3e6',
    
    justifyContent: 'flex-start',
    flexDirection:'row',
    
  },
  input:{
    width:'70%',
    height:'5%',
    backgroundColor:'white',
    borderRadius:45,
    marginTop:'5%'
  },
  text:{
    fontSize:20,
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
    position:'absolute',
    right:0,
    bottom:0

  },
  scroll:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  imageUser:{
    width:30,
    height:35
  }
});
