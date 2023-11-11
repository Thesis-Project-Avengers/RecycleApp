import { Image, View, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import send from "../assets/send.png";
import camera from "../assets/camera.png";
import React, { useCallback, useMemo, useState } from "react";
import {
    GiftedChat,
    InputToolbar,
    Actions,
    Bubble,
    Composer,
    Send,
    Message,
    Avatar,
    MessageText,
} from "react-native-gifted-chat";
import { ref } from "firebase/storage";
import uuid from "uuid";
import {
    FIREBASE_AUTH,
    FIREBASE_DB,
    FIREBASE_STORAGE,
} from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { query } from "firebase/database";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

const SpecificChatScreen = ({ route }) => {
    const { roomId } = route.params;
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)
    const memorizedMessgaes = useMemo(() => {
        return messages;
    }, [messages]);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const fetchData = useCallback(() => {
        const chatsCollectionRef = collection(FIREBASE_DB, "rooms/" + roomId + "/chats");
        const q = query(chatsCollectionRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const promises = snapshot.docs.map(async (document) => {
                const documentRef = doc(FIREBASE_DB, "users", document.data()?.sender);
                const senderDoc = await getDoc(documentRef);
                const sender = {
                    _id: senderDoc.id,
                    name: senderDoc.data()?.displayName,
                    avatar: senderDoc.data()?.photoURL,
                };
                return {
                    ...document.data(),
                    createdAt: document.data()?.createdAt?.toDate(),
                    id: document.id,
                    user: sender,
                };
            });

            Promise.all(promises)
                .then((data) => {
                    setMessages(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching messages: ", error);
                });
        });

        // Cleanup subscription on component unmount or when the focus is lost
        return () => unsubscribe();
    }, [roomId]);

    useFocusEffect(fetchData);






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
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        // result.canceled=false
        if (!result.canceled) {
            const uplodUrl = await uploadImageAsync(result.assets[0].uri);
            setImage(uplodUrl);
            // or add a doc
        } else {
            alert("You did not select any image.");
        }
        // if (hasGalleryPermission === false) {
        //   return <Text>no permmison</Text>
        // }
    };

    const onSend = useCallback(async (messages = [], image) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];

        const chatsCollectionRef = collection(
            FIREBASE_DB,
            "rooms/" + roomId + "/chats"
        );
        console.log("bfore add ", image);

        await addDoc(chatsCollectionRef, {
            _id,
            createdAt,
            text,
            sender: user?._id,
            image,
        });
        setImage(null)
        const roomsCollection = doc(FIREBASE_DB, "rooms", roomId)
        updateDoc(roomsCollection, {
            lastMessage: text,
            lastMessageDate: serverTimestamp()
        })
    }, []);
    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <ActivityIndicator size="large" color="black" />
            <Text>Loading....</Text>
        </View>
    } else {
        return (
            <GiftedChat
                messages={messages}
                text={text}
                scrollToBottom
                isCustomViewBottom
                alwaysShowSend
                renderAvatar={(props) => (
                    <Avatar
                        {...props}
                        imageStyle={{ left: { borderWidth: 2, borderColor: '#93C572' } }}
                    />
                )}
                renderChatEmpty={() => (
                    <View
                        style={{ transform: [{ rotate: '180deg' }], flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>No Messages For Now Start 👋</Text>
                    </View>
                )}
                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: { backgroundColor: "#DCDCDC" },
                            right: { backgroundColor: "#93C572" },
                        }}
                    />
                )}
                renderMessage={(props) => (
                    <Message
                        {...props}
                        containerStyle={{
                            left: { padding: 2 },
                            right: { padding: 2 },
                        }}
                    />
                )}
                renderSend={(props) => (
                    <Send
                        {...props}
                        disabled={!props.text}
                        containerStyle={{
                            width: 44,
                            height: 44,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 4,
                        }}
                    >
                        <Image style={{ width: 32, height: 32 }} source={send} />
                    </Send>
                )}
                renderComposer={(props) => (
                    <Composer
                        placeholder="Aa"
                        {...props}
                        textInputStyle={{
                            fontSize: 16,
                            fontFamily: "",
                            color: "#000",
                            backgroundColor: "#e8e9eb",
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: "transparent",
                            paddingHorizontal: 12,
                            marginLeft: 0,
                            paddingLeft: 15,
                        }}
                    />
                )}

                renderActions={(props) => (
                    <Actions
                        {...props}
                        containerStyle={{
                            width: 44,
                            height: 44,
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 4,
                            marginRight: 4,
                            marginBottom: 0,
                        }}
                        icon={() => (
                            <Image style={{ width: 20, height: 20 }} source={camera} />
                        )}
                        options={{
                            "Choose From Library": async () => {

                                await pickImage();
                            },
                            Cancel: () => {
                                console.log("Cancel from Library");
                            },
                        }}
                        optionTintColor="#222B45"
                    />
                )}
                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            backgroundColor: "#fff",
                            padding: 5,
                        }}
                        primaryStyle={{ alignItems: "center" }}
                    />
                )}
                renderUsernameOnMessage
                showAvatarForEveryMessage
                onInputTextChanged={setText}
                onSend={(messages) => onSend(messages, image)}
                user={{
                    _id: FIREBASE_AUTH.currentUser?.uid,
                    avatar: FIREBASE_AUTH.currentUser?.photoURL,
                    name: FIREBASE_AUTH.currentUser?.displayName,
                }}
            />
        );
    }

};

export default SpecificChatScreen;
