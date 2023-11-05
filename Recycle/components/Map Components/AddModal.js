import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import SearchedElement from "./SearchedElement";
import axios from "axios";
import Slider from "@react-native-community/slider";

const AddModal = ({ recyclableItems }) => {
  const [selected, setSelected] = useState("");
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState([]);
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";
  const [selectedLocation, setLocation] = useState({});
  const [isChecked, setIsChecked] = useState(false);
const [quentite,setQuantite] = useState(1)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    fetch(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
        text +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data.predictions);
      });
  };

  const getCoordinatesFromPlaceId = async (item) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${item.place_id}&key=${API_KEY}`
      )
      .then((response) => {
        setPlaces([]);
        setSearchText(item.description);
        setLocation(response.data.results[0].geometry.location);
      });
  };
  const styles = StyleSheet.create({
    modalContent: {
      height: "50%",
      backgroundColor: "white",
      padding: 22,
      justifyContent: "space-around",
      alignItems: "center",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    addModalContent: {
      height: "90%",
      backgroundColor: "white",
      padding: 22,
      justifyContent: "flex-start",
      alignItems: "center",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    modalText: {
      fontSize: 30,
      alignSelf: "center",
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    addPost: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "#93C572",
      margin: 10,
      borderRadius: 50,
    },
    autocompleteContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    selectedPlaceText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
    },
    container: {
      padding: 10,
      position: "relative",
    },
    searchInput: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
    },
    predictionsList: {
      maxHeight: 150,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
    },
    predictionItem: {
      padding: 10,
    },
  });

  return (
    <View style={styles.addModalContent}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ height: 1000 }}>
          <Text style={{ fontSize: 30, color: "#93C572" }}>Add New Item</Text>
          <View style={{ width: "100%", paddingTop: 20 }}>
            <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
              Add Category
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {recyclableItems.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      setSelected(item);
                    }}
                  >
                    <Text
                      style={
                        selected === item
                          ? {
                              padding: 10,
                              borderWidth: 1,
                              margin: 3,
                              borderRadius: 50,
                              borderColor: "#93C572",
                              color: "#93C572",
                            }
                          : {
                              padding: 10,
                              borderWidth: 1,
                              margin: 3,
                              borderRadius: 50,
                            }
                      }
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ width: "100%", paddingTop: 20 }}>
            <Text>Select Location</Text>

            <View style={styles.container}>
              <View>
                <Text></Text>
                <CheckBox
                  title="Current Location"
                  checked={isChecked}
                  onPress={toggleCheckbox}
                  checkedColor="green"
                  containerStyle={{
                    backgroundColor: "white",
                    width: "100%",
                    alignSelf: "center",
                  }}
                />
              </View>

              {!isChecked ? (
                <>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a place"
                    onChangeText={handleSearch}
                    value={searchText}
                  />
                  {places.length > 0 && (
                    <ScrollView
                      style={{
                        backgroundColor: "#eee",
                        maxHeight: "10",
                        width: "100%",
                      }}
                    >
                      {places.map((item, key) => {
                        return (
                          <SearchedElement
                            getCoordinatesFromPlaceId={
                              getCoordinatesFromPlaceId
                            }
                            item={item}
                            key={key}
                          />
                        );
                      })}
                    </ScrollView>
                  )}
                </>
              ) : null}
            </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
          <Text>Quentite</Text>
          <Text>{Math.trunc(quentite)}</Text>
          </View>
          <Slider
            style={{ width:"100%", height: 40 }}
            minimumValue={1}
            maximumValue={200}
            minimumTrackTintColor="green"
            maximumTrackTintColor="#000000"
            value={quentite}
            thumbTintColor="green"
            onValueChange={(value)=>{setQuantite(value);console.log(Math.trunc(quentite));}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddModal;
