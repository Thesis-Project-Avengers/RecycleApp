import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const EditProfileScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.mainContainerEditProfile} >
        <TouchableOpacity onPress={() => navigation.navigate("mainprofile")}> 
       <Text style={{padding:10,fontSize:20}}>
         {"< Profile"}
       </Text>
       </TouchableOpacity>
      <Image
        style={styles.imageEditProfile}
        source={{
          uri: "https://imgs.search.brave.com/GTJCGfegRVtsmO_8q1JhKHaKmJ6Fh3hcEwzK6m3klog/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b193ZWJwLHFfZ2xv/c3N5LHJldF9pbWcs/d18zMDAsaF8zMDAv/aHR0cHM6Ly9ibG9n/LnNuYXBwYS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvZG90dGVkLWJh/Y2tncm91bmQtYXZh/dGFyLWV4YW1wbGUt/MzAweDMwMC5qcGc",
        }}
      />
      <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 14 }}>
        Change Profile Picture
      </Text>
      <ScrollView>
      <View style={styles.allInputContainer}>
        <View style={styles.inputContainer}>
          <Text>FirstName</Text>
          <TextInput style={styles.inputEditProfile} placeholder="FirstName" />
        </View>
        <View style={styles.inputContainer}>
          <Text>LastName</Text>
          <TextInput style={styles.inputEditProfile} placeholder="LastName" />
        </View>
        <View style={styles.inputContainer}>
          <Text>FirstName</Text>
          <TextInput style={styles.inputEditProfile} placeholder="FirstName" />
        </View>
        <View style={styles.inputContainer}>
          <Text>FirstName</Text>
          <TextInput style={styles.inputEditProfile} placeholder="FirstName" />
        </View>
        <TouchableOpacity style={styles.buttonEditProfile}>
          <Text style={{ textAlign: "center", color: "white",fontSize:16,fontWeight:800 }}>
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
   borderWidth:0,
  },
});
