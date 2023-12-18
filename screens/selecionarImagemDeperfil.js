import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
//import {AsyncStorage} from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App({ navigation, route}) {
    const {user,password} = route.params;
    const [src,setSrc] = useState('');
    const [imgUser,setImgUser] = useState('');
    const [previewDisplay,setPreviewDisplay] = useState(styles.preViewHidden)
    const obj = new Object();
    obj.mvc = new Object();
    obj.usuario = new Object()
    obj.mvc.class = "usuario";
    obj.mvc.method = "insert"
    obj.usuario.nome = user;
    obj.usuario.senha = password;
    obj.usuario.img = imgUser;
    const [value, setValue] = useState(null)

    const guardaValor = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            Alert.alert('Dados armazenados')
        }
        catch (error) {
            Alert.alert("Erro no armazenamento")
        }
    }

    useEffect(() => { }, [])
    return (
        <ImageBackground source={require('../img/rm222-mind-14.jpg')} style={styles.container} blurRadius={7}>
            <Image source={src} style={previewDisplay}>

            </Image>
            <Text style={styles.text}>Escolha uma uma foto de perfil</Text>
            <View style={styles.imagesContainner}>
                <TouchableOpacity style={styles.tOpacity} onPress={()=>{setSrc(require('../img/userAvatars/EuSabo.jpg'))
                setImgUser('../img/userAvatars/EuSabo.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image  style={styles.img} source={require('../img/userAvatars/EuSabo.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/GatuArrumado.jpg'))
                setImgUser('../img/userAvatars/GatuArrumado.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/GatuArrumado.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/ParaDeRir.jpg'))
                setImgUser('../img/userAvatars/ParaDeRir.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/ParaDeRir.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Smurfi.jpg'))
                setImgUser('../img/userAvatars/Smurfi.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Smurfi.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Xereque.jpg'))
                setImgUser('../img/userAvatars/Xereque.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Xereque.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Smile.jpg'))
                setImgUser('../img/userAvatars/Smile.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Smile.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Oxe.jpg'))
                setImgUser('../img/userAvatars/Oxe.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Oxe.jpg')}>

                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Makima.jpg'))
                setImgUser('../img/userAvatars/Makima.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Makima.jpg')}>

                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tOpacity}onPress={()=>{setSrc(require('../img/userAvatars/Jesus.jpg'))
                setImgUser('../img/userAvatars/Jesus.jpg');setPreviewDisplay(styles.preView)}}>
                    <Image style={styles.img} source={require('../img/userAvatars/Jesus.jpg')}>

                    </Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnEntrar}
                onPress={() => {
                    console.log(JSON.stringify(obj))
                    fetch('https://projeto-mobile.rogeriopalafoz1.repl.co',{
                      method:'POST', headers: {'contentType':'application/json'},body:JSON.stringify(obj)
                    }).then((response)=>response.json()).then((obj)=>{
                      navigation.navigate('Login')



                    }).catch((error)=>{Alert.alert('error',error)})
                }
                }>
                <Text style={styles.btnText}>Cadastrar</Text>
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
    input: {
        width: '70%',
        height: '5%',
        backgroundColor: 'white',
        borderRadius: 45,
        marginTop: '5%'
    },

    btn: {
        borderRadius: 10,
        marginTop: '5%',

    },
    btnEntrar: {
        borderRadius: 10,
        marginTop: '5%',
        backgroundColor: '#1EDEF9',
        width: '25%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        color: "#1E3CF9",
        marginTop: '5%',
        fontWeight: 'bold'
    },
    btnText: {
        fontWeight: 'bold'
    },
    tOpacity: {
        width: '31%',
        height: '32%',
        
        //backgroundColor: 'orange'
    },
    img: {
        width: '100%',
        height: '100%',
        marginLeft: '4%',
        marginTop: '4%',
       
        
    },
    imgSelected: {
        width: '100%',
        height: '100%',
        marginLeft: '4%',
        marginTop: '4%',
        borderWidth:1,

    },
    imagesContainner: {
        display:'flex',
        flexWrap:'wrap',
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        //backgroundColor: 'blue',
        justifyContent:'center'
    },
    preView:{
        marginTop:'2%',
        width:'55%',
        height:'30%',
        borderRadius:100,
        borderWidth:1,
        borderColor:'blue'
    },
    preViewHidden:{
        marginTop:'2%',
        width:'55%',
        height:'30%',
        borderRadius:100,
        borderWidth:1,
        borderColor:'blue',
        display:'none'
    }

});
