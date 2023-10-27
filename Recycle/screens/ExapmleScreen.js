import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ExapmleScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>ExapmleScreen</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")} >
                <Text>Press Here To navigate To the Home </Text>
            </TouchableOpacity>
            {/* The Navigation  navigation.goBack() if you were in a route and you want to get back just call it  */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                <Text>Press Here To get Back  </Text>
            </TouchableOpacity>
            {/* You can go back to an existing screen in the stack with navigation.navigate('RouteName'), 
            and you can go back to the first screen in the stack with ###navigation.popToTop()##### */}
        </View>
    )
}

export default ExapmleScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    }
});