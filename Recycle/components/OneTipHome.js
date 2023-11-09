import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../firebaseConfig'

const OneTipHome = ({ tip }) => {
    const [posterInfo, setPosterInfo] = useState({})
    useFocusEffect(useCallback(() => {
        const userdocRef = doc(FIREBASE_DB, "users", tip?.posterId)
        getDoc(userdocRef).then((doc) => {
            setPosterInfo(doc.data())
        })
    }, []))
    return (
        <View style={{ flex: 1, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: "#eee", borderRadius: 20, width: 300, gap: 10, flexDirection: 'column' }} >
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image borderRadius={50}
                        source={{
                            uri: posterInfo?.photoURL
                        }} width={40} height={40} />
                    <Text style={{ fontSize: 15, fontWeight: 700 }}>{posterInfo?.displayName}</Text>
                </View>
                <Text>
                    {tip.createdAt?.toDate().toString().slice(15, 18) > 12 ? tip.createdAt?.toDate().toString().slice(15, 21) + " PM" : tip.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                </Text>
            </View>
            {/* {tip.image && <Image style={{ width: "100%", objectFit: "cover" }} width={200} height={150} borderRadius={20} source={{ uri: tip.image }} />} */}
            <Text>
                {tip.content?.length > 140 ? tip.content?.slice(0, 140) + "....." : tip.content}
            </Text>
        </View>
    )
}

export default OneTipHome