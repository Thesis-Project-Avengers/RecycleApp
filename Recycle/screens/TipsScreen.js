import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingAction } from 'react-native-floating-action'

const TipsScreen = () => {
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView >
                <View >
                    

                </View>

            </ScrollView>
            <FloatingAction color='#93C572' />
        </SafeAreaView>
    )
}

export default TipsScreen



export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "green",
        height: "100%",
    },

})