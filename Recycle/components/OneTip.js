import { View, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal";
import { MaterialIcons } from '@expo/vector-icons';


import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';

const OneTip = ({ tip }) => {
    const navigation = useNavigation()
    // console.log(FIREBASE_AUTH.currentUser.uid);

    const [isLiked, setIsliked] = useState(tip.isLiked.includes(FIREBASE_AUTH.currentUser.uid))
    const [isFavourite, setIsfavourite] = useState(tip.isFavourite.includes(FIREBASE_AUTH.currentUser.uid))
    const [visibleModal, setVisibleModal] = useState(false);
    const updateFavouriteState = async () => {
        const documentReference = doc(FIREBASE_DB, 'Tips', tip.id);
        if (isFavourite) {
            tip.isFavourite.splice(tip.isLiked.indexOf(FIREBASE_AUTH.currentUser.uid), 1)
        } else {
            tip.isFavourite.push(FIREBASE_AUTH.currentUser.uid)
        }
        await updateDoc(documentReference, {
            isFavourite: tip.isFavourite,
        })
        setIsfavourite(!isFavourite)
    }
    const updateLikeState = async () => {
        const documentReference = doc(FIREBASE_DB, 'Tips', tip.id);
        if (isLiked) {
            tip.isLiked.splice(tip.isLiked.indexOf(FIREBASE_AUTH.currentUser.uid), 1)
            tip.numlikes--
        } else {
            tip.isLiked.push(FIREBASE_AUTH.currentUser.uid)
            tip.numlikes++
        }
        await updateDoc(documentReference, {
            isLiked: tip.isLiked,
            numlikes: tip.numlikes
        })
        setIsliked(!isLiked)
    }
    return (
        <View style={{ flex: 1, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: "#eee", borderRadius: 20, width: "100%", gap: 10, flexDirection: 'column', pa: 20 }} >
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image borderRadius={50}
                        source={{
                            uri: tip.user.pdpPhoto
                        }} width={50} height={50} />
                    <Text style={{ fontSize: 16, fontWeight: 900 }}>{tip.user.name}</Text>
                </View>
                <Text>{tip.createdAt}</Text>
            </View>
            {true &&
                <TouchableOpacity onPress={() => setVisibleModal(true)} >
                    <Image style={{ flex: 1, objectFit: "cover" }} height={150} borderRadius={25} source={{ uri: tip.image }} />
                </TouchableOpacity>
            }
            <Text>{tip.content}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                    onPress={() => updateLikeState()}
                    style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        onPress={() => updateLikeState()}
                        size={20}
                        name={isLiked ? "trash" : "trash-o"}
                        color={isLiked && "green"}
                    />
                    <Text style={{ fontWeight: 700 }}>{tip.numlikes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("commentScreen", { postId: tip.id }) }}
                    style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        size={20}
                        name="comment-o"
                    />
                    {/* <Text style={{ fontWeight: 700 }}>Comment</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => updateFavouriteState()}
                    style={{ flexDirection: "row", gap: 5 }}>
                    <MaterialIcons name={isFavourite ? "favorite" : "favorite-outline"} size={24} />
                    {/* <Text style={{ fontWeight: 700 }}>Comment</Text> */}
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={visibleModal}
                onBackdropPress={() => setVisibleModal(false)}
            >
                <View style={{
                    backgroundColor: "white",
                    height: '50%',
                    gap: 10,
                    borderRadius: 20
                }}>
                    <Image style={{ height: "100%", width: '100%' }} borderRadius={20} source={{ uri: tip.image }} />
                </View>
            </Modal>
        </View>
    )
}

export default OneTip