import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Services = () => {
  return (
    <SafeAreaView style={styles.containerServices}>
      <Text style={{ fontSize: 17,color:"gray",marginLeft:10 }}>What would you like to recycle Today?</Text>
      <View style={styles.categoryServices}>
        <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <View style={styles.oneService}>
            <Icon name="wine-bottle" size={28} color="white" />
            <Text style={{ fontSize: 15, color: "white" }}>Plastic</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <View style={styles.oneService}>
            <Icon name="dollar-sign" size={28} color="white" />
            <Text style={{ fontSize: 15, color: "white" }}>Metal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <View style={styles.oneService}>
            <Icon name="glass" size={28} color="white" />
            <Text style={{ fontSize: 15, color: "white" }}>Glass</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styles.imageService}  source={require("../assets/cartoon-recycle.png")}/>
    </SafeAreaView>
  );
};

export default Services;
const styles = StyleSheet.create({
  containerServices: {
    flexDirection: "column",
   gap:10,
    display: "flex",
    // padding:4
    // backgroundColor:"red"
  },
  categoryServices: {
    margin: 3,
    flexDirection: "row",
  },
  oneService: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#93C572",
    margin: 5,
  },
  imageService : {
    width: "100%",
    height: "55%",
    borderRadius: 15,
  }
});
