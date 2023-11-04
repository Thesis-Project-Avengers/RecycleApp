import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const OneComment = () => {
    return (
        <View style={styles.container}>
            <View style={styles.commentHeader}>
                <View style={{flexDirection:'row',alignItems:"center",gap:10}}>
                    <Image source={{ uri: "https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/347389791_1387274348784480_3857632196740571851_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VXy6Q4cz-c0AX_la_Rd&_nc_ht=scontent.ftun1-2.fna&oh=00_AfC-WqNkWPVdtat6t0VSWdax0D_ObqvrYYyeB_ujS3wWeA&oe=6547ADD3" }} width={40} height={40} borderRadius={50} />
                    <Text>Bellhassen</Text>
                </View>
                <Text style={{color:"green"}}>8:00 Pm</Text>
            </View>
            <View style={styles.commentBody}>
                <Text>ssssssssss ssssssssss ssssssssss ssssssssss ssssssssss ssssssssss ssssssssss ssssssssss     ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Text>
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