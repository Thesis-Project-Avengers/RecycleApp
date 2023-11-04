import { View, Text,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React,{useState}from 'react'
const AddModal = ({recyclableItems}) => {
    const [selected, setSelected] = useState("");

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
      });
    
  return (
   
        <View style={styles.addModalContent}>
          <Text style={{ fontSize: 30, color: "#93C572" }}>Add New Item</Text>
          <View style={{ width: "100%", paddingTop: 20 }}>
            <Text style={{ marginBottom: 10, paddingLeft: 10 }}>Add Category</Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {recyclableItems.map((item,key) => {
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
          </View>
        </View>
      );
  
}

export default AddModal