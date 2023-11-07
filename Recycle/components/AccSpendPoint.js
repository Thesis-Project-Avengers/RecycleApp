import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faAngleRight, faCommentsDollar, faHandshakeAngle, faShieldDog, faTree } from "@fortawesome/free-solid-svg-icons"

const items = [
  'Item 1 qzfzafqs segqsqdvdbs qege',
  'Item 2 qzfzafqs segq sqdvdbs ',
  'Item 3 qzfzafqs segq sqdvdbs q',
  'Item 4 egfzrshrhendjdrtdn',
];
const AccSpendPoint = () => {
  return (
    <View style={styles.god}>
      <View style={styles.mainViewContainer}>
        <View style={{ height: '45%' }}>
          <View style={styles.parent}>
            <View style={styles.children}>
              <FontAwesomeIcon size={50} icon={faTree} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Make your forest</Text>
            </View>
            <View style={styles.children}>
              <FontAwesomeIcon size={50} icon={faCommentsDollar} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Spend you points</Text>
            </View>
          </View>
          <View style={styles.parent}>
            <View style={styles.children}>
              <FontAwesomeIcon size={50} icon={faShieldDog} style={{ color: "#000000", }} />
              <Text style={styles.textDecor} >Save Street dogs</Text>
            </View>
            <View style={styles.children}>
              <FontAwesomeIcon size={50} icon={faHandshakeAngle} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Cooperate with us</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainCard}>
          <TouchableOpacity style={{ width: "10%", marginHorizontal: 5 }}><FontAwesomeIcon size={36} icon={faAngleLeft} /></TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FontAwesomeIcon icon={faTree} color='black' size={45} />
            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>yassine ya rjouliiiii</Text>
            <View style={{ padding: 15 }}>
              <UnorderedList items={items} />
            </View>
          </View>
          <TouchableOpacity ><FontAwesomeIcon size={36} icon={faAngleRight} /></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export const ListItem = ({ item }) => {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};
export const UnorderedList = ({ items }) => {
  if (!items || items.length === 0) {
    return null; // Return null or a message when items are undefined or empty
  }

  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.bullet} />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
export default AccSpendPoint;
const styles = StyleSheet.create({
  god: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  mainViewContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%',
    width: '90%',
    // gap: 5,
    backgroundColor: "yellow",
  },
  parent: {
    padding: 2.5,
    gap: 5,
    width: '100%',
    flexDirection: 'row',
    // height: '30%',
    // justifyContent: "space-between"
    // gap: 10,
  },
  children: {
    width: '50%',
    height: "100%",
    backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textDecor: {
    marginTop: 10,
  },
  mainCard: {
    flexDirection: "row",
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 10,
    height:"37%" 
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    width: 10, // Adjust the size of the bullet point as needed
    height: 10, // Adjust the size of the bullet point as needed
    backgroundColor: 'black', // Adjust the color of the bullet point as needed
    borderRadius: 5, // Make it a circle
    marginRight: 5, // Spacing between bullet and text
  },
  itemText: {
    fontSize: 12, // Adjust the font size as needed
  },
});