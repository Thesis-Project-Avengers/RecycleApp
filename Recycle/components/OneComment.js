import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const OneComment = ({ comment }) => {
    console.log(comment.createdAt.toDate().toString());
    return (
        <View style={styles.container}>
            <View style={styles.commentHeader}>
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                    <Image source={{ uri: comment.user.photoURL }} width={40} height={40} borderRadius={50} />
                    <Text>{comment.user.displayName}</Text>
                </View>
                <Text style={{ color: "green" }}>{comment.createdAt.toDate().toString().slice(0, 10)}</Text>
            </View>
            <View style={styles.commentBody}>
                <Text>{comment.content}</Text>
            </View>
        </View>
    )
}

export default OneComment
export const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
        backgroundColor: "#eee",
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