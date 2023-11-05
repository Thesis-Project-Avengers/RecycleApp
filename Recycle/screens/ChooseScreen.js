import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseScreen = ({ route, navigation }) => {
  const [uid, setUid] = useState(null);
  const [docId, setDocId] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const uid = await AsyncStorage.getItem("uid");
      setUid(uid);
    };
    fetch();
  }, []);
  // const [user, setUser] = useState(route.params?.user);

  // console.log(user);
  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     const { photoURL, displayName, phoneNumber, uid } = user;
  //     setUser({ photoURL, displayName, phoneNumber, uid });
  //   });
  //   // await
  // }, []);
  useEffect(() => {
    const userCollectionRef = collection(FIREBASE_DB, "users");
    const q = query(userCollectionRef, where("uid", "==", uid));

    onSnapshot(q, (snapShot) => {
      snapShot.docs.map((doc) => {
        setDocId(doc.id);
      });
    });

    //
  }, []);
  const updateUser = async (id, data) => {
    // need small fix 
    const docRef = doc(FIREBASE_DB, "users", id);
    await updateDoc(docRef, data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 20,
          marginTop: 30,
          color: "black",
          fontWeight: 700,
        }}
      >
        {" "}
        Choose your role{" "}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          justifyContent: "center",
          padding: 10,
          gap: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {

            updateUser(docId, {
              isCollector: true,
              isAccumulator: false,
              type: "collector",
            })
            navigation.navigate("collQuestions")
          }
          }
          style={styles.collectorContainer}
        >
          <Image
            source={require("../assets/collector.png")}
            style={{ width: "80%", height: "100%" }}
          />
          <Text style={{ color: "#93c572", fontSize: 20 }}>Collector</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            updateUser(docId, {
              isAccumulator: true,
              isCollector: false,
              type: "accumulator",
            })
            navigation.navigate("accQuestions")
          }
          }
          style={styles.collectorContainer}
        >
          <Image
            source={require("../assets/accumulator.png")}
            style={{ width: "80%", height: "100%" }}
          />
          <Text style={{ color: "#93c572", fontSize: 20 }}>Accumulator</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseScreen;
const styles = StyleSheet.create({
  collectorContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    borderWidth: 1,
    borderColor: "#93c572",
    borderRadius: 50,
    padding: 20,
  },
});
