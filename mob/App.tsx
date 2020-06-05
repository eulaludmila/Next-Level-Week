import React, {Fragment} from 'react';
import { StatusBar } from 'react-native';

//COlocado para fazer uma esperar para carregar as fontes
import {AppLoading} from 'expo';
import Routes from './src/routes';

//Importando as fontes
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading/>
  }

  return (
   
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes />
    </Fragment>
    
  );
}


