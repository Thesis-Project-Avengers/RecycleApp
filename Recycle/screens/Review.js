
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import OneReview from "../components/OneReview";

import { FIREBASE_DB } from '../firebaseConfig'
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'



const Review = () => {

  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   const refrence = collection(FIREBASE_DB, "users")
  //   const q = query(refrence, orderBy("createdAt", "desc"));
  //   getDocs(q).then((querySnapshot) => {
  //     const usersData = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().photoURL) {
  //         const data = { id: doc.id, ...doc.data() }
  //         usersData.push(data);
  //       }
  //     });
  //     setUsers(usersData);
  //   })
  // }, []);

// console.log("user",users)

  if (users.length === 0) {
    return null;
  }
  else if (users.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Reviews</Text>
          <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ fontSize: 13, color: "#93C572" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
           style={{ gap: 10 }}
           showsVerticalScrollIndicator={false}
        >
          {users.map((user) => (
            <OneReview key={users.id} user={user} />
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading</Text>
      </View>
    );
  }
};


export default Review

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: "green",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 165,
    alignItems: "center",
    margin: 1,
    padding: 5
  },
});



