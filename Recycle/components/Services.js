import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const Services = () => {
  return (
    <View style={styles.containerServices}>
      <Text style={{ fontSize: 17, fontWeight: 500 }}>Recycling Material</Text>
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
});
