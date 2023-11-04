import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import React from "react";
import Swiper from 'react-native-swiper'
import { useState } from "react";

const InfoModal = ({
  currentInformation,
  currentRegion,
  handleAnimate,
  setShowWay,
  setVisibleModal,
  setMode,
  getSelectedInformation,
  selectedPos,
  mode
}) => {
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
    modalText: {
      fontSize: 25,
      alignSelf: "center",
      textAlign:"center"
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0,

    },
    icon: {
      marginRight: 10,
      fontSize: 20,
      borderWidth: 1,
      borderColor: "#93C572",
      borderRadius:30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color:"#93C572"
    },
     selectedIcon: {
      marginRight: 10,
      fontSize: 20,
    backgroundColor:"#93C572",
      borderRadius:30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color:"white"
    }
  });
  
  return (
    <View style={styles.modalContent}>
    <Swiper
    style={{padding:0}}
    automaticallyAdjustContentInsets={true}
    horizontal={true}
        loop={true}
        animated={true}
        showsPagination={true}
        index={1}>
    <View style={styles.modalContents}>
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
            size={10}
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

      <View style={{ flexDirection: "row", padding: "2%",alignItems:"center"}}>
      <Text style={{fontSize:20,marginRight:10}}>
        Mode
      </Text>
        <Icons
        onPress={()=>{setMode("walking");getSelectedInformation(selectedPos,"walking")}}
        name="walking"
        style={mode==="walking" ?styles.selectedIcon:styles.icon}
          />
        <Icons
          onPress={()=>{setMode("driving");getSelectedInformation(selectedPos,"driving")}}
          name="car-side"
          style={mode==="driving" ?styles.selectedIcon:styles.icon}
        />
      </View>

      <TouchableOpacity>
        <Text
          onPress={() => {
            setShowWay(1);
            setVisibleModal(0);
            handleAnimate(currentRegion);
          }}
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
     <View>
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
           size={10}
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

     <View style={{ flexDirection: "row", padding: "2%",alignItems:"center"}}>
     <Text style={{fontSize:20,marginRight:10}}>
       Mode
     </Text>
       <Icons
       onPress={()=>{setMode("walking");getSelectedInformation(selectedPos,"walking")}}
       name="walking"
       style={mode==="walking" ?styles.selectedIcon:styles.icon}
         />
       <Icons
         onPress={()=>{setMode("driving");getSelectedInformation(selectedPos,"driving")}}
         name="car-side"
         style={mode==="driving" ?styles.selectedIcon:styles.icon}
       />
     </View>

     <TouchableOpacity>
       <Text
         onPress={() => {
           setShowWay(1);
           setVisibleModal(0);
           handleAnimate(currentRegion);
         }}
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
   </Swiper>
   </View>
  );
};

export default InfoModal;
