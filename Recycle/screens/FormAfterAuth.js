import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
// import image from "../assets/formPictureAuth.png"
const FormAfterAuth = ({navigation}) => {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log(user);
      setUser(user)
    })
  },[])
const checkEmail = (email)=>{
return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
  const [form,setForm]=useState({
    firstName:"",
    lastName:"",
    email:""
  })
  console.log("here",form);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ height: "40%" }}>
        <Image
          style={styles.image}
          source={require("../assets/formPictureAuth.png")}
        />
      </View>
      <ScrollView   showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true} >
        <View  style={styles.inputContainer}>
        <View  style={styles.firstInputForm}>
          <TextInput
   
          // style={}
          placeholder="FirstName" style={{...styles.firstName,  borderColor:form.firstName.length===0?"black":form.firstName.length>5?"green":"red", }} onChangeText={(firstName)=>{
            
            setForm({...form,firstName})
            
            
            }} />
          <TextInput onChangeText={(lastName)=>{setForm({...form,lastName})}} placeholder="LastName" style={{...styles.lastName,borderColor:form.lastName.length===0?"black":form.lastName.length>4?"green":"red",}} />
        </View>
        <View>
          <TextInput onChangeText={(email)=>{setForm({...form,email})}} placeholder="Email" style={{...styles.email,borderColor:!form.email?"black":checkEmail(form.email)?"green":"red",}} />
        </View>
        </View>
      </ScrollView>
      <View style={{width:"100%",marginTop:20}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("collector")}} style={styles.button} >
        <Text style={{textAlign:"right",color:"white",fontSize:20,marginRight:10}}  > Next </Text> 
        <Icon 
        name="arrow-right"
        size={20}
        color={"white"}
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormAfterAuth;
const styles = StyleSheet.create({
  inputContainer: {
    flex: 0,
    // backgroundColor:"red",
    // backgroundColor:"red",
    padding: 40,
    // height:"50%",
    gap: 20,
    // backgroundColor:"grey",
    // height:"50%"
    height:"130%"
  },
  firstInputForm: {
    flexDirection: "row",
    // gap : 20,
    justifyContent: "space-between",
  },
  inputsForm: {
    padding: 10,
    borderWidth: 1,
  },
  image: {
    alignSelf: "center",
    margin: 10,
    width: "70%",
    height: "100%",
  },
  firstName: {
    width: "47%",
    borderWidth: 1,
    padding: 15,
    borderRadius:10 
  },
  lastName: {
    width: "47%",
    borderWidth: 1,
    padding: 15,
    borderColor:"black",
    borderRadius:10

  },
  email: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderColor:"black",
    borderRadius:10
  },
  button:{
    backgroundColor:"#93C572",
    width:"40%", 
    padding:10,
    alignSelf:"flex-end", 
    flexDirection:"row", 
    gap:7,
    alignItems:"center"
  }
});
