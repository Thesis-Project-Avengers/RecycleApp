import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCommentsDollar, faHandshakeAngle, faShieldDog, faTree} from "@fortawesome/free-solid-svg-icons"

const AccSpendPoint = () => {
  const styles = StyleSheet.create({
    god:{
      width: '100%',
      backgroundColor: 'red',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      // justifyContent:'center'
      
    },
    mainViewContainer: {
      marginTop: 40,
      height: '50%',
      gap: 10,
      backgroundColor:"yellow",
      display: 'grid',
      
    
    },
    parent: {
      width: '80%', 
      display: 'flex',
      flexDirection: 'row', 
      height: '50%',
      gap: 10,
      
    
      
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
    textDecor:{
      marginTop: 10,
    },
    explain:{
      backgroundColor:"blue",
      width:200,
      height:"73%"
    }
  });

  return (
    <View style={styles.god}>
      <View style={styles.mainViewContainer}>
        <View style={styles.parent}>
          <View style={styles.children}>
          <FontAwesomeIcon size={50} icon={faTree} style={{color: "#000000",}} />
            <Text style={styles.textDecor}>Make your forest</Text>
          </View>
          <View style={styles.children}>
          <FontAwesomeIcon size={50} icon={faCommentsDollar} style={{color: "#000000",}} />
          
            <Text style={styles.textDecor}>Spend you points</Text>
          </View>
        </View>
        <View style={styles.parent}>
          <View style={styles.children}>
          <FontAwesomeIcon size={50} icon={faShieldDog} style={{color: "#000000",}} />
            <Text style={styles.textDecor} >Save Street dogs</Text>
          </View>
          <View style={styles.children}>
          <FontAwesomeIcon size={50} icon={faHandshakeAngle} style={{color: "#000000",}} />
            <Text style={styles.textDecor}>Cooperate with us</Text>
          </View>
          <View style= {styles.explain}>

</View>
        </View>
      
      </View>
    </View>
  );
};

export default AccSpendPoint;
