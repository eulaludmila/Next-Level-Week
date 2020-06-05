import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; //usando navegação em pilha

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

//Ele irá realizar a navegação
const AppStack = createStackNavigator();


const Routes = () => {
    return(
        //Funciona parecido com o BrowserRouter da web
        <NavigationContainer>
            {/* headerMode="none": tira o cabeçalho */}
            <AppStack.Navigator 
            headerMode="none" 
            screenOptions={{
                cardStyle: {
                    backgroundColor:'#f0f0f5'
                }
            }}>
                {/* Para cada rota(tela) da aplicação terá um AppStack.Screen */}
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Points" component={Points}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )


}

export default Routes;
