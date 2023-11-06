import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/AntDesign";
import { FIREBASE_AUTH } from "../firebaseConfig";
const Profile = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} >
        <View style={styles.returnPoints}>
          <View style={styles.return}>
            {/* <Icon name="arrow-return-left" 
          size={22}
          color={"#93C572"}
          /> */}
          </View>
          <View style={styles.points}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              : 100
            </Text>
          </View>
        </View>
        <View style={styles.imageTextName}>
          <Image
            source={{ uri: FIREBASE_AUTH.currentUser?.photoURL }}
            style={styles.imageProfile}
          />
          <Text style={styles.textName}>{FIREBASE_AUTH.currentUser?.displayName}</Text>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.oneRec}>
            <Icon name="bottle-wine-outline" size={45} color={"#93C572"} />
            <Text>20</Text>
          </View>
          <View style={styles.oneRec}>
            <Icon2
              name="people-arrows" size={40} color={"#93C572"}
            />
            <Text>35</Text>
          </View>
          <View style={styles.oneRec}>
            <Icon3
              name="money-bill-wave" size={40} color={"#93C572"}
            />
            <Text>100</Text>
          </View>
        </View>
        {/* <ScrollView style={styles.scroll}> */}
        <View style={{ marginBottom: 25 }}>
          <View style={styles.oneButton}>
            <Icon4 name="back-in-time" size={20} color={"#93C572"} />
            <TouchableOpacity><Text style={{ fontSize: 17 }}>My Payments</Text></TouchableOpacity>
          </View>
          <View style={styles.oneButton}>
            <Icon5 name="qrcode" size={20} color={"#93C572"} />
            <TouchableOpacity><Text style={{ fontSize: 17 }}>My Qr Code</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate("editprofile") }} >
            <View style={styles.oneButton}  >
              <Icon5 name="edit" size={20} color={"#93C572"} />
              <Text style={{ fontSize: 17 }}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.oneButton}>
            <Icon name="logout" size={20} color={"#93C572"} />
            <TouchableOpacity><Text style={{ fontSize: 17 }}>Log Out</Text></TouchableOpacity>
          </View>
          <View style={styles.oneButton}>
            <Icon name="logout" size={20} color={"#93C572"} />
            <TouchableOpacity><Text style={{ fontSize: 17 }}>Delete Account</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  returnPoints: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"red",
    padding: 5,
    alignContent: "center",
  },
  points: {
    backgroundColor: "#93C572",
    borderRadius: 20,
    padding: 5,
    width: 90,
    textAlign: "center",
  },
  return: {
    padding: 15,
    width: 90,
    textAlign: "center",
  },
  imageTextName: {
    // backgroundColor:"red",
    gap: 10,
  },
  imageProfile: {
    alignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  textName: {
    alignSelf: "center",
    fontSize: 18,
  },
  statContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    padding: 10,
    marginTop: 10,
    justifyContent: "space-around",
    height: "20%",
    alignItems: "center",
  },
  oneRec: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    padding: 15,
    gap: 10,
    height: "100%"
  },
  scroll: {
    padding: 20,
    // height:"100%"
    // backgroundColor:"red",
    // gap:30
  },
  oneButton: {
    // backgroundColor:"green",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1"
  }
});
