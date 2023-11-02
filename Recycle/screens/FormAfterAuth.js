import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import image from "../assets/formPictureAuth.png"
const FormAfterAuth = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ height: "40%" }}>
        <Image
          style={styles.image}
          source={require("../assets/formPictureAuth.png")}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.firstInputForm}>
          <TextInput placeholder="FirstName" style={styles.firstName} />
          <TextInput placeholder="LastName" style={styles.lastName} />
        </View>
        <View>
          <TextInput placeholder="Email" style={styles.email} />
        </View>
      </View>
      <View style={{width:"100%",marginTop:20}}>
      <TouchableOpacity style={styles.button} >
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
    borderWidth: 2,
    padding: 15,
    borderColor:"#93C572",
    borderRadius:10

  },
  lastName: {
    width: "47%",
    borderWidth: 2,
    padding: 15,
    borderColor:"#93C572",
    borderRadius:10

  },
  email: {
    width: "100%",
    borderWidth: 2,
    padding: 15,
    borderColor:"#93C572",
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
