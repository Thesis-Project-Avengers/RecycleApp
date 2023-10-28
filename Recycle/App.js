import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from "./components/OnBroadingScreen";
import HomeScreen from './screens/HomeScreen';
import ExapmleScreen from './screens/ExapmleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  //Onboarding 
  const [isAppFirstLaunched, setIsAppLastLaunched]= React.useState(false)
 
  const fetch = async () => {
   const appData = await AsyncStorage.getItem("isAppFirstLaunched")
   console.log(appData);
   if(appData == null){
     setIsAppLastLaunched(true)
     AsyncStorage.setItem('isAppLastLaunched','false')
   }else{
     setIsAppLastLaunched(false)
   }
    
 }
  
   React.useEffect(()=>{
     fetch()
   }, [])
  return (
   
    isAppFirstLaunched != null&&(
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {isAppFirstLaunched && (
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
         
        />)}
        
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen } />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Exapmle" component={ExapmleScreen} options={{ headerShown: false }} />
        {/* here you  put your screens like the previous one  */}
      </Stack.Navigator>
    </NavigationContainer>
    )
    // <NavigationContainer >
    //   <Stack.Navigator initialRouteName='Home'>
    //     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    //     <Stack.Screen name="Exapmle" component={ExapmleScreen} options={{ headerShown: false }} />
    //     {/* here you  put your screens like the previous one  */}
    //   </Stack.Navigator>

    // </NavigationContainer>
    
  );
}


