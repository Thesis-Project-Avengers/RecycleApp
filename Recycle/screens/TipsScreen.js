import { View, Text, StyleSheet, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/FontAwesome'
import OneTip from '../components/OneTip'

const TipsScreen = () => {
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView 
            style={{gap: 10}} 
            showsVerticalScrollIndicator={false}
             >
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
                <OneTip/>
               
            </ScrollView>
            <FloatingAction color='#93C572' />
        </SafeAreaView>
    )
}

export default TipsScreen



export const styles = StyleSheet.create({
    container: {
        padding: 15,
        // backgroundColor: "green",
        height: "100%",
    },

})