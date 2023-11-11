import { View, Text, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getDoc,doc } from 'firebase/firestore'
import { FIREBASE_DB } from '../firebaseConfig'
import Icon from "react-native-vector-icons/FontAwesome";
const OneReview = ({review,user}) => {
     const  [from,setFrom] = useState("");
     console.log(review);
  useFocusEffect(useCallback(()=>{
    // setith 
    const docref=doc(FIREBASE_DB,"users",review?.from)
    getDoc(docref).then((doc)=>{
        console.log(doc.data());
        // setih fel hook
        // setFrom(data);
    })
  },[]))
  const renderStars = (rating) => {
    
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color="gold"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };  return (
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
                        {review.createdAt?.toDate().toString().slice(15, 18) > 12 ? review.createdAt?.toDate().toString().slice(15, 21) + " PM" : review.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                    </Text>
                </View>
                
                <Text style={{ color: "black"}}>{review.content}</Text>
{/* stars view */}
                <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {renderStars(review?.rating / 5 || 1)}
      </View>
    </View>
            </View>
        )
    }
    



export default OneReview