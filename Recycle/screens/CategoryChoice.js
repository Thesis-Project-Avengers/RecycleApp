import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CategoryChoice = () => {
  return (
    <SafeAreaView style={{alignItems:'center'}}>
        <View style={styles.containerCategory}>
            <Text>yassine</Text>
        </View>
    </SafeAreaView>
  )
}

export default CategoryChoice

const styles = StyleSheet.create({
    containerCategory:{
        backgroundColor : 'red',
        justifyContent: 'center',
        height: '10%',
        width: '100%',
    }
})