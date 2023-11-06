import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  onAuthStateChanged,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// import image from "../assets/formPictureAuth.png"
const FormAfterAuth = ({ navigation }) => {
  const [user, setUser] = useState(null);
  // console.log(user);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
      const { photoURL, displayName, phoneNumber, uid } = user;
      setUser({ photoURL, displayName, phoneNumber, uid });
    });
  }, []);
  const checkEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleNextPress = async () => {
    try {
      if (form.email && form.firstName && form.lastName) {
        const userCollectionRef = collection(FIREBASE_DB, "users");
        const userData = {
          ...user,
          ...form,
        };
        // updates in the user object of firebase
        await updateProfile(FIREBASE_AUTH.currentUser, {
          displayName: form.firstName + " " + form.lastName,
          photoURL:
            "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png",
        });
        // chechk the exsistence of the user in the collection to remoove duplicates
        const existsUser = async () => {
          const userCollectionRef = collection(FIREBASE_DB, "users");
          const q = query(
            userCollectionRef,
            where("uid", "==", FIREBASE_AUTH.currentUser.uid)
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
          await setDoc(
            doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid),
            userData
          );
        }
        navigation.navigate("chooseScreen");
      } else {
        Alert.alert("Verify Inforamtion");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ height: "40%" }}>
        <Image
          style={styles.image}
          source={require("../assets/formPictureAuth.png")}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.inputContainer}>
          <View style={styles.firstInputForm}>
            <TextInput
              // style={}
              placeholder="FirstName"
              style={{
                ...styles.firstName,
                borderColor:
                  form.firstName.length === 0
                    ? "black"
                    : form.firstName.length > 5
                    ? "green"
                    : "red",
              }}
              onChangeText={(firstName) => {
                setForm({ ...form, firstName });
              }}
            />
            <TextInput
              onChangeText={(lastName) => {
                setForm({ ...form, lastName });
              }}
              placeholder="LastName"
              style={{
                ...styles.lastName,
                borderColor:
                  form.lastName.length === 0
                    ? "black"
                    : form.lastName.length > 4
                    ? "green"
                    : "red",
              }}
            />
          </View>
          <View>
            <TextInput
              onChangeText={(email) => {
                setForm({ ...form, email });
              }}
              placeholder="Email"
              style={{
                ...styles.email,
                borderColor: !form.email
                  ? "black"
                  : checkEmail(form.email)
                  ? "green"
                  : "red",
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ width: "100%", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            handleNextPress();
            // navigation.navigate("collector");
          }}
          style={styles.button}
        >
          <Text
            style={{
              textAlign: "right",
              color: "white",
              fontSize: 20,
              marginRight: 10,
            }}
          >
            {" "}
            Next{" "}
          </Text>
          <Icon name="arrow-right" size={20} color={"white"} />
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
    height: "130%",
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
    borderRadius: 10,
  },
  lastName: {
    width: "47%",
    borderWidth: 1,
    padding: 15,
    borderColor: "black",
    borderRadius: 10,
  },
  email: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderColor: "black",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#93C572",
    width: "40%",
    padding: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
});
