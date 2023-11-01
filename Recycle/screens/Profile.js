import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import recycle from '../assets/recycle.png'
import * as Progress from 'react-native-progress'
import Icon from 'react-native-vector-icons/MaterialIcons';


const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={recycle} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.name}>Flen Fouleni</Text>
                </View>
            </View>
            <View style={styles.stats} >
                <Text style={styles.statsTitle} >You've collected 3 Items this week</Text>
                <Text style={styles.statsValue} >75% of your weekly goal is done</Text>
                <Progress.Bar style={styles.statsProgress} progress={0.7} width={300} color='#73d905' />
            </View>
            <ScrollView >
                <View style={styles.profileOptions} >

                <Text style={styles.optionHeader} >Manage My Account</Text>
                <TouchableOpacity style={styles.button} >
                    <Icon name='history' size={36} />
                    <Text style={styles.optionsContent} >My Payments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Icon name='qr-code' size={36} />
                    <Text style={styles.optionsContent} >My Qr Code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("editprofile")}
                    style={styles.button} >
                    <Icon name='edit' size={36} />
                    <Text style={styles.optionsContent} >Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Icon name='logout' size={36} />
                    <Text style={styles.optionsContent} >Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Icon name='delete' size={36} />
                    <Text style={styles.optionsContent} >Delete Account</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5,

    },
    profileHeader: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        width: "100%",
        gap: 15,
        height: 100,
        marginTop: 50,
        borderWidth: 0.3,
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderRightColor: "#fff",
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 500,
        overflow: 'hidden',
        width: 70,
        height: 70,
    },
    nameContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 6
    },
    image: {
        borderRadius: 500,
        width: 70,
        height: 70,
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
        fontWeight: '400'
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(230, 230, 230)",
        width: '90%',
        height: 100,
        borderRadius: 25
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    statsValue: {
        fontSize: 14,
        fontWeight: '400',
    },
    statsProgress: {
        backgroundColor: 'white',
        borderColor: 'transparent',
        marginTop: 10
    },
    profileOptions: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 15,
        width: '100%',
        // backgroundColor: 'red',
        padding: 10
    },
    button: {
        // backgroundColor: 'green',
        width: '100%',
        height: 80,
        borderWidth: 0.3,
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderRightColor: "#fff",
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        gap: 10

    },
    optionHeader: {
        fontSize: 24,
        fontWeight: '600',
    },
    optionsContent: {
        fontSize: 20,
        fontWeight: '400',
    },
});