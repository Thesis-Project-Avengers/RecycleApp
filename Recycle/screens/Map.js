import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { GooglePlacesAutocomplete } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import customMapStyleJSON from "../mapStyle";
import OnePosition from "../components/Map Components/onePosition";
import Modal from "react-native-modal";

import axios from "axios";
import InfoModal from "../components/Map Components/InfoModal";
import AddModal from "../components/Map Components/AddModal";
import Filtrel from "../components/Map Components/Filtrel";
import { SafeAreaView } from "react-native";
export default function Map() {
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedPos, setselectedPos] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);
  const [addModal, setVisibleAddModal] = useState(null);
  const [currentInformation, setCurrentInformation] = useState(null);
  const [showWay, setShowWay] = useState(0);
  const [mode, setMode] = useState("driving");
  const mapRef = useRef(null);

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
        latitudeDelta: 0.02,
        longitudeDelta: 0.02, // Adjust as needed
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

  const handleAnimateToRegion = (loc) => {
    const newRegion = {
      ...loc.location,
      latitudeDelta: 0.1,
      longitudeDelta: 0,
    };
    const newCameraSettings = {
      center: {
        ...loc.location,
      },
      heading: 0, // Set the bearing (rotation) to 90 degrees
      pitch: 60,
      tilt: 45, // Set the viewing angle (tilt) to 45 degrees
      zoom: 15, // Set the zoom level
    };
    mapRef.current.animateToRegion(newRegion, 1000);
    mapRef.current.animateCamera(newCameraSettings, { duration: 2000 });
  };

  const calculateBearing = (start, end) => {
    const startLat = start.latitude * (Math.PI / 180);
    const startLng = start.longitude * (Math.PI / 180);
    const endLat = end.latitude * (Math.PI / 180);
    const endLng = end.longitude * (Math.PI / 180);

    const dLng = endLng - startLng;

    const y = Math.sin(dLng) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);

    const bearing = Math.atan2(y, x) * (180 / Math.PI);

    return (bearing + 360) % 360;
  };

  const handleAnimate = (loc) => {
    const newRegion = {
      ...loc,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const newCameraSettings = {
      center: {
        ...loc,
      },
      heading: calculateBearing(loc, selectedPos.location), // Set the bearing (rotation) to 90 degrees
      pitch: 60,
      tilt: 45, // Set the viewing angle (tilt) to 45 degrees
      zoom: 15, // Set the zoom level
    };
    mapRef.current.animateToRegion(newRegion, 2000);
    mapRef.current.animateCamera(newCameraSettings, { duration: 2000 });
  };

  const getSelectedInformation = async (info,theMode) => {
    const data = await axios.post(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentRegion.latitude},${currentRegion.longitude}&destinations=${info.location.latitude},${info.location.longitude}&mode=${theMode}&key=${API_KEY}`
    );
    setCurrentInformation({ ...data.data.rows[0].elements[0], ...data.data });
  };

  const recyclableItems = [
    "Aluminum Cans",
    "Glass Bottles",
    "Paper",
    "Plastic Bottles",
    "Cardboard Boxes",
    "Steel Cans",
  ];

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
    <SafeAreaView style={styles.container}>
      {currentRegion ? (
        <MapView
          ref={mapRef}
          showsMyLocationButton={false}
          customMapStyle={customMapStyleJSON}
          style={styles.map}
          initialRegion={currentRegion}
          showsUserLocation
          pitchEnabled={true}
          rotateEnabled={true}
        >
          {places.map((loc,key) => {
            return (
              <OnePosition
                loc={loc}
                setselectedPos={setselectedPos}
                setVisibleModal={setVisibleModal}
                getSelectedInformation={getSelectedInformation}
                handleAnimateToRegion={handleAnimateToRegion}
                setShowWay={setShowWay}
                key={key}
              />
            );
          })}
          {showWay ? (
            <MapViewDirections
              origin={currentRegion}
              destination={selectedPos.location}
              apikey={API_KEY}
              strokeWidth={6}
              strokeColor="#93C572"
              mode={mode.toUpperCase()}
              resetOnChange={true}
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
        {
          <InfoModal
            currentInformation={currentInformation}
            currentRegion={currentRegion}
            handleAnimate={handleAnimate}
            setShowWay={setShowWay}
            setVisibleModal={setVisibleModal}
            setMode={setMode}
            mode={mode}
            getSelectedInformation={getSelectedInformation}
            selectedPos={selectedPos}
          />
        }
      </Modal>

      <Modal
        isVisible={addModal === 1}
        style={styles.bottomModal}
        onBackdropPress={() => setVisibleAddModal(null)}
      >
        {<AddModal recyclableItems={recyclableItems} />}
      </Modal>

      <Filtrel recyclableItems={recyclableItems} />

      <TouchableOpacity
        style={styles.addPost}
        onPress={() => {
          setVisibleAddModal(1);
        }}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
