import { Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, getDownloadURL } from "firebase/storage";
import send from "../assets/send.png"
import camera from "../assets/camera.png"
import React, { useCallback, useState } from 'react'
import { GiftedChat, InputToolbar, Actions, Bubble, SystemMessage, Composer, Send, Message } from 'react-native-gifted-chat'
import { ref } from "firebase/storage"
import uuid from "uuid";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { query } from 'firebase/database';
import { addDoc, collection, onSnapshot, orderBy } from 'firebase/firestore';


const SpecificChatScreen = () => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    useFocusEffect(useCallback(() => {
        const collectionRef = collection(FIREBASE_DB, "chats")
        const q = query(collectionRef, orderBy("createdAt", "desc"))
        const unscribe = onSnapshot(q, snapshot => {
            setMessages(
                snapshot.docs.map(doc => {
                    return (
                        {
                            _id: doc.id,
                            text: doc.data().text,
                            createdAt: doc.data().createdAt.toDate(),
                            user: doc.data().sender,
                            image: doc.data().image
                        }
                    )
                })
            )
        })
        return () => unscribe();
    }, []))

    const uploadImageAsync = async (uri) => {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
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
            console.log(" here the uplod url ", uplodUrl);
            setImage(uplodUrl);
            // or add a doc 
        } else {
            alert('You did not select any image.');
        }
        // if (hasGalleryPermission === false) {
        //   return <Text>no permmison</Text>
        // }
    }


    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        const { _id, createdAt, text, user } = messages[0]
        // console.log("before add ");
        // console.log(image);
        await addDoc(collection(FIREBASE_DB, "chats"), {
            _id, createdAt, text, sender: user, image
        })

        // setImage(null)

    }, [])
    return (
        <GiftedChat
            messages={messages}
            text={text}
            // isTyping
            isCustomViewBottom
            alwaysShowSend
            renderSend={(props) => (
                <Send

                    {...props}
                    disabled={!props.text}
                    containerStyle={{
                        width: 44,
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 4,
                    }}
                >
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={send}
                    />
                </Send>
            )}
            renderComposer={(props) => (
                <Composer
                    placeholder='Aa'
                    {...props}
                    textInputStyle={{
                        fontSize: 16,
                        fontFamily: "",
                        color: '#000',
                        backgroundColor: '#e8e9eb',
                        opacity: 0.5,
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: "transparent",
                        paddingHorizontal: 12,
                        marginLeft: 0,
                        paddingLeft: 15
                    }}
                />
            )}
            renderActions={(props) => (
                <Actions
                    {...props}
                    containerStyle={{
                        width: 44,
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 4,
                        marginRight: 4,
                        marginBottom: 0,
                    }}
                    icon={() => (
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={camera}
                        />
                    )}
                    options={{
                        'Choose From Library': async () => {
                            // here
                            // (async () => {
                            //   const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                            //   setHasGalleryPermission(galleryStatus.status == "granted")
                            // })()
                            await pickImage()
                        },
                        Cancel: () => {
                            console.log('Cancel from Library');
                        },
                    }}
                    optionTintColor="#222B45"
                />
            )}
            renderInputToolbar={props => < InputToolbar
                {...props}

                containerStyle={{
                    backgroundColor: '#fff',
                    padding: 8,

                }}
                primaryStyle={{ alignItems: 'center' }}
            />}
            renderUsernameOnMessage
            showAvatarForEveryMessage
            scrollToBottom
            onInputTextChanged={setText}
            onSend={messages => onSend(messages)}
            user={{
                _id: FIREBASE_AUTH.currentUser?.uid,
                avatar: FIREBASE_AUTH.currentUser?.photoURL,
                name: FIREBASE_AUTH.currentUser?.displayName
            }}
        />
    )
}

export default SpecificChatScreen