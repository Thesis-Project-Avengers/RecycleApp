import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";
const ReportScreen = ({ route }) => {
  const navigation=useNavigation()
  const [textArea, setTextArea] = useState("");
  const [isChecked, setChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  console.log(isChecked);
  const handleSend = async () => {
    try {
      const reportsCollectionReference = collection(FIREBASE_DB, "reports");
      addDoc(reportsCollectionReference, {
        reported: route.params?.user?.uid,
        reporter: FIREBASE_AUTH.currentUser?.uid,
        causes: {
           badContent: isChecked["1"] , 
           badTreatement:isChecked["2"],
           wrongAnnoucement:isChecked["3"],
           fraudulent:isChecked["4"] 
          },
          content:textArea,
          createdAt:new Date()
      });
      setTextArea("")
      setChecked({
        1: false,
        2: false,
        3: false,
        4: false,
      })
      Alert.alert("Thank you for your report", "", [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("profileVisitor",{user:route.params?.user}); // Replace "YourTargetScreen" with the name of your target screen
          },
        },
      ]);    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, height: "140%" }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ gap: 10 }}>
        <View>
          <Text style={{ fontSize: 16 }}>Choose from the list : </Text>
        </View>
        <View style={styles.checkbox}>
          <View style={styles.oneText}>
            <CheckBox
              checked={isChecked["1"]}
              onPress={() => {
                // console.log("jh",{ "1": isChecked["1"], ...isChecked });
                setChecked({ ...isChecked, 1: !isChecked["1"] });
              }}
            />
            <Text>Bad Content </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox
              checked={isChecked["2"]}
              onPress={() => setChecked({ ...isChecked, 2: !isChecked["2"] })}
            />
            <Text>Bad treatment </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox
              checked={isChecked["3"]}
              onPress={() => setChecked({ ...isChecked, 3: !isChecked["3"] })}
            />
            <Text>Wrong Annoucement </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox
              checked={isChecked["4"]}
              onPress={() => setChecked({ ...isChecked, 4: !isChecked["4"] })}
            />
            <Text> fraudulent Person </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Other :</Text>
        </View>

        <TextInput
        textAlignVertical="top"
        value={textArea}
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Set the initial number of lines (optional)
          placeholder="Type your paragraphs here..."
          onChangeText={(text) => {
            setTextArea(text);
          }}
        />
        <View style={{}}>
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default ReportScreen;
const styles = StyleSheet.create({
  oneText: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
  },
  textInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    height: "40%",
    borderRadius: 15,
    
  },
  button: {
    padding: 17,
    // backgroundColor:"green",
    alignSelf: "flex-end",
    backgroundColor: "#93C572",
    width: 100,
    borderRadius: 10,
  },
  checkbox: {
    // backgroundColor:"red",
    gap: -30,
  },
});
