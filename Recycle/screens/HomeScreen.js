import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
    //use navigation to navigate to another screen
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Exapmle")} >
                <Text>Press Here To navigate </Text>
            </TouchableOpacity>


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});