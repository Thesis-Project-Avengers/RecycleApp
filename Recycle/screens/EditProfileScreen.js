import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from "../firebaseConfig";
import * as ImagePicker from 'expo-image-picker';
import uuid from "uuid"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const EditProfileScreen = () => {
  const navigation=useNavigation()
  const [user, setUser] = useState(null)
  const [imageChanged, setImageChanged] = useState(false)
  useFocusEffect(useCallback(() => {
    console.log("inside edit profile screen" );

    const getUser = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser?.uid)
        await getDoc(userDocRef).then((user) => {
          setUser(user.data());
          setForm({ firstName: user.data().firstName, lastName: user.data().lastName, email: user.data().email, photoURL: user.data().photoURL })
        });
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []))
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
  })
  const updateUserData = async () => {
    try {
      const docref = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser?.uid)
      // update for the auth object 
      await updateProfile(FIREBASE_AUTH.currentUser, { photoURL: form.photoURL, displayName: form.firstName + " " + form.lastName })
      // UPDATE FOR THE COLLECTION USERS 
      await updateDoc(docref, { ...form, displayName: form.firstName + " " + form.lastName });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(form);



  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(FIREBASE_STORAGE, uuid.v4());
    const result = await uploadBytes(fileRef, blob);


    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })
    // result.canceled=false
    if (!result.canceled) {
      const uplodUrl = await uploadImageAsync(result.assets[0].uri)
      setForm({ ...form, photoURL: uplodUrl });
      setImageChanged(true);
      // setImage(uplodUrl)
      // setTipForm({ ...tipForm, image: uplodUrl })
      // or add a doc 
    } else {
      alert('You did not select any image.');
    }
    // if (hasGalleryPermission === false) {
    //   return <Text>no permmison</Text>
    // }
  }


  return (
    <SafeAreaView style={styles.mainContainerEditProfile} >
      <TouchableOpacity onPress={() => navigation.navigate("mainprofile")}>
        <Text style={{ padding: 10, fontSize: 20 }}>
          {"< Profile"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { pickImage() }}>
        <Image
          style={styles.imageEditProfile}
          source={
            {
              uri: imageChanged ? form?.photoURL : FIREBASE_AUTH.currentUser?.photoURL
            }}
        />
        <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 14 }}>
          Change Profile Picture
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.allInputContainer}>
          <View style={styles.inputContainer}>
            <Text>FirstName</Text>
            <TextInput
              onChangeText={(text) => setForm({ ...form, firstName: text })}
              style={styles.inputEditProfile} placeholder="FirstName" value={form.firstName} />
          </View>
          <View style={styles.inputContainer}>
            <Text>LastName</Text>
            <TextInput
              onChangeText={(text) => setForm({ ...form, lastName: text })}

              style={styles.inputEditProfile} placeholder="LastName" value={form.lastName} />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text>Birth-date</Text>
            <TextInput style={styles.inputEditProfile} placeholder="Birth-date" />
          </View> */}
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              onChangeText={(text) => setForm({ ...form, email: text })}
              style={styles.inputEditProfile} placeholder="Email" value={form.email} />
          </View>
          <TouchableOpacity
            onPress={updateUserData}

            style={styles.buttonEditProfile}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: 800 }}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  mainContainerEditProfile: {
    flex: 1,
  },
  imageEditProfile: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputEditProfile: {
    // backgroundColor: "red",
    padding: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
  allInputContainer: {
    padding: 20,
    gap: 5,
  },
  inputContainer: {
    gap: 8,
  },
  buttonEditProfile: {
    // backgroundColor:"red",
    padding: 17,
    borderRadius: 30,
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: "#93C572",
    borderWidth: 0,
  },
});
