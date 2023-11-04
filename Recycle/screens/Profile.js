import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <SafeAreaView style={{padding:"40%"}}>
        <View style={styles.returnPoints} >
        <View style={styles.return} >
            <Text style={{textAlign:"center"}}>return</Text>
          </View>
          <View style={styles.points} >
            <Text style={{textAlign:"center",color:"white",fontSize:"16"}}>points</Text>
          </View>
        </View>  

        <View style={styles.imageTextName} >
        

        </View>


    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  returnPoints:{
    flexDirection:"row", 
    justifyContent:"space-between",
    // backgroundColor:"red", 
    padding:20,
    alignContent:"center"
  },
points:{
backgroundColor:"#93C572",
borderRadius:20,
padding:15,
width:90,
textAlign:"center"
  },
  return:{
    padding:15,
width:90,
textAlign:"center"
  }
})