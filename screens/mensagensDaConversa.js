import { StatusBar } from 'expo-status-bar';
import { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img1 from '../img/userAvatars/EuSabo.jpg';
import img2 from '../img/userAvatars/GatuArrumado.jpg';
import img3 from '../img/userAvatars/ParaDeRir.jpg';
import img4 from '../img/userAvatars/Smurfi.jpg';
import img5 from '../img/userAvatars/Xereque.jpg';
import img6 from '../img/userAvatars/Smile.jpg';
import img7 from '../img/userAvatars/Oxe.jpg';
import img8 from '../img/userAvatars/Makima.jpg';
import img9 from '../img/userAvatars/Jesus.jpg';
import Mensage from '../comps/msgComponent.js';

function getImage(url){
  
    if('../img/userAvatars/EuSabo.jpg' == url){
      return img1;
    }
    if('../img/userAvatars/GatuArrumado.jpg' == url){
      return img2;
    }
    if('../img/userAvatars/ParaDeRir.jpg' == url){
      return img3;
    }
    if('../img/userAvatars/Smurfi.jpg' == url){
      return img4;
    }
    if('../img/userAvatars/Xereque.jpg' == url){
      return img5;
    }
    if('../img/userAvatars/Smile.jpg' == url){
      return img6;
    }
    if('../img/userAvatars/Oxe.jpg' == url){
      return img7;
    }
    if('../img/userAvatars/Makima.jpg' == url){
      return img8;
    }
    return img9;
  
}




export default function App({ navigation, route}) {
  //LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state',])
  const { idConversa, idUser, intervalToClear,url } = route.params;
 // console.log(url)
  const textInput = useRef();
  const clearField = ()=>{

    textInput.current.clear()
  }
  const [component, setComponent] = useState(null)
  const [id, setId] = useState(null)
  const [msg, setMsg] = useState('');
  const [icon, setIcon] = useState(require('../img/chat.png'))
  const [focused, setFocused] = useState(false)
  const clearData = async () => {

    try {
      AsyncStorage.setItem('meuId', '')
      Alert.alert('Dados limpos')
    }
    catch (error) {
      Alert.alert('Erro ao limpar os dados', error.message)

    }
  }

  const recuperaValor = async (key) => {
    try {
      const values = await AsyncStorage.getItem(key)

      if (values !== null) {

        // console.log(values)
        return values
      }
      return null
    }
    catch (error) {
      return null
    }
  }

  let countRefresh = 0;

  useEffect(() => {
    navigation.setOptions({headerRight:()=>(<Image style={styles.imageUser} source={getImage(url)}/>)})
    //clearInterval(intervalToClear)
    let isPaused = false;
    const intervalo = setInterval(() => {
      countRefresh++;
      

      if (!isPaused) {
        isPaused = true;
        let obj = new Object();
        obj.usuario = new Object();
        obj.usuario.conversa = idConversa;
        obj.mvc = new Object();
        obj.mvc.class = 'mensagem';
        obj.mvc.method = 'listaMensagens';
        console.log(countRefresh)
        fetch('https://projeto-mobile.rogeriopalafoz1.repl.co', {
          method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj)
        })
          .then((response) => response.json())
          .then((objResponse) => { setComponent(<Mensage msgs={objResponse.msg} myId={idUser} interval={intervalo} />); isPaused = false })

          .catch((error) => { console.log(error) })
      }
    }, 1000)
    // let xml = new XMLHttpRequest()
    //                     xml.open('POST','https://projeto-mobile.rogeriopalafoz1.repl.co',true);
    //                     xml.setRequestHeader('content-type','application/json')

    //                     xml.onreadystatechange = ()=>{
    //                       if(xml.readyState == 4 && xml.status == 200){
    //                         console.log(xml.responseText)
    //                       }
    //                     }
    //                     xml.send(JSON.stringify(obj))
    return () => {
      
      clearInterval(intervalo);
    }
  }, [])

  return (

    <ImageBackground style={styles.container} blurRadius={10} source={require('../img/rm222-mind-14.jpg')}>



      <ScrollView contentContainerStyle={styles.scroll2} style={styles.scroll}>
        {component}


      </ScrollView>


      <View style={styles.bottom}>
        <TextInput ref={textInput} multiline={true} onChangeText={(texto) => { setMsg(texto) }} style={styles.input} />
        <TouchableOpacity style={styles.btn} onPress={() => {
          if(msg == ""){
            return 0
          }
          clearField();
          setMsg("")
          let now = new Date()
          obj = new Object();
          obj.mvc = new Object();
          obj.mvc.class = 'mensagem';
          obj.mvc.method = 'novaMensagem';
          obj.usuario = new Object();
          obj.usuario.remetente = idUser;
          
          //obj.usuario.hora = (now.getHours() * 60) + now.getMinutes()
          obj.usuario.mensagem = msg;
          obj.usuario.conversa = idConversa;

          // console.log(id)
          //clearData()

          fetch('https://projeto-mobile.rogeriopalafoz1.repl.co', {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj)
          })
            .then((response) => response.json())
            .then((objResponse) => {
              let obj = new Object();
              obj.usuario = new Object();
              obj.usuario.conversa = idConversa;
              obj.mvc = new Object();
              obj.mvc.class = 'mensagem';
              obj.mvc.method = 'listaMensagens';
              console.log(1)
              fetch('https://projeto-mobile.rogeriopalafoz1.repl.co', {
                method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj)
              })
                .then((response) => response.json())
                .then((objResponse) => { setComponent(<Mensage msgs={objResponse.msg} myId={idUser} />) })

                .catch((error) => {console.log('1°') })
            })

            .catch((error) => { console.log('2°') });



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
          <Image source={icon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
   // backgroundColor: '#a5c3e6',
    alignItems: 'center',

    flexDirection: 'column',
    alignItems: 'center',

  },
  input: {
    width: '80%',
    height: '76%',
    backgroundColor: 'white',
    borderRadius: 45,
    marginRight: '2%'
  },
  text: {
    fontSize: 15,
    color: "white",
    textAlign: 'center'
  },
  btn: {


    backgroundColor: '#7C93AC',
    width: '16%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,


  },
  scroll: {
    width: '100%',

  },
  scroll2: {
    paddingBottom: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bottom: {
    alignSelf: 'baseline',
    width: '100%',
    height: '10%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0
  },
  imageUser:{
    width:50,
    height:50,
    borderRadius:30
  }
});
