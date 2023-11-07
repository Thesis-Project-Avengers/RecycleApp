import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OneTransaction from "../components/OneTransaction";
import { onChildAdded, ref,onChildChanged } from "firebase/database";
import { FIREBASE_REALTIME_DB ,FIREBASE_AUTH } from "../firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";

const TransactionScreen = () => {
const [requests,setRquests] = useState([])

   const receiverId = FIREBASE_AUTH.currentUser?.uid;

    const requestsRef = ref(FIREBASE_REALTIME_DB, `requests/${"aWeowr1HM6ObgHZYv8ik"}`);
    onChildAdded(requestsRef, (snapshot) => {
      const requestData = snapshot.val();
       console.log("here",requestData);
    });

    

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{gap:15}}>
      <OneTransaction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;
