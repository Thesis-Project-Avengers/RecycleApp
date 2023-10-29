import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';


export default function Map() {
  const API_KEY = 'AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo';
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedPos, setselectedPos] = useState(null);


  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });






  


  return (
    <View style={styles.container}>
      {currentRegion ? (
        <MapView
          style={styles.map} initialRegion={currentRegion}
          showsUserLocation
          onPress={(e)=> setselectedPos(e.nativeEvent.coordinate)}

        >
          <Marker
            draggable
            coordinate={currentRegion}
            pinColor={'black'}
            onPress={() => { console.log(currentRegion) }}
          >
            <Image
              src={'https://imgs.search.brave.com/fzbZoosm4pDfHlQx2Ez-I_orCHBR46cYwc6JpiH_fi0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTA3Ny8xMDc3/MTE0LnBuZw'}
              style={{ width: 30, height: 30 }} // Set the width and height as needed
            />
          </Marker>
         { selectedPos ? <Marker
            draggable
            coordinate={selectedPos}
            title='deeee'
            description='eeee'
            pinColor={'black'}
            onPress={() => {console.log(currentRegion) }}
          >
            <Image
              src={'https://imgs.search.brave.com/fzbZoosm4pDfHlQx2Ez-I_orCHBR46cYwc6JpiH_fi0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTA3Ny8xMDc3/MTE0LnBuZw'}
              style={{ width: 30, height: 30 }} // Set the width and height as needed
            />
          </Marker> : null}

          <MapViewDirections
            origin={currentRegion}
            destination={selectedPos}
            apikey= {API_KEY}
            strokeWidth={6}
            strokeColor="green"
          />


        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}


