import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faAngleRight, faCommentsDollar, faHandshakeAngle, faShieldDog, faTree } from "@fortawesome/free-solid-svg-icons"
import { LinearGradient } from 'expo-linear-gradient';


const AccSpendPoint = () => {
  const [index, setIndex] = useState(0)
  const items=[
    ['Item 1 qzfzafqs segqsqdkjnnknkl',
      'Item 2 qzfzafqs segq sqdvdbs,l',
      'Item 3 qzfzafqs segq sqdvdbs q',
      'Item 4 egfzrshrhendjdrtdnnklln'],
    [
      "Item 1 thenya jdnaoqlskcqslnkkk",
      "Item 2 thenya adzlnqcsknizalcsq",
      "item 3dazkl,qslc,cmqls,oazùqcs;",
      "Item 4 denjlqscnazknsqcliza;qkm"
    ],
    [
      "Item 1 theltha jdnaoqlfezazfnj",
      "Item 2 theltha adqdsfqdslcsq",
      "item 3 dazkl,qslc,cmdqsqdsoazù",
      "Item 4 denjlqscnazknsqcliza;q"
    ],
    [
      "item 1 rab3a cnsqlkn;qslmq",
      "Item 2 rab3a adqdsfqdslcsq",
      "item 3 dazkl,qslc,cmdqsqdsoaz",
      "Item 4 denjlqscnazknsqcliza;q "
    ]
  ]
  const titles = [
    "Make your forest",
    "Spend you points",
    "Save Street dogs",
    "Cooperate with us"

  ];
  const logos = [
    <FontAwesomeIcon size={50} icon={faTree} style={{ color: "#000000", }} />,
    <FontAwesomeIcon size={50} icon={faCommentsDollar} style={{ color: "#000000", }} />,
    <FontAwesomeIcon size={50} icon={faShieldDog} style={{ color: "#000000", }} />,
    <FontAwesomeIcon size={50} icon={faHandshakeAngle} style={{ color: "#000000", }} />
  ]
  const handelSuiv = () => {
    if (index === 3) {
      setIndex(0)
    }
    else {
      setIndex(index + 1)
    }
  }
  const handelPrec = () => {
    if(index === 0){
      setIndex(3)
    }
    else {
      setIndex(index - 1)
    }
  }
  return (
    <View style={styles.god}>
      <View style={styles.mainViewContainer}>
        <View style={{ height: '45%' }}>
          <View style={styles.parent}>
            <TouchableOpacity style={styles.children}>
              <FontAwesomeIcon size={50} icon={faTree} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Make your forest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.children}>
              <FontAwesomeIcon size={50} icon={faCommentsDollar} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Spend you points</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.parent}>
            <TouchableOpacity style={styles.children}>
              <FontAwesomeIcon size={50} icon={faShieldDog} style={{ color: "#000000", }} />
              <Text style={styles.textDecor} >Save Street dogs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.children}>
              <FontAwesomeIcon size={50} icon={faHandshakeAngle} style={{ color: "#000000", }} />
              <Text style={styles.textDecor}>Cooperate with us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={['#00ff00', '#008000']} // Adjust colors as needed
          style={styles.mainCard}
        >
          <TouchableOpacity onPress={() => { handelPrec() }} style={{ width: "10%", marginHorizontal: 5 }}><FontAwesomeIcon size={36} icon={faAngleLeft} /></TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center", width: "72%" }}>
            {logos[index]}
            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>{titles[index]}</Text>
            <View style={{ padding: 15 }}>
              <UnorderedList items={items[index]} />
            </View>
          </View>
          <TouchableOpacity onPress={() => { handelSuiv() }} style={{ width: "10%", marginHorizontal: 5 }} ><FontAwesomeIcon size={36} icon={faAngleRight} /></TouchableOpacity>
        </LinearGradient>
       
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
    justifyContent: 'center',
    // backgroundColor: ''
  },
  mainViewContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%',
    width: '90%',
    // gap: 5,
    // backgroundColor: "yellow",
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
    backgroundColor: '#93c572',
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
    backgroundColor: "orange",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 10,
    height: "37%"
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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