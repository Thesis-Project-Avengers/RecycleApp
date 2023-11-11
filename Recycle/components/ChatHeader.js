import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import  Icon from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
const ChatHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
        <Icon name='menu' size={28} />
        <Text style={{fontSize:20 , fontWeight:900 }}> Recyclers </Text>
        <Icon name='search' size={28} />
    </SafeAreaView>
  )
}
export default ChatHeader
const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row' , 
        justifyContent: "space-around", 
        gap: 40, 
        alignItems : 'center' , 
    }

})