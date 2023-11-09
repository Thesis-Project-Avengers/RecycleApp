import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'

const Filtrel = ({recyclableItems}) => {
    const [cata, setCata] = useState("");
    console.log(recyclableItems);
  return (
    <FlatList
    style={{ position: "absolute", top: "5%", padding:"5%" }}
    data={recyclableItems}
    renderItem={({item}) => {
      return (
        <TouchableOpacity
        
          onPress={() => {
            setCata(item.type);
          }}
        >
          <Text
            style={
              cata === item.type
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
            {item.type}
          </Text>
        </TouchableOpacity>
      );
    }}
    keyExtractor={(item) => item.id}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  />
  )
}

export default Filtrel