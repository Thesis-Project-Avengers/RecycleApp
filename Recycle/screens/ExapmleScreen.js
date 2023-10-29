import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ExapmleScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>
                ExapmleScreen
            </Text>
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