import { View, Text,Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

const ChooseScreen = () => {
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",justifyContent:"space-around",padding:10}}>
            

        <Text style={{alignSelf:"center",fontSize:20,marginTop:30,color:"black",fontWeight:700}}> Choose your role </Text>
        <View style={{flex:1,justifyContent:"center",justifyContent:"center",padding:10,gap:30}}>

            <TouchableOpacity style={styles.collectorContainer} >
            <Image   source={require("../assets/collector.png")} style={{width:"80%",height:"100%"}} />
            <Text style={{color:"#93c572",fontSize:20}} >Collector</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.collectorContainer} >
            <Image   source={require("../assets/accumulator.png")} style={{width:"80%",height:"100%"}} />
            <Text style={{color:"#93c572",fontSize:20}} >Accumulator</Text>
            </TouchableOpacity>

            </View>
    </SafeAreaView>
  )
}

export default ChooseScreen
const styles = StyleSheet.create({
    collectorContainer:{
        flexDirection:'column', 
        alignItems:"center",
        justifyContent:"center",
        height:"40%",
        borderWidth:1,
        borderColor:"#93c572",
        borderRadius:50,
        padding:20,
    }
  
  });
  