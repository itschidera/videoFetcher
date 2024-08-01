import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favourites from '../screens/Favourites.js';
import { NavigationContainer } from "@react-navigation/native";
import Details from '../screens/Details.js';
import Home from '../screens/Home.js';
const Stack = createNativeStackNavigator();


const Router =()=> {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Favourites" component={Favourites} />
  </Stack.Navigator>

    </NavigationContainer>
    
  )
}
export default Router