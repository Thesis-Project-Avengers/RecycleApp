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
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useState, useRef, useEffect } from "react";
// import firebaseConfig from "./firebaseConfig.js"
import {
  PhoneAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from "firebase/auth";
import {FIREBASE_AUTH, firebaseConfig} from "../firebaseConfig"
export default function SignIn({navigation}) {
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
navigation.navigate("confirmCode",{verificationId})
    } catch (error) {
      console.log("error from send verifs");
      console.log(error);
      throw error;
    }
  };
 

  // const confirmCode = async () => {
  //   try {
  //     const credential = PhoneAuthProvider.credential(verificationId, code);
  //     // from here u create the credential object
  //     console.log("creeee", credential);
  //     const res = await signInWithCredential(auth, credential);
  //     // added to ther firebase
  //     setCode("");
  //     Alert.alert("login successfully");
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  return (
    <View style={styles.container}>
    
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
    
      <PhoneInput
        containerStyle={{ width: "100%" }}
        // textContainerStyle={{ flex: 1, backgroundColor: "red" }}
        // textInputStyle={{ fontSize: "20%", color: "white" }}
        // codeTextStyle={{ flex: 0, color: "white" }}
        // flagButtonStyle={{ flex: 0, color: "green" }}
        // countryPickerButtonStyle={{ color: "green" }}
        ref={phoneInput}
        // defaultValue={value}
        defaultCode="FR"
        layout="first"
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          // console.log(text);
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
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    gap:  40},
  sendVerification: {
    padding: 17,
    backgroundColor: "green",
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    width:100
  },
  // optText: {
  //   fontSize: 10,
  //   color: "#fff",
  //   margin: 20,
  //   fontWeight: "bold",
  // },

});
