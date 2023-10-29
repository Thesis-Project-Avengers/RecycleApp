// import PhoneInput from "react-native-phone-number-input";
// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     TouchableOpacity,
//     Alert,
// } from "react-native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import React, { useState, useRef, useEffect } from "react";
// import {
//     PhoneAuthProvider,
//     signInAnonymously,
//     signInWithCredential,
// } from "firebase/auth";
// import { FIREBASE_AUTH ,firebaseConfig} from '../firebaseConfig';
// // import 
// const SignIn = () => {
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [formattedValue, setFormattedValue] = useState("");

//     const [code, setCode] = useState("");
//     const [verificationId, setVerificationId] = useState(null);
//     const recaptchaVerifier = useRef(null);
//     const auth = FIREBASE_AUTH;
//     const phoneInput = useRef(null);
//     const sendVerification = async () => {
//         try {
//             const phoneProvider = new PhoneAuthProvider(auth);
//             // creating the new instance of the provider with the auth 
//             //it was phone number
//             const verificationId = await phoneProvider.verifyPhoneNumber(
//                 formattedValue,
//                 recaptchaVerifier.current
//             );
//             // get the verification ind 
//             setVerificationId(verificationId);
//             setPhoneNumber("");
//         } catch (error) {
//             throw error;
//         }
//     };
//     const confirmCode = async () => {
//         try {
//             const credential = PhoneAuthProvider.credential(verificationId, code);
//             // from here u create the credential object 
//             console.log("creeee", credential);
//             const res = await signInWithCredential(auth, credential);
//             // added to ther firebase
//             setCode("");
//             Alert.alert("login successfully");
//         } catch (error) {
//             throw error;
//         }
//     };
//     return (
//         <View style={StyleSheet.container}>
//             <FirebaseRecaptchaVerifierModal
//                 ref={recaptchaVerifier}
//                 firebaseConfig={firebaseConfig}
//             />
//             <Text style={styles.optText}>Login in usign Otp</Text>
//             <PhoneInput
//                 containerStyle={{ width: "100%" }}
//                 // textContainerStyle={{ flex: 1, backgroundColor: "red" }}
//                 // textInputStyle={{ fontSize: "20%", color: "white" }}
//                 // codeTextStyle={{ flex: 0, color: "white" }}
//                 // flagButtonStyle={{ flex: 0, color: "green" }}
//                 // countryPickerButtonStyle={{ color: "green" }}
//                 ref={phoneInput}
//                 // defaultValue={value}
//                 defaultCode="FR"
//                 layout="first"
//                 onChangeFormattedText={(text) => {
//                     setFormattedValue(text);
//                     // console.log(text);
//                 }}
//                 autoFocus
//             />

//             <TouchableOpacity
//                 style={styles.sendVerification}
//                 onPress={() => {
//                     if (phoneInput.current.isValidNumber(formattedValue)) {
//                         // onPress={sendVerification}
//                         sendVerification()
//                     } else {
//                         Alert.alert("Verify your phone number")
//                     }
//                 }}
//             >
//                 <Text style={styles.buttonText}>send verification code</Text>
//             </TouchableOpacity>
//             <TextInput
//                 placeholder="confirm"
//                 onChangeText={setCode}
//                 keyboardType="number-pad"
//                 style={styles.textInput}
//             />
//             <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
//                 <Text style={styles.buttonText}>Confirm verification</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "red",
//         justifyContent: "center",
//     },
//     textInput: {
//         paddingTop: 40,
//         paddingBottom: 20,
//         paddingHorizontal: 20,
//         fontSize: 24,
//         borderBottomColor: "#fff",
//         borderBottomWidth: 2,
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     sendVerification: {
//         padding: 20,
//         backgroundColor: "#3498db",
//         borderRadius: 10,
//     },
//     sendCode: {
//         padding: 20,
//         backgroundColor: "#9b59b6",
//         borderRadius: 10,
//     },
//     buttonText: {
//         textAlign: "center",
//         color: "#fff",
//         fontSize: 20,
//     },
//     optText: {
//         fontSize: 10,
//         color: "#fff",
//         margin: 20,
//         fontWeight: "bold",
//     },
// });

// export default SignIn

// after it will be fixed 
import { View, Text } from 'react-native'
import React from 'react'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn