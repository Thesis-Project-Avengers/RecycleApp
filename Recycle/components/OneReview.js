import { View, Text, Image } from 'react-native'
import React from 'react'
const OneReview = ({user}) => {
  
 
        return (
            <View style={{ flex: 1, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: "#eee", borderRadius: 20, width: 270, gap: 10, flexDirection: 'column' }} >
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image borderRadius={50}
                            source={{
                                uri: user?.photoURL
                            }} width={40} height={40} />
                        <Text style={{ fontSize: 15, fontWeight: 700 }}>{user?.displayName}</Text>
                    </View>
                    <Text>
                        {user.createdAt?.toDate().toString().slice(15, 18) > 12 ? user.createdAt?.toDate().toString().slice(15, 21) + " PM" : user.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                    </Text>
                </View>
                
                <Text style={{ color: "black"}}>{user.review}</Text>
            </View>
        )
    }
    



export default OneReview