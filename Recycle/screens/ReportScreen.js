import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CheckBox } from "react-native-elements";
import { useState } from "react";

const ReportScreen = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <ScrollView contentContainerStyle={{padding:20,height:"140%" }} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{gap:10}}>
            <View>
                <Text  style={{fontSize:16}}>Choose from the list : </Text>
            </View>
        <View style={styles.checkbox}>
          <View style={styles.oneText}>
            <CheckBox
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
            />
            <Text>hello here im here </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox />
            <Text>hello here im here </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox />
            <Text>hello here im here </Text>
          </View>
          <View style={styles.oneText}>
            <CheckBox />
            <Text>hello here im here </Text>
          </View>
        </View>
            <View>
                <Text style={{fontSize:16}}>
                    Other : 
                </Text>
            </View>

        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Set the initial number of lines (optional)
          placeholder="Type your paragraphs here..."
        />
        <View style={{}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{textAlign:"center",color:"white",fontSize:"16"}}>Send</Text>
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
    padding:7,
  },
  textInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 20,
    height:"40%",
    borderRadius:15
  },
  button:{
    padding:17,
    // backgroundColor:"green", 
    alignSelf:'flex-end',
    backgroundColor:"#93C572",
    width:100,
    borderRadius:10
  },
  checkbox:{
    // backgroundColor:"red",
    gap:-30
  },

});
