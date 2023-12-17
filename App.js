import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import cadastro from './screens/cadastro.js';
import login from './screens/login.js';
import amigos from './screens/amigos.js';
import conversas from './screens/conversas.js';
import buscarUsuario from './screens/buscarUsuario.js';
import mensagensDaConversa from './screens/mensagensDaConversa.js';
import { Alert } from 'react-native';

export default function App() {
  const [screen,setScreen] = useState('login')
  
  
  const stack = createStackNavigator();
 
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName={'Login'} >
        <stack.Screen name='Cadastro' component={cadastro} options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
        <stack.Screen name='Login' component={login} options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
        <stack.Screen name='Amigos' component={amigos}options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
        <stack.Screen name='Conversas' component={conversas}options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
        <stack.Screen name='Nova conversa' component={buscarUsuario}options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
        <stack.Screen name='Mensagens' component={mensagensDaConversa}options={{headerStyle: {
            backgroundColor: '#00BCCC',
          }}}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}


