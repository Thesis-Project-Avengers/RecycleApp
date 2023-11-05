import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faSackXmark} from "@fortawesome/free-solid-svg-icons"

const AccSpendPoint = () => {
  const styles = StyleSheet.create({
    god:{
      width: '100%',
      backgroundColor: 'red',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    mainViewContainer: {
      marginTop: 40,
      height: '50%',
      gap: 10
    },
    parent: {
      width: '80%', 
      display: 'flex',
      flexDirection: 'row', 
      height: '50%',
      gap: 10
    
      
    },
    children: {
      width: '54%', 
      height:"100%",
      backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    // nas:{
    //   fontWeight:20
    // }
  });

  return (
    <View style={styles.god}>
      <View style={styles.mainViewContainer}>
        <View style={styles.parent}>
          <View style={styles.children}>
          <FontAwesomeIcon size={50} icon={faSackXmark} style={{color: "#000000",}} />
            <Text>sayeb</Text>
          </View>
          <View style={styles.children}>
            <Text >sayeb</Text>
          </View>
        </View>
        <View style={styles.parent}>
          <View style={styles.children}>
            <Text style={{}} >sayeb</Text>
          </View>
          <View style={styles.children}>
            <Text>sayeb</Text>
          </View>
        </View>
      </View>
      <Text style={{position:"left"}}>List</Text>
    </View>
  );
};

export default AccSpendPoint;
