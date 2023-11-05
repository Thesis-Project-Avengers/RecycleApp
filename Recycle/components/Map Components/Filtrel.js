import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'

const Filtrel = ({recyclableItems}) => {
    const [cata, setCata] = useState("");
    
  return (
    <FlatList
    style={{ position: "absolute", top: "5%", padding:"5%" }}
    data={recyclableItems}
    renderItem={({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setCata(item);
          }}
        >
          <Text
            style={
              cata === item
                ? {
                    padding: 10,
                    borderWidth: 1,
                    margin: 3,
                    borderRadius: 50,
                    borderColor: "#93C572",
                    backgroundColor: "#93C572",
                    color: "white",
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
    }}
    keyExtractor={(item) => item.key}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  />
  )
}

export default Filtrel