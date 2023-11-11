import React, { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

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
// import OnePosition from "../components/Map Components/OnePosition";
import Modal from "react-native-modal";

import axios from "axios";
import InfoModal from "../components/Map Components/InfoModal";
import AddModal from "../components/Map Components/AddModal";
import Filtrel from "../components/Map Components/Filtrel";
import { SafeAreaView } from "react-native";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import WayModal from "../components/Map Components/WayModal";
export default function Map() {
  const [user, setUser] = useState({});
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";
  const [loading, setLoding] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedPos, setselectedPos] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);
  const [addModal, setVisibleAddModal] = useState(null);
  const [wayModal, setWayModal] = useState(null);
  const [currentInformation, setCurrentInformation] = useState(null);
  const [showWay, setShowWay] = useState(0);
  const [mode, setMode] = useState("driving");
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 10,
          }, // You can adjust the update frequency and distance threshold here
          (newLocation) => {
            setCurrentRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        );
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      })();
      fetchUser();
      fetch();
      if (markers.length && currentRegion) setLoding(false);
      console.log("Screen is focused! Refreshing...");
    }, [])
  );

  useEffect(() => {
    getSelectedInformation(selectedPos, mode);
  }, [currentRegion]);

  // called insisede usefoucs
  const fetchUser = () => {
    const docUserref = doc(
      FIREBASE_DB,
      "users",
      FIREBASE_AUTH.currentUser?.uid
    );
    getDoc(docUserref).then((snapshot) => {
      setUser({ ...snapshot.data() });
    });
  };
  // called insisede usefoucs
  const fetch = () => {
    const markersCollectionRef = collection(FIREBASE_DB, "markers");
    let data = [];
    onSnapshot(markersCollectionRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setMarkers(data);
    });
  };

  const handleAnimateToRegion = (loc) => {
    const newRegion = {
      ...loc?.location,
      latitudeDelta: 0.1,
      longitudeDelta: 0,
    };
    const newCameraSettings = {
      center: {
        ...loc?.location,
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

  const getSelectedInformation = async (info, theMode) => {
    try {
      const data = await axios.post(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
          currentRegion?.latitude
        },${currentRegion?.longitude}&destinations=${info.location?.latitude},${
          info.location?.longitude
        }&mode=${theMode || mode}&key=${API_KEY}`
      );

      setCurrentInformation({
        ...data.data.rows[0].elements[0],
        ...data.data,
        ...info,
      });
    } catch (error) {
      console.log("google api fetching errror");
      console.log(error);
    }
  };

  const recyclableItems = [
    { id: 1, type: "Aluminum Cans" },
    { id: 2, type: "Glass Bottles" },
    { id: 3, type: "Paper" },
    { id: 4, type: "Plastic Bottles" },
    { id: 5, type: "Cardboard Boxes" },
    { id: 6, type: "Steel Cans" },
  ];

  const initialCamera = {
    center: {
      ...currentRegion, // Initial longitude
    },
    heading: 0, // Set the bearing (rotation) to 90 degrees
    pitch: 60,
    tilt: 45, // Set the viewing angle (tilt) to 45 degrees
    zoom: 15, // Initial zoom level
  };
  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <MapView
          camera={initialCamera}
          ref={mapRef}
          showsMyLocationButton={false}
          customMapStyle={customMapStyleJSON}
          style={styles.map}
          initialRegion={currentRegion}
          showsUserLocation
          pitchEnabled={true}
          rotateEnabled={true}
        >
          {markers?.map((loc, key) => {
            if (!loc.completed)
              return (
                <OnePosition
                  user={user}
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
              destination={selectedPos?.location}
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
          <Text>loading</Text>
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
            setWayModal={setWayModal}
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
        {
          <AddModal
            setVisibleAddModal={setVisibleAddModal}
            recyclableItems={recyclableItems}
            currentRegion={currentRegion}
          />
        }
      </Modal>

      <Filtrel recyclableItems={recyclableItems} />

      {user?.type === "accumulator" && (
        <TouchableOpacity
          style={styles.addPost}
          onPress={() => {
            setVisibleAddModal(1);
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      )}

      <Modal
        isVisible={wayModal === 1}
        hasBackdrop={false}
        coverScreen={false}
        onBackdropPress={() => setWayModal(null)}
      >
        {<WayModal currentInformation={currentInformation} />}
      </Modal>
    </SafeAreaView>
  );
}
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
