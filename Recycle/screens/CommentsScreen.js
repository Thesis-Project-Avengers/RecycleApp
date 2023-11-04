import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddCommentSection from '../components/AddCommentSection'
import OneComment from '../components/OneComment'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { FIREBASE_DB } from '../firebaseConfig'

const CommentsScreen = ({ route }) => {
    const [comments, setComments] = useState([])
    console.log("this comments",comments);
    console.log(route.params.postId);
    useEffect(() => {
        const commentsRef = collection(FIREBASE_DB, "comments");
        const q = query(commentsRef, where("postId", "==", route.params.postId));
        const data = []
        onSnapshot(q, (snapShot) => {
            snapShot.docs.map((doc) => {
                console.log(doc.data());
                data.push(doc.data());
            });
            setComments(data.reverse());
        });
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 20 }}>
                {comments.map((comment, index) => <OneComment key={index} comment={comment} />)}
            </ScrollView>
            <AddCommentSection postId={route.params.postId} />
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