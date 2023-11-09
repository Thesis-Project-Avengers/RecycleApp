// import { StatusBar } from "expo-status-bar";
// import { User, onAuthStateChanged } from "firebase/auth";
import PhoneInput from "react-native-phone-number-input";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useState, useRef, useEffect } from "react";
// import firebaseConfig from "./firebaseConfig.js"
import {
  PhoneAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from "firebase/auth";
import { FIREBASE_AUTH, firebaseConfig } from "../firebaseConfig";
export default function SignIn({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const auth = FIREBASE_AUTH;
  const phoneInput = useRef(null);
  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      // creating the new instance of the provider with the auth
      //it was phone number
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedValue,
        recaptchaVerifier.current
      );
      // get the verification id
      setVerificationId(verificationId);
      setPhoneNumber("");
      navigation.navigate("confirmCode", { verificationId });
    } catch (error) {
      console.log("error from send verifs");
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      >
        <Image
          source={require("../assets/phonebg.png")}
          style={{ width: "100%", height: 300 }}
        />
      </View>
      <View style={{ padding: 20, marginTop: 50 }}>
        <View style={{ backgroundColor: "red", width: "100%" }}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </View>
        <PhoneInput
          style={styles.phoneInput}
          containerStyle={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#eee",
          }}
          ref={phoneInput}
          defaultCode="TN"
          layout="first"
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          autoFocus
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={() => {
            if (phoneInput.current.isValidNumber(formattedValue)) {
              // onPress={sendVerification}
              sendVerification();
            } else {
              Alert.alert("Verify your phone number");
            }
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    // backgroundColor: "red",
  },

  sendVerification: {
    padding: 17,
    backgroundColor: "#93C572",
    borderRadius: 10,
    width: 200,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },
  optText: {
    fontSize: 10,
    color: "#fff",
    margin: 20,
    fontWeight: "bold",
  },

  // phoneInput:{
  //   borderRadius:10
  // }
});
