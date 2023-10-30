import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import customMapStyleJSON from "../mapStyle";
import OnePosition from "../components/onePosition";
import Modal from 'react-native-modal';
export default function Map() {
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedPos, setselectedPos] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);

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
      id:1,
      name: "Paradise House Tunisia",
      location: {
        latitude: 36.83624,
        longitude: 10.02023,
      },
    },
    {
      id:2,
      name: "Paradise House Agence Immobilière Tunisie",
      location: {
        latitude: 36.80531,
        longitude: 10.15161,
      },
    },
    {
      id:3,
      name: "Paradise House Tunisia La Goulette",
      location: {
        latitude: 36.75133,
        longitude: 10.51285,
      },
    },
    {
      id:8,
      name: "BourseImmo",
      location: {
        latitude: 36.80523,
        longitude: 10.16807,
      },
    },
    {
      id:4,
      name: "TPS Real Hammamet Tunisia",
      location: {
        latitude: 36.75133,
        longitude: 10.51285,
      },
    },
    {
      id:5,
      name: "Capital Immobilière",
      location: {
        latitude: 36.80303,
        longitude: 10.08225,
      },
    },
    {
      id:6,
      name: "FirstHome Realestate",
      location: {
        latitude: 36.80531,
        longitude: 10.15161,
      },
    },
  ];
console.log(selectedPos);
  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>{selectedPos.name}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:"center",
    },
    map: {
      width: "100%",
      height: "100%",
    },
    modalContent: {
      height:'50%',
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    }
  });

  return (
    <View style={styles.container}>
      {currentRegion ? (
        <MapView
          customMapStyle={customMapStyleJSON}
          style={styles.map}
          initialRegion={currentRegion}
          showsUserLocation
        >
          {places.map((loc) => {
            return <OnePosition loc={loc} key={loc.id} setselectedPos={setselectedPos} setVisibleModal={setVisibleModal}/>
             
            ;
          })}
          {selectedPos ?

          <MapViewDirections
            origin={currentRegion}
            destination={selectedPos.location}
            apikey={API_KEY}
            strokeWidth={4}
            strokeColor="green"
          /> : null
        }
        </MapView>
      ) : (
        <>
        <ActivityIndicator size="large"  color="green"/>
        <Text>
          Loading
        </Text>
        </>
      )}
       <Modal
        isVisible={visibleModal === 1}
        style={styles.bottomModal}
        onSwipeComplete={() => setVisibleModal(null)} 
        swipeDirection={'down'}
      >
        {renderModalContent()}
      </Modal>
    </View>
  );
}
