import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import img1 from '../img/userAvatars/EuSabo.jpg';
import img2 from '../img/userAvatars/GatuArrumado.jpg';
import img3 from '../img/userAvatars/ParaDeRir.jpg';
import img4 from '../img/userAvatars/Smurfi.jpg';
import img5 from '../img/userAvatars/Xereque.jpg';
import img6 from '../img/userAvatars/Smile.jpg';
import img7 from '../img/userAvatars/Oxe.jpg';
import img8 from '../img/userAvatars/Makima.jpg';
import img9 from '../img/userAvatars/Jesus.jpg';
export default function App({conversas,users,myId,navigation,intervalToClear}) {

   //let avatar = require(users[i].avatar)
    const searchUserName = (array,id)=>{
      for(let i = 0;i < array.length;i++){
        if(array[i].id == id){
          return array[i].nome;
        }
      }
      return null;
    }
    const searchUserAvatar = (array,id)=>{
      for(let i = 0;i < array.length;i++){
        if(array[i].id == id){
          if('../img/userAvatars/EuSabo.jpg' == array[i].avatar){
            return img1;
          }
          if('../img/userAvatars/GatuArrumado.jpg' == array[i].avatar){
            return img2;
          }
          if('../img/userAvatars/ParaDeRir.jpg' == array[i].avatar){
            return img3;
          }
          if('../img/userAvatars/Smurfi.jpg' == array[i].avatar){
            return img4;
          }
          if('../img/userAvatars/Xereque.jpg' == array[i].avatar){
            return img5;
          }
          if('../img/userAvatars/Smile.jpg' == array[i].avatar){
            return img6;
          }
          if('../img/userAvatars/Oxe.jpg' == array[i].avatar){
            return img7;
          }
          if('../img/userAvatars/Makima.jpg' == array[i].avatar){
            return img8;
          }
          return img9;
        }
      }
      return null;
    }
    const searchUserAvatarUrl = (array,id)=>{
      for(let i = 0;i < array.length;i++){
        if(array[i].id == id){
          if('../img/userAvatars/EuSabo.jpg' == array[i].avatar){
            return '../img/userAvatars/EuSabo.jpg';
          }
          if('../img/userAvatars/GatuArrumado.jpg' == array[i].avatar){
            return '../img/userAvatars/GatuArrumado.jpg';
          }
          if('../img/userAvatars/ParaDeRir.jpg' == array[i].avatar){
            return '../img/userAvatars/ParaDeRir.jpg';
          }
          if('../img/userAvatars/Smurfi.jpg' == array[i].avatar){
            return '../img/userAvatars/Smurfi.jpg';
          }
          if('../img/userAvatars/Xereque.jpg' == array[i].avatar){
            return '../img/userAvatars/Xereque.jpg';
          }
          if('../img/userAvatars/Smile.jpg' == array[i].avatar){
            return '../img/userAvatars/Smile.jpg';
          }
          if('../img/userAvatars/Oxe.jpg' == array[i].avatar){
            return '../img/userAvatars/Oxe.jpg';
          }
          if('../img/userAvatars/Makima.jpg' == array[i].avatar){
            return '../img/userAvatars/Makima.jpg';
          }
          return '../img/userAvatars/Jesus.jpg';
        }
      }
      return null;
    }
    elements = new Array();
    for(let i = 0;i < conversas.length;i++){
        
        elements.push(
          
            <TouchableOpacity onPress={()=>{navigation.navigate('Mensagens',{idConversa:conversas[i].id,idUser:myId,ScreenName:conversas[i].user1 == myId?searchUserName(users,conversas[i].user2):searchUserName(users,conversas[i].user1),intervalToClear:intervalToClear,url:conversas[i].user1 == myId?searchUserAvatarUrl(users,conversas[i].user2):searchUserAvatarUrl(users,conversas[i].user1)})}} key={conversas[i].id} style={styles.containerPressable}>

              <Image style={styles.imageUser} key={i} source={conversas[i].user1 == myId?searchUserAvatar(users,conversas[i].user2):searchUserAvatar(users,conversas[i].user1)}/>
              <Text key={i+1} style={styles.UserName}>{conversas[i].user1 == myId?searchUserName(users,conversas[i].user2):searchUserName(users,conversas[i].user1)}</Text>
              
              
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
    //backgroundColor: '#a5c3e6',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection:'column',
    alignItems:'flex-end'
  },
  containerPressable: {
   
    width:'100%',
    height:50,
    //backgroundColor: '#74F8F2',
    
    justifyContent: 'flex-start',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:'2%',
    //borderBottomWidth:1,
  },
  input:{
    width:'70%',
    height:'5%',
    backgroundColor:'white',
    borderRadius:45,
    marginTop:'5%'
  },
  UserName:{
    fontSize:20,
    color: "#1E3CF9",
    textAlign:'center',
    marginLeft:'1%',
    fontWeight:'bold'
  },
  lastMsg:{

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
    width:50,
    height:50,
    borderRadius:30
  }
});
