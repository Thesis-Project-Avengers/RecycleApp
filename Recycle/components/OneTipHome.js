import { View, Text, TouchableOpacity, Image,SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import React, { useState } from 'react'
import { FIREBASE_DB } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

const OneTipHome = ({ tip }) => {
    // const [isLiked, setIsliked] = useState(tip.isLiked.includes("4gdEnxf0UJSpDimpbhTHdGnefkC2"))
    // const updateLikeState = async () => {
    //     const documentReference = doc(FIREBASE_DB, 'Tips', tip.id);
    //     if (isLiked) {
    //         tip.isLiked.splice(tip.isLiked.indexOf("yet"), 1)
    //         tip.numlikes--
    //     } else {
    //         tip.isLiked.push("4gdEnxf0UJSpDimpbhTHdGnefkC2")
    //         tip.numlikes++
    //     }
    //     await updateDoc(documentReference, {
    //         isLiked: tip.isLiked,
    //         numlikes: tip.numlikes
    //     })
    //     setIsliked(!isLiked)
    // }
    return (
        <SafeAreaView style={{ flex: 1, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: "#eee", borderRadius: 20, width: 250,height:250 ,gap: 10, flexDirection: 'column', pa: 20 }} >
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image borderRadius={50}
                        source={{
                            uri: tip.user.pdpPhoto
                        }} width={40} height={40} />
                    <Text style={{ fontSize: 15, fontWeight: 700 }}>{tip.user.name}</Text>
                </View>
                <Text>{tip.createdAt}</Text>
            </View>
            {true && <Image style={{ flex: 1, objectFit: "cover" }} height={50} borderRadius={20} source={{ uri: tip.image }} />}
            <Text>{tip.content}</Text>
            {/* <View style={{ flexDirection: "row", gap: 50 }}>
                <TouchableOpacity
                    onPress={() => updateLikeState()}
                    style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        onPress={() => updateLikeState()}
                        size={20}
                        name={isLiked ? "trash" : "trash-o"}
                        color={isLiked && "green"}
                    />
                    <Text style={{ fontWeight: 700 }}>{tip.numlikes} Collab</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        size={20}
                        name="comment-o"
                    />
                    <Text style={{ fontWeight: 700 }}>Comment</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default OneTipHome