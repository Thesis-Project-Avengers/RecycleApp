import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGift,
  faShop,
  faBottleWater,
  faWineBottle,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const Services = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerServices}>
      <Text style={{ fontSize: 17, color: "gray", marginLeft: 10 }}>
        What would you like to recycle Today?
      </Text>
      <View style={styles.categoryServices}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={{ flexDirection: "row", gap: 5 }}
        >
          <View style={styles.oneService}>
            <Animatable.View
              animation="shake"
              iterationCount={1}
              delay={9000}
              iterationDelay={9000}
            >
              <FontAwesomeIcon icon={faWineBottle} size={40} color="#93C572" />
            </Animatable.View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={{ flexDirection: "row", gap: 5 }}
        >
          <View style={styles.oneService}>
            <Animatable.View
              animation="shake"
              iterationCount={1}
              delay={9000}
              iterationDelay={9000}
            >
              <FontAwesomeIcon icon={faBottleWater} size={40} color="#93C572" />
            </Animatable.View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map");
          }}
          style={{ flexDirection: "row", gap: 5 }}
        >
          <View style={styles.oneService}>
            <Animatable.View
              animation="shake"
              iterationCount={1}
              delay={9000}
              iterationDelay={9000}
            >
              <FontAwesomeIcon icon={faBox} size={40} color="#93C572" />
            </Animatable.View>
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
    gap: 10,
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
    backgroundColor: "white",
    margin: 5,
  },
  imageService: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
