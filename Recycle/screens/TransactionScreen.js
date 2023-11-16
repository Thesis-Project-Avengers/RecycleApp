import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OneTransaction from "../components/OneTransaction";
import { set, ref, onChildChanged } from "firebase/database";
import {
  FIREBASE_REALTIME_DB,
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

const TransactionScreen = () => {
  const [requests, setRquests] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRequests = async () => {
        const requestsCollectionRef = collection(FIREBASE_DB, "requests");
        let data = [];
        onSnapshot(requestsCollectionRef, (sanpshot) => {
          sanpshot.docs.forEach((doc) => {
            if (
              doc.data().receiverId === FIREBASE_AUTH.currentUser?.uid &&
              doc.data().status === "pending"
            ) {
              data.push({ ...doc.data(), id: doc.id });
            }
          });
          setRquests(data);
        })
        // await getDocs(requestsCollectionRef).then((sanpshot) => {
        //   let data = [];
        //   sanpshot.docs.forEach((doc) => {
        //     if (
        //       doc.data().receiverId === FIREBASE_AUTH.currentUser?.uid &&
        //       doc.data().status === "pending"
        //     ) {
        //       data.push({ ...doc.data(), id: doc.id });
        //     }
        //   });
        //   setRquests(data);
        // });
      };
      fetchRequests();
    }, [])
  );

  const memoizedRequests = useMemo(() => {
    return requests;
  }, [requests]);

  const handleAccept = async (request) => {
    try {
      // in the real time
      set(
        ref(
          FIREBASE_REALTIME_DB,
          "requests/" + request?.markerId + "/" + request?.senderId
        ),
        {
          // senderId: request?.senderId,
          // receiverId: "aWeowr1HM6ObgHZYv8ik",
          status: "done",
          // markerId: "aWeowr1HM6ObgHZYv8ik",
        }
      );
      // update the doc in the back firestore
      const docref = doc(FIREBASE_DB, "requests", request?.id);
      await updateDoc(docref, {
        status: "done",
      });
      // const rejectedRequests = requests.filter((r) => {
      //   return r.senderId !== request.senderId;
      // });
      // setRquests(rejectedRequests);
      // console.log(rejectedRequests);
      rejectedRequests.forEach((req) => {
        if (request?.markerId === req?.markerId) {
          set(
            ref(
              FIREBASE_REALTIME_DB,
              "requests/" + req?.markerId + "/" + req?.senderId
            ),
            {
              // senderId: request?.senderId,
              // receiverId: "aWeowr1HM6ObgHZYv8ik",
              status: "rejected",
              // markerId: "aWeowr1HM6ObgHZYv8ik",
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefuse = async (request) => {
    try {
      // in the real time
      set(
        ref(
          FIREBASE_REALTIME_DB,
          "requests/" + request?.markerId + "/" + request?.senderId
        ),
        {
          // senderId: request?.senderId,
          // receiverId: "aWeowr1HM6ObgHZYv8ik",
          status: "rejected",
          // markerId: "aWeowr1HM6ObgHZYv8ik",
        }
      );
      // update the doc in the back firestore
      const docref = doc(FIREBASE_DB, "requests", request?.id);
      await updateDoc(docref, {
        status: "rejected",
      });
      // const rejectedRequests = requests.filter((r) => {
      //   return r.senderId !== request.senderId;
      // });
      // setRquests(rejectedRequests);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {requests.map((request, index) => (
          <OneTransaction
            key={index}
            request={request}
            handleAccept={handleAccept}
            handleRefuse={handleRefuse}
          />
        ))}
        {/* <OneTransaction /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;
