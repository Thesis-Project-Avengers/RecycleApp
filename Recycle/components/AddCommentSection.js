import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';

const AddCommentSection = ({ postId }) => {
    const [content, setContent] = useState("")
    const handleAddComment = async () => {
        try {
            if (content) {
                const commentsRef = collection(FIREBASE_DB, 'comments');
                await addDoc(commentsRef, {
                    content,
                    postId,
                    user: {
                        displayName: FIREBASE_AUTH.currentUser.displayName,
                        photoURL: FIREBASE_AUTH.currentUser.photoURL
                    },
                    createdAt: new Date()
                })
            }
        } catch (error) {
            console.log("error adding comment");
            console.log(error)

        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setContent}
                multiline={true}
                numberOfLines={2}
                style={styles.commentInput}
                placeholder='Write A message'
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: "green" }}
                    onPress={handleAddComment}
                >Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddCommentSection


export const styles = StyleSheet.create({
    container: {
        // marginTop:30,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: 10,
    },
    commentInput: {
        padding: 10,
        width: "80%",
        // backgroundColor:"#eee",
    },
    addButton: {
        // backgroundColor:"red",
        padding: 15,
        borderRadius: 10,
        color: "blue",
    }
})