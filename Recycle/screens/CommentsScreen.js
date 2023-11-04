import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddCommentSection from '../components/AddCommentSection'
import OneComment from '../components/OneComment'

const CommentsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 20 }}>
                <OneComment />
                <OneComment />
                <OneComment />
                <OneComment />
                <OneComment />
                <OneComment />
                <OneComment />
                <OneComment />
            </ScrollView>
            <AddCommentSection />
        </SafeAreaView>
    )
}

export default CommentsScreen


export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        gap: 10,
        paddingHorizontal: 20
    }
})