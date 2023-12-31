import { View, Text, StyleSheet, ScrollView, Image, Touchable, TouchableOpacity, ActivityIndicator, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FloatingAction } from 'react-native-floating-action'
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import uuid from "uuid"
import OneTip from '../components/OneTip'
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../firebaseConfig'
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const TipsScreen = () => {
    const [tips, setTips] = useState([])
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [visibleModal, setVisibleModal] = useState(false);
    const [tipForm, setTipForm] = useState({
        content: null,
        image: null,
    });
    useFocusEffect(useCallback(() => {
        const refrence = collection(FIREBASE_DB, "Tips")
        const q = query(refrence, orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const tipsData = [];
            querySnapshot.docs.forEach((doc) => {
                const data = { id: doc.id, ...doc.data() }
                tipsData.push(data);
            });
            setTips(tipsData);
        })
        setLoading(false);
    }, [update]))

    const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(FIREBASE_STORAGE, uuid.v4());
        const result = await uploadBytes(fileRef, blob);


        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(fileRef);
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })
        // result.canceled=false
        if (!result.canceled) {
            const uplodUrl = await uploadImageAsync(result.assets[0].uri)
            // setImage(uplodUrl)
            setTipForm({ ...tipForm, image: uplodUrl })
            // or add a doc 
        } else {
            alert('You did not select any image.');
        }
        // if (hasGalleryPermission === false) {
        //   return <Text>no permmison</Text>
        // }
    }
    const addTip = async () => {
        try {
            const tipscollection = collection(FIREBASE_DB, 'Tips');
            const tipData = {
                ...tipForm,
                posterId: FIREBASE_AUTH.currentUser?.uid,
                createdAt: serverTimestamp(),
                isLiked: [],
                numlikes: 0,
                isFavourite: []
            };
            await addDoc(tipscollection, tipData)
            setVisibleModal(false);
            setLoading(true);
            setUpdate(!update)
            setTipForm({
                content: null,
                image: null,
            })
        } catch (error) {
            console.log(error);
        }
    }



    if (!loading) {
        if (tips.length > 0) {
            return (<SafeAreaView style={styles.container} >
                < ScrollView
                    style={{ gap: 10 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* take me to the collectorProfile */}
                    {tips.map((tip, index) =>

                        <OneTip key={index} tip={tip} />
                    )}

                </ScrollView>
                <FloatingAction
                    overlayColor='transparent'
                    onPressMain={() => setVisibleModal(true)} color='#93C572' />
                <Modal
                    isVisible={visibleModal}
                    onBackdropPress={() => setVisibleModal(false)}
                >
                    <View style={{
                        backgroundColor: "white",
                        padding: 22,
                        gap: 10,
                        // alignItems: "center",
                        borderRadius: 20
                    }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: 700, fontSize: 20 }} >Add A Tip ...</Text>
                            <Icon
                                onPress={() => addTip()}

                                name='add' size={35} color="green" />
                        </View>
                        <TextInput
                            onChangeText={(text) => setTipForm({ ...tipForm, content: text })}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            placeholder='Content' />
                        {tipForm.image && <Image width={100} height={100} borderRadius={20} source={{ uri: tipForm.image }} />}
                        <TouchableOpacity onPress={() => pickImage()}
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Icon name='camera-outline' size={30} />
                            <Text style={{ fontSize: 16 }}>Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </SafeAreaView >)

        } else {
            return <SafeAreaView style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                <Text>No Tips For Now </Text>
                <FloatingAction
                    overlayColor='transparent'
                    onPressMain={() => setVisibleModal(true)} color='#93C572' />
                <Modal
                    isVisible={visibleModal}
                    onBackdropPress={() => setVisibleModal(false)}
                >
                    <View style={{
                        backgroundColor: "white",
                        padding: 22,
                        gap: 10,
                        // alignItems: "center",
                        borderRadius: 20
                    }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: 700, fontSize: 20 }} >Add A Tip ...</Text>
                            <Icon
                                onPress={() => addTip()}

                                name='add' size={35} color="green" />
                        </View>
                        <TextInput
                            onChangeText={(text) => setTipForm({ ...tipForm, content: text })}
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            placeholder='Content' />
                        {tipForm.image && <Image width={100} height={100} borderRadius={20} source={{ uri: tipForm.image }} />}
                        <TouchableOpacity onPress={() => pickImage()}
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Icon name='camera-outline' size={30} />
                            <Text style={{ fontSize: 16 }}>Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </SafeAreaView>
        }

    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="green" />
                <Text>Loading</Text>
            </View>

        )
    }



}

export default TipsScreen




export const styles = StyleSheet.create({
    container: {
        padding: 15,
        // backgroundColor: "green",
        height: "100%",
    },
    input: {
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: "#eee",
        borderRadius: 20,
        width: "100%",
        textAlignVertical: "top",
    }

})
