import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../firebaseConfig'

const OneComment = ({ comment }) => {
    const [commenterInfo,setCommenterInfo] = useState(null)
    useFocusEffect(useCallback(()=>{
        const commenterDocRef=doc(FIREBASE_DB,"users",comment?.commenterId);
        getDoc(commenterDocRef).then((doc) => {
            setCommenterInfo(doc.data())
        })
    },[]))
    return (
        <View style={styles.container}>
            <View style={styles.commentHeader}>
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                    <Image style={{ borderColor: "#93C572", borderWidth: 2 }} source={{ uri: commenterInfo?.photoURL }} width={40} height={40} borderRadius={50} />
                    <Text>
                        {commenterInfo?.displayName}
                    </Text>
                </View>
                <Text >
                    {comment?.createdAt?.toDate().toString().slice(15, 18) > 12 ? comment?.createdAt?.toDate().toString().slice(15, 21) + " PM" : comment?.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                </Text>
            </View>
            <View style={styles.commentBody}>
                <Text>
                    {comment?.content}
                </Text>
            </View>
        </View>
    )
}

export default OneComment
export const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 10,
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    commentBody: {
        padding: 10,
    }
})