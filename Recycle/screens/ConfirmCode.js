import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  PhoneAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextView from "react-native-otp-textinput";
import { collection, getDocs, query, where } from "firebase/firestore";

const ConfirmCode = ({ route, navigation }) => {
  const { verificationId } = route.params;

  const [code, setCode] = useState("");
  const auth = FIREBASE_AUTH;

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      // from here u create the credential object
      console.log("creeee", credential);
      const res = await signInWithCredential(auth, credential);
      // added to ther firebase
      setCode("");
      // await AsyncStorage.setItem("uid",res.user.uid)
      const existsUser = async () => {
        const userCollectionRef = collection(FIREBASE_DB, "users");
        const q = query(
          userCollectionRef,
          where("uid", "==", FIREBASE_AUTH.currentUser?.uid)
        );
        let res;
        await getDocs(q).then((sanphot) => {
          if (sanphot.docs.length === 1) {
            res = true;
          } else {
            res = false;
          }
        });
        return res;
      };
      if (!(await existsUser())) {
        navigation.navigate("formAfterAuth");
      } else {
        navigation.navigate("App",{first:false});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <View style={{justifyContent:"center",alignItems:"center",gap:40}} > 
      <View
        style={{
          // height: "100%",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      >
        <Image
          source={require("../assets/confirme.png")}
          style={{ width: "100%", height: 300 }}
        />
      </View>
      <OTPTextView
        inputCount={"6"}
        width={"10%"}
        handleTextChange={setCode}
        tintColor={"#93C572"}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm verification</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ConfirmCode;
const styles = StyleSheet.create({
  container: {
  // height:"100%",
    // gap: 40,
  },
  textInput: {
    fontSize: 24,
    width: "100%",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    textAlign: "center",
  },
  sendCode: {
    padding: 17,
    backgroundColor: "#93C572",
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  optText: {
    fontSize: 10,
    color: "#fff",
    margin: 20,
    fontWeight: "bold",
  },
});
