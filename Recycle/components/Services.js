import React from "react";
import { Text, View,TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Services = () => {
  return (
    <View style={styles.containerServices}>
    
        <Text style={{ fontSize: 17, fontWeight: 500 }}>Recycling Material</Text>
        <View style={styles.categoryServices}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{ margin: 5,gap: 10 }}>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
        <Icon name="home" size={28} color="white"/>
        <Text style={{ fontSize: 15 ,color: "white" }} >Plastic</Text>
      </View>
        </TouchableOpacity>
       
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
      <Icon name="dollar-sign" size={28} color="white"/>
        <Text style={{ fontSize: 15,color: "white" }}>Metal</Text>
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
        <Icon name="dollar-sign" size={28} color="white"/>
        <Text style={{ fontSize: 15 ,color: "white"}}>Glass</Text>
       
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
         <Icon name="dollar-sign" size={28} color="white"/>
         <Text style={{ fontSize: 15 ,color: "white"}}>Glass</Text>
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
         <Icon name="dollar-sign" size={28} color="white"/>
        <Text style={{ fontSize: 15 ,color: "white"}}>Glass</Text>
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
         <Icon name="dollar-sign" size={28} color="white"/>
        <Text style={{ fontSize: 15 ,color: "white"}}>Glass</Text>
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
         <Icon name="dollar-sign" size={28} color="white"/>
        <Text style={{ fontSize: 15 ,color: "white"}}>Glass</Text>
      </View>
        </TouchableOpacity>
</ScrollView>
        </View>
    </View>
  );
};

export default Services;
const styles = StyleSheet.create({
  containerServices: {
    flexDirection: "column",
    margin: 2,
    display: "flex",
    
  },
  // categoryServices:{
  //   margin: 3,
  // },
  oneService: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"green",
    margin: 5,
  },
});
