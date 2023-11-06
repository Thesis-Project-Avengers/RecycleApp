import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddCommentSection from '../components/AddCommentSection'
import OneComment from '../components/OneComment'
import { collection, addDoc, FieldValue, serverTimestamp, onSnapshot, orderBy, QueryFieldFilterConstraintnt, query, where, and, QueryFieldFilterConstraint, getDocs } from 'firebase/firestore'
import { FIREBASE_DB, FIREBASE_AUTH } from '../firebaseConfig'

const CommentsScreen = ({ route }) => {
    const [comments, setComments] = useState([])
    const [update, setUpdate] = useState(false)
    const [lodading, setLoading] = useState(true)
    const fetch = async () => {
        try {
            const commentsRef = collection(FIREBASE_DB, "comments");
            const q = query(commentsRef,
                where("tipId", "==", route.params.tipId),
                // orderBy("createdAt", "desc"),

            )
            await getDocs(q).then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                })
                let sortedDocs = data.sort((a, b) => b.createdAt - a.createdAt)
                setComments(sortedDocs);
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddComment = async (content) => {
        try {
            if (content) {
                setLoading(true)
                let tipId = route.params.tipId
                const commentsRef = collection(FIREBASE_DB, 'comments');
                await addDoc(commentsRef, {
                    content,
                    tipId,
                    user: {
                        displayName: FIREBASE_AUTH.currentUser?.displayName,
                        photoURL: FIREBASE_AUTH.currentUser?.photoURL
                    },
                    createdAt: serverTimestamp()
                })
                setUpdate(!update)
            }
        } catch (error) {
            console.log("error adding comment");
            console.log(error)
        }
    }
    useEffect(() => {
        fetch();
    }, [update])
    return (
        <SafeAreaView style={styles.container}>
            {
                lodading
                    ? <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="green" />
                        <Text>Loading</Text>
                    </View>

                    :
                    comments.length > 0 ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ gap: 20 }}>
                            {comments.map((comment, index) => <OneComment key={index} comment={comment} />)}
                        </ScrollView> :
                        <View>
                            <Text>No Comments Add One </Text>
                        </View>
            }
            <AddCommentSection
                handleAddComment={handleAddComment}
            />
        </SafeAreaView>
    )
}

export default CommentsScreen


export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        gap: 10,
        padding: 20,
    }
})