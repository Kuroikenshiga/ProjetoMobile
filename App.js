import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import cadastro from './screens/cadastro.js';
import login from './screens/login.js';
import amigos from './screens/amigos.js';
import conversas from './screens/conversas.js';
import buscarUsuario from './screens/buscarUsuario.js';
import mensagensDaConversa from './screens/mensagensDaConversa.js';
import selectAvatar from './screens/selecionarImagemDeperfil.js'
import { Alert } from 'react-native';

export default function App() {
  const [screen,setScreen] = useState('login')
  
  
  const stack = createStackNavigator();
 
  return (
    <NavigationContainer >

      <stack.Navigator screenOptions={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}} initialRouteName={'Login'} >

        <stack.Screen name='Cadastro' component={cadastro} />

        <stack.Screen name='Login' component={login} />

        <stack.Screen name='Amigos' component={amigos}/>

        <stack.Screen name='Conversas' component={conversas} options={({navigation,route})=>({
          headerRight:()=>(<TouchableOpacity></TouchableOpacity>)
        })}/>

        <stack.Screen name='Nova conversa' component={buscarUsuario}/>

        <stack.Screen name='Mensagens' component={mensagensDaConversa} options={({ route }) => ({ title: route.params.ScreenName,headerRight:route.params.imageUser})}/>
           <stack.Screen  name='Selecionar imagem de perfil' component={selectAvatar}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}


