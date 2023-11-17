import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { CheckBox, Slider } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConvertionScrenn = () => {
    const recyclableItems = [
        { id: 1, type: "Aluminum Cans",kiloPrice:20,PiecePrice:0.5 },
        { id: 2, type: "Glass Bottles",kiloPrice:5,PiecePrice:0.3 },
        { id: 3, type: "Paper",kiloPrice:7,PiecePrice:0.07 },
        { id: 4, type: "Plastic Bottles",kiloPrice:100,PiecePrice:0.4 },
        { id: 5, type: "Cardboard Boxes" ,kiloPrice:7,PiecePrice:0.2},
        { id: 6, type: "Steel Cans",kiloPrice:7,PiecePrice:0.5 },
      ];
  const [selected, setSelected] = useState(recyclableItems[0]);
    const [quantity, setQuantite] = useState(1);
    const [unity, setUnity] = useState("kg");
    const [points, setPoints] = useState(0);
    const memorizePoints = useMemo(() => points, [points]);
    useEffect(() => {
      let withKg = quantity * selected.kiloPrice;
      let withPeice = Math.trunc(quantity) * selected.PiecePrice;
      if (unity === "kg") {
        return setPoints(quantity * selected.kiloPrice);
      }
      if (unity === "piece") {
        return setPoints(Math.trunc(quantity) * selected.PiecePrice);
      }
    }, [unity, quantity, selected]);
  return(
    <SafeAreaView style={{padding:20 , gap:20}} >
      {/* the categostylery   */}

    <View style={{ width: "100%", paddingTop: 20 }}>
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
              {item.type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>

  {/* th unity  */}
   <View
   style={{
    // backgroundColor:"red" ,
    // width: "70%",
     flexDirection: "row",
     marginHorizontal: 50,
     justifyContent: "space-between",
     alignItems: "center",
   }}
 >
   <Text>Unity :</Text>
   <TouchableOpacity
     onPress={() => {
       setUnity("kg");
       // calculePoints();
     }}
     style={
       unity === "kg"
         ? {
             backgroundColor: "#93C572",
             width: 50,
             padding: 5,
             borderRadius: 50,
           }
         : {
             backgroundColor: "white",
             width: 50,
             padding: 5,
             borderRadius: 50,
             borderWidth: 1,
           }
     }
   >
     <Text
       style={
         unity === "kg"
           ? { textAlign: "center", color: "white" }
           : { textAlign: "center", color: "black" }
       }
     >
       kg
     </Text>
   </TouchableOpacity>
   <TouchableOpacity
     onPress={() => {
       setUnity("piece");
       // calculePoints();
     }}
     style={
       unity === "piece"
         ? {
             backgroundColor: "#93C572",
             width: 70,
             padding: 5,
             borderRadius: 50,
           }
         : {
             backgroundColor: "white",
             width: 70,
             padding: 5,
             borderRadius: 50,
             borderWidth: 1,
           }
     }
   >
     <Text
       style={
         unity === "piece"
           ? { textAlign: "center", color: "white" }
           : { textAlign: "center", color: "black" }
       }
     >
       piece
     </Text>
   </TouchableOpacity>
 </View>

{/* quantity and slide  */}

 <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text>Quantity</Text>
            <Text>{Math.trunc(quantity)}</Text>
          </View>

          <Slider
            style={{ width: "100%", height: 20  }}
            minimumValue={1}
            maximumValue={200}
            thumbStyle={{height:30,width:30}}
            minimumTrackTintColor="#93C572"
            maximumTrackTintColor="#000000"
            value={quantity}
            thumbTintColor="#93C572"
            onValueChange={(value) => {
              setQuantite(value);
            }}
          />


          {/* Points text  */}
           <View>
            <Text>Points : {points?.toFixed(2)}</Text>
          </View>


 </SafeAreaView>
  )
    };
export default ConvertionScrenn

const styles = StyleSheet.create({
    addModalContent: {
      height: "84%",
      backgroundColor: "white",
      padding: 22,
      justifyContent: "flex-start",
      alignItems: "center",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
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