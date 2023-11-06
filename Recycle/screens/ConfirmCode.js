import { View, Text,TextInput,TouchableOpacity , StyleSheet,Alert,Image} from 'react-native'
import React , {useState }from 'react'
import {
    PhoneAuthProvider,
    signInAnonymously,
    signInWithCredential,
  } from "firebase/auth";
import { FIREBASE_AUTH } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPTextView from 'react-native-otp-textinput';


const ConfirmCode = ({route,navigation}) => {
    const {verificationId} = route.params
 
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
      await AsyncStorage.setItem("uid",res.user.uid)
      Alert.alert("login successfully");
      navigation.navigate("formAfterAuth")
    } catch (error) {
      throw error;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{height:200,alignItems:"center",justifyContent:"center",width:"90%"}} >
<Image source={require("../assets/confirme.png")} style={{width:"100%",height:300}} />
</View>
      <OTPTextView inputCount={"6"} width={"10%"} handleTextChange={setCode} tintColor={"#93C572"} />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm verification</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmCode
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center', 
      gap: 40
    },
    textInput: {
      fontSize: 24,
      width: "100%",
      padding: 10,
      borderBottomColor: "black",
      borderBottomWidth: 2 ,
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
  