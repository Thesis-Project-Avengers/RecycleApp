import { SafeAreaView, StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const ProfileVisitor = () => {
  return (
<SafeAreaView>
    
    <View style={styles.imageContainerText}>
        <Image style={styles.imageProfile}  source={require("../assets/khalil.jpg")} />
        <Text> Balhassen Sehli </Text>
    </View>
</SafeAreaView>
  )
}

export default ProfileVisitor

const styles = StyleSheet.create({
    imageContainerText:{
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        gap:40
    },
    imageProfile:{
        borderRadius:50, 
        width:100,
        height:100
    }


})