import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import ChatHeader from './ChatHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import sabta from '../assets/belt.webp';
import bond9a from '../assets/bond9a.jpg';
import bond9a1 from '../assets/bond9a1.jpg';
import rommana from '../assets/rommana.png';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';

const TreeShop = () => {
    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <ChatHeader />
                <View style={styles.cardsContainer}>
                    <TreeCard />
                    <TreeCard />
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const TreeCard = () => {
    return (
        <View style={styles.card}>
            <Image
                source={rommana}
                style={styles.image}
            />
            <View style={styles.info}>
                <TouchableOpacity onPress={() => console.log("Product Clicked")} style={styles.textReset}>
                    <Text style={styles.cardTitle}>Pomegranate Tree (Punica granatum)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Category Clicked")} style={styles.textReset}>
                    <Text>Pomegranate trees are cultivated for their delicious fruits and are common in Tunisian orchards.</Text>
                </TouchableOpacity>
                <Text style={styles.price}>$61.99</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsContainer: {
        flex: 1,
        backgroundColor: 'red',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 10,
        backgroundColor: 'white',
        height: '70%',
    },
    image: {
        width: '100%',
        height: '70%',
    },
    cardTitle: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
    },
    info: {
        height: '30%',
        backgroundColor: 'yellow',
    },
    textReset: {
        backgroundColor: 'yellow',
    },
});

export default TreeShop;
