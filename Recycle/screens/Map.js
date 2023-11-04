import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator,TouchableOpacity } from "react-native";
import MapView , {GooglePlacesAutocomplete} from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import customMapStyleJSON from "../mapStyle";
import OnePosition from "../components/onePosition";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
export default function Map() {
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedPos, setselectedPos] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);
  const [addModal, setVisibleAddModal] = useState(null);
  const [currentInformation, setCurrentInformation] = useState(null);
  const [selected, setSelected] = useState("");
  const [region, setRegion] = useState({
  
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922, // Adjust as needed
        longitudeDelta: 0.0421, // Adjust as needed
      });
    })();
  }, []);

  const places = [
    {
      id: 1,
      name: "Paradise House Tunisia",
      location: {
        latitude: 36.83624,
        longitude: 10.02023,
      },
    },
    {
      id: 2,
      name: "Paradise House Agence Immobilière Tunisie",
      location: {
        latitude: 36.80531,
        longitude: 10.15161,
      },
    },
    {
      id: 3,
      name: "Paradise House Tunisia La Goulette",
      location: {
        latitude: 36.75133,
        longitude: 10.51285,
      },
    },
    {
      id: 8,
      name: "BourseImmo",
      location: {
        latitude: 36.80523,
        longitude: 10.16807,
      },
    },
    {
      id: 4,
      name: "TPS Real Hammamet Tunisia",
      location: {
        latitude: 36.75133,
        longitude: 10.51285,
      },
    },
    {
      id: 5,
      name: "Capital Immobilière",
      location: {
        latitude: 36.80303,
        longitude: 10.08225,
      },
    },
    {
      id: 6,
      name: "FirstHome Realestate",
      location: {
        latitude: 36.80531,
        longitude: 10.15161,
      },
    },
  ];

  const getSelectedInformation = async (info) => {
    const data = await axios.post(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentRegion.latitude},${currentRegion.longitude}&destinations=${info.location.latitude},${info.location.longitude}&key=${API_KEY}`
    );
    setCurrentInformation({ ...data.data.rows[0].elements[0], ...data.data });
  };

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <Icon
        name="bottle-wine-outline"
        size={30}
        color={"#93C572"}
        style={{
          alignSelf: "center",
          fontSize: 70,
          borderRadius: 50,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#93C572",
          padding: 1,
        }}
      />
      <Text style={styles.modalText}>
        {currentInformation?.destination_addresses[0]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="map-marker-distance"
            size={30}
            color={"#93C572"}
            style={{
              marginRight: 10,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.distance.text}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="timer-outline"
            size={30}
            color={"#93C572"}
            style={{
              marginRight: 10,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.duration.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            backgroundColor: "#93C572",
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 80,
            paddingRight: 80,
            borderRadius: 40,
            color: "white",
          }}
        >
          Press Me
        </Text>
      </TouchableOpacity>
    </View>
  );

  const recyclableItems = [
    "Aluminum Cans",
    "Glass Bottles",
    "Paper",
    "Plastic Bottles",
    "Cardboard Boxes",
    "Steel Cans",
  ];

  const AddModalContent = () => (
    <View style={styles.addModalContent}>
      <Text style={{ fontSize: 30, color: "#93C572" }}>Add New Item</Text>
      <View style={{ width: "100%", paddingTop: 20 }}>
        <Text style={{ marginBottom: 10 ,paddingLeft:10}}>Add Category</Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {recyclableItems.map((item) => {
            return (
              <TouchableOpacity
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
      <Text >Select Location</Text>
      {/* <GooglePlacesAutocomplete
          
        /> */}


      </View>

     
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    map: {
      width: "100%",
      height: "100%",
    },
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
  });



  return (
    <View style={styles.container}>
      {currentRegion ? (
        <MapView
          showsMyLocationButton={true}
          customMapStyle={customMapStyleJSON}
          style={styles.map}
          initialRegion={currentRegion}
          showsUserLocation
        >
          {places.map((loc) => {
            return (
              <OnePosition
                loc={loc}
                key={loc.id}
                setselectedPos={setselectedPos}
                setVisibleModal={setVisibleModal}
                getSelectedInformation={getSelectedInformation}
              />
            );
          })}
          {selectedPos ? (
            <MapViewDirections
              origin={currentRegion}
              destination={selectedPos.location}
              apikey={API_KEY}
              strokeWidth={6}
              strokeColor="#186F65"
            />
          ) : null}
        </MapView>
      ) : (
        <>
          <ActivityIndicator size="large" color="green" />
          <Text>Loading</Text>
        </>
      )}
      <Modal
        isVisible={visibleModal === 1}
        style={styles.bottomModal}
        onSwipeComplete={() => setVisibleModal(null)}
        swipeDirection={"down"}
        onBackdropPress={() => setVisibleModal(null)}
      >
        {renderModalContent()}
      </Modal>
      <Modal
        isVisible={addModal === 1}
        style={styles.bottomModal}
        onSwipeComplete={() => setVisibleAddModal(null)}
        swipeDirection={"down"}
        onBackdropPress={() => setVisibleAddModal(null)}
      >
        {AddModalContent()}
      </Modal>
      <TouchableOpacity
        style={styles.addPost}
        onPress={() => {
          setVisibleAddModal(1);
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
