import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OneTransaction from "../components/OneTransaction";
import { onChildAdded, ref, onChildChanged } from "firebase/database";
import {
  FIREBASE_REALTIME_DB,
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";

const TransactionScreen = () => {
  const [requests, setRquests] = useState([]);
  console.log("this is ", requests);
  useFocusEffect(
    useCallback(() => {
      const fetchRequests = async () => {
        const requestsCollectionRef = collection(FIREBASE_DB, "requests");
        await getDocs(requestsCollectionRef).then((sanpshot) => {
          let data = [];
          sanpshot.docs.forEach((doc) => {
            if (
              doc.data().receiverId === FIREBASE_AUTH.currentUser?.uid &&
              doc.data().status === "pending"
            ) {
              data.push({ ...doc.data(), id: doc.id });
            }
          });
          setRquests(data);
        });
      };
      fetchRequests();
    }, [])
  );

  // const receiverId = FIREBASE_AUTH.currentUser?.uid;

  // const requestsRef = ref(FIREBASE_REALTIME_DB, `requests` );
  // onChildAdded(requestsRef, (snapshot) => {
  //   const requestData = snapshot.val();
  //   console.log("here there ", requestData);
  // });

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {requests.map((request, index) => (
          <OneTransaction key={index} request={request} />
        ))}
        {/* <OneTransaction /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;
