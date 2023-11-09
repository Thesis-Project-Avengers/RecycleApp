import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ChatHeader from './ChatHeader'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Image } from 'react-native-elements';
import sabta from '../assets/belt.webp'
import bond9a from '../assets/bond9a.jpg';
import bond9a1 from '../assets/bond9a1.jpg';
import rommana from '../assets/rommana.png';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TreeShop = () => {
    return (
        <View style={styles.god} >
            <ChatHeader />
            <View style={styles.cardsContainer} >
                <TreeCard />
            </View>
        </View>
    )
}
export const TreeCard = () => {
    return (
        <GestureHandlerRootView>
            <View style={styles.card}>
                <ImageBackground
                    source={rommana}
                    style={styles.image}
                >
                </ImageBackground>
                <View style={styles.info}>
                    <View onPress={() => console.log("Product Clicked")} style={styles.textReset}>
                        <Text style={styles.cardTitle}>Pomegranate Tree (Punica granatum)</Text>
                    </View>
                    <View onPress={() => console.log("Category Clicked")} style={styles.textReset}>
                        <Text> Pomegranate trees are cultivated for their delicious fruits and are common in Tunisian orchards.</Text>
                    </View>
                    <Text style={styles.price}>$61.99</Text>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};


export default TreeShop

const styles = StyleSheet.create({
    cardsContainer: {
        backgroundColor: 'red',
        height: '100%',
        // padding: 10,
        // flexDirection: 'column',
        // overflow:'visible',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 10,
        backgroundColor: 'white',
        // alignItems: 'center',
        
        height: '80%'
    },
    image: {
        width: '100%',
        height: '80%'
    },
    cardTitle: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
    },
    info:{
        backgroundColor: 'yellow'
    }

})