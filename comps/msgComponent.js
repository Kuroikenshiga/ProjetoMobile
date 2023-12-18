import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground,TextInput,Button,TouchableOpacity,Image,ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({msgs,myId}) {
    const [styleText,setStyleText] = useState(null);
    
     

    elements = new Array();
    for(let i = 0;i < msgs.length;i++){
        elements.push(
        
            <View style={styles.container} key={i}>< Text key={msgs[i].id} style={msgs[i].remetente == myId?styles.msgRight:styles.msgLeft}>{msgs[i].mensagem}<Text style={styles.timeText}>{"\n"+parseInt(parseInt(msgs[i].hora)/60)+":"+parseInt(msgs[i].hora)%60}</Text></Text></View>
            
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
    textAlign:'center',
    
    
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
  textContainer:{
    width:'100%'

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
  },
  msgRight:{
    backgroundColor:'#9FD7D4',
    textAlign:'left',
    fontSize:14,
    maxWidth:'70%',
    minWidth:'30%',
    marginTop:'2%',
    borderRadius:10,
    padding:'2%',
    alignItems:'flex-end'
  },
  msgLeft:{
    backgroundColor:'#879997',
    alignSelf:'flex-start',
    fontSize:14,
    maxWidth:'70%',
    marginTop:'2%',
    borderRadius:10,
    padding:'2%',
    minWidth:'30%',
  },
  timeText:{
    fontSize:12,
    // backgroundColor:'orange',
    // display:'flex',
    // alignSelf:'flex-end'
  }
});
