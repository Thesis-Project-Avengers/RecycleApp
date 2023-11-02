import React from "react";
import { Text, View,TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Services = () => {
  return (
    <View style={styles.containerServices}>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
        <Icon name="dollar-sign" size={80} />
        <Text style={{ fontSize: 14, fontWeight: 800 }}>Exchange points</Text>
      </View>
        </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.oneService}>
        <Icon name="shopping-cart" size={80} />
        <Text style={{ fontSize: 14, fontWeight: 800 }} >Store</Text>
      </View>
        </TouchableOpacity>
    </View>
  );
};

export default Services;
const styles = StyleSheet.create({
  containerServices: {
    flexDirection: "row",
    margin2: 5,
    display: "flex",
    justifyContent: "center",
  },
  oneService: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#eef",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
