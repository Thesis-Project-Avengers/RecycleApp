import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const AddCommentSection = ({ handleAddComment }) => {
    const [content, setContent] = useState("")
    return (
        <View style={styles.container}>
            <TextInput
                value={content}
                onChangeText={setContent}
                multiline={true}
                numberOfLines={2}
                style={styles.commentInput}
                placeholder='Write A message'
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: "green" }}
                    onPress={() => {handleAddComment(content);setContent("");}}
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