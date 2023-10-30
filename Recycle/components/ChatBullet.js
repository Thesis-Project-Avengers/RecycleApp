import { View, Text , StyleSheet ,Image } from 'react-native'
import React from 'react'

const ChatBullet = ({image}) => {
  const userName="khalil kouroghlifffff "
    return (
    <View style={styles.oneBullet} >
    <Image  source={{uri:image}} style={styles.oneImage} />
    <Text style={{fontSize:12}}> {userName.length>10 ? userName.slice(0,10) + "..." : userName }   </Text>
</View>
  )
}

export default ChatBullet
const styles = StyleSheet.create({

    oneImage:{
       width: 70 , 
       height: 70 , 
       borderRadius: 50 , 
       borderWidth: 1,
       borderColor: "black"

    }, 
   oneBullet:{
    justifyContent:"center", 
    alignItems:"center", 
    gap:5
   }
   })