import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'

const OneTipHome = ({ tip }) => {
    return (
        <View style={{ flex: 1, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: "#eee", borderRadius: 20, width: 270, gap: 10, flexDirection: 'column' }} >
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image borderRadius={50}
                        source={{
                            uri: tip.user?.photoURL
                        }} width={40} height={40} />
                    <Text style={{ fontSize: 15, fontWeight: 700 }}>{tip.user?.displayName}</Text>
                </View>
                <Text>
                    {tip.createdAt?.toDate().toString().slice(15, 18) > 12 ? tip.createdAt?.toDate().toString().slice(15, 21) + " PM" : tip.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                </Text>
            </View>
            <Image style={{ width: "100%", objectFit: "cover" }} width={200} height={150} borderRadius={20} source={{ uri: tip.image }} />
            <Text>{tip.content}</Text>
        </View>
    )
}

export default OneTipHome