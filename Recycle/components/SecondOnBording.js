import { Alert, StatusBar, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDumpster } from '@fortawesome/free-solid-svg-icons/faDumpster'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons/faMotorcycle'
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons/faCartFlatbedSuitcase'
import { faSeedling } from '@fortawesome/free-solid-svg-icons/faSeedling'
import { Icon, Text } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const CollOmbording = () => {
    const navigation = useNavigation()
    const [colQuestion, setColQuestion] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })
    const onboardingRef = useRef(null)
    // console.log(colQuestion);
    const handleYesPress = (index, value) => {
        setColQuestion({ ...colQuestion, [index]: value })
        onboardingRef.current?.goNext()
    }

    const handleNoPress = (index, value) => {
        setColQuestion({ ...colQuestion, [index]: value })
        onboardingRef.current?.goNext()
    }

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Onboarding
                showDone={false}
                bottomBarColor={"#93c572"}
                transitionAnimationDuration={700}
                onSkip={() => Alert.alert('Skipped')}
                ref={onboardingRef}
                pages={[
                    {
                        title: 'Hey!',
                        backgroundColor: '#fff',
                        titleStyles: { color: "#93c572" },
                        image: (
                            <FontAwesomeIcon size={100} icon={faDumpster} style={{ color: "#93c572" }} />
                        ),
                        subtitle: (
                            <View style={styles.subtitleMainView} >
                                <Text style={{ textAlign: 'center' }}>Are you hate looking for a valuable wast on the trash ?</Text>
                                <View style={styles.subtitleSecondView} >
                                    <TouchableOpacity style={styles.touchableOpacityStyle}
                                        onPress={() => { handleYesPress(1, true) }}
                                    >
                                        <Text style={{ color: 'white' }} >Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleNoPress(1, false) }}>
                                        <Text style={{ color: 'white' }}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    },
                    {
                        title: 'Transport',
                        backgroundColor: '#ffff',
                        titleStyles: { color: "#93c572" },
                        image: (
                            <FontAwesomeIcon size={100} icon={faMotorcycle} style={{ color: "#93c572" }} />
                        ),
                        subtitle: (
                            <View style={styles.subtitleMainView}>
                                <Text style={{ textAlign: 'center' }}>Do you own a motorcycle or any other vehicle suitable for waste collection ?</Text>
                                <View style={styles.subtitleSecondView}>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleYesPress(2, true) }}>
                                        <Text style={{ color: 'white' }} >Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touchableOpacityStyle}>
                                        <Text style={{ color: 'white' }} onPress={() => { handleNoPress(2, false) }} >No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    },
                    {
                        title: 'Be equipped',
                        backgroundColor: '#ffff',
                        titleStyles: { color: "#93c572" },
                        image: (
                            <FontAwesomeIcon size={100} icon={faCartFlatbedSuitcase} style={{ color: "#93c572" }} />
                        ),
                        subtitle: (
                            <View style={styles.subtitleMainView}>
                                <Text style={{ textAlign: 'center' }}>Do you have the necessary equipment for collecting waste, such as waste bins or bags ?</Text>
                                <View style={styles.subtitleSecondView}>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleYesPress(3, true) }}>
                                        <Text style={{ color: 'white' }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleNoPress(3, false) }}>
                                        <Text style={{ color: 'white' }} >No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    },
                    {
                        title: 'Nature',
                        backgroundColor: '#ffff',
                        titleStyles: { color: "#93c572" },
                        image: (
                            <FontAwesomeIcon size={100} icon={faSeedling} style={{ color: "#93c572" }} />
                        ),
                        subtitle: (
                            <View style={styles.subtitleMainView}>
                                <Text style={{ textAlign: 'center' }}>Are you eco-conscious and interested in contributing to a cleaner environment ?</Text>
                                <View style={styles.subtitleSecondView}>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleYesPress(4, true) }}>
                                        <Text style={{ color: 'white' }} >Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => { handleNoPress(4, false) }}>
                                        <Text style={{ color: 'white' }} >No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    },
                    {
                        title: "That's Enough",
                        titleStyles: { color: "#93c572" },
                        subtitle: (
                            <TouchableOpacity
                                title={'Get Started'}
                                style={{ backgroundColor: "#93c572", padding: 10, borderRadius: 5 }}
                                textStyle={{ color: '#ffff' }}
                                onPress={() => {
                                    Alert.alert('done ' + colQuestion);
                                    navigation.navigate("App")                                    // navigation && updtate the user 
                                    // navigation to the app  && updtae the user 
                                    StatusBar.setBarStyle('default');
                                }}
                            ><Text style={{ color: 'white' }}>Get Started</Text></TouchableOpacity>
                        ),
                        backgroundColor: '#ffff',
                        image: (
                            <Icon style={{ justifyContent: "center" }} name="rocket" type="font-awesome" size={100} color="#93c572" />
                        ),
                    },
                ]}
            />
        </View>
    )
};

export default CollOmbording;



const styles = StyleSheet.create({
    subtitleMainView: {
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "100%"
    },
    subtitleSecondView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        marginTop: 50,
    },
    touchableOpacityStyle: {
        backgroundColor: "#93c572",
        padding: 10,
        borderRadius: 10,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})