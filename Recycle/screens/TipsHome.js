import {View,Text,StyleSheet,ScrollView,Image,Touchable,TouchableOpacity,ActivityIndicator,TextInput,} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import Modal from "react-native-modal";
import OneTipHome from "../components/OneTipHome";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const TipsHome = () => {
  const [tips, setTips] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [tipForm, setTipForm] = useState({
    content: null,
    image: null,
  });

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
      // setImage(uplodUrl)
      setTipForm({ ...tipForm, image: uplodUrl });
      // or add a doc
    } else {
      alert("You did not select any image.");
    }
    // if (hasGalleryPermission === false) {
    //   return <Text>no permmison</Text>
    // }
  };
  const addTip = async () => {
    try {
      const tipscollection = collection(FIREBASE_DB, "Tips");
      const tipData = {
        ...tipForm,
        user: {
          name: "bellhasen",
          pdpPhoto:
            "https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/347389791_1387274348784480_3857632196740571851_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VXy6Q4cz-c0AX_la_Rd&_nc_ht=scontent.ftun1-2.fna&oh=00_AfC-WqNkWPVdtat6t0VSWdax0D_ObqvrYYyeB_ujS3wWeA&oe=6547ADD3",
        },
        // createdAt: new Date().now(),
        isLiked: [],
        numlikes: 0,

        // Add more fields as needed
      };
      await addDoc(tipscollection, tipData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const refrence = collection(FIREBASE_DB, "Tips");
    getDocs(refrence).then((querySnapshot) => {
      const tipsData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        const data = { id: doc.id, ...doc.data() };

        tipsData.push(data);
      });
      setTips(tipsData);
    });
  }, []);

  if (tips.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Tips</Text>
          <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ fontSize: 13, color: "#93C572" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ gap: 10 }}
        >
          {/* < ScrollView
              style={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
          > */}
          {tips.map((tip) => (
            <OneTipHome key={tip.id} tip={tip} />
          ))}
        </ScrollView>
        <FloatingAction
          onPressMain={() => setVisibleModal(true)}
          color="#93C572"
        />
        <Modal
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 22,
              gap: 10,
              // alignItems: "center",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: 20 }}>
                Add A Tip ...
              </Text>
              <Icon
                onPress={() => addTip()}
                name="add"
                size={35}
                color="green"
              />
            </View>
            <TextInput
              onChangeText={(text) => setTipForm({ ...tipForm, content: text })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder="Content"
            />
            {tipForm.image && (
              <Image
                width={50}
                height={50}
                borderRadius={20}
                source={{ uri: tipForm.image }}
              />
            )}
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Icon name="camera-outline" size={30} />
              <Text style={{ fontSize: 16 }}>Photo</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  } else {
    return (
      
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading</Text>
      </View>
    );
  }
};

export default TipsHome;

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: "green",
    height: "100%",
  },
  input: {
    paddingVertical: 30,
    // paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    width: "100%",
    textAlignVertical: "top",

  },textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 210,
    alignItems: "center",
    margin: 1,
    padding:5
  },
});

