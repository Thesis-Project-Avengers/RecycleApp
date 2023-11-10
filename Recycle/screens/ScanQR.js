import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { FieldValue, doc, updateDoc } from "firebase/firestore";

const ScanQR = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not Yet Scanned");
  const navigation = useNavigation();
  console.log(route.params);



  const handleTransaction = async () => {
    const receiver = collection(FIREBASE_DB, "users",route.params.ownerId);
    await getDocs(receiver).then((sanpshot) => {
      console.log(sanpshot);
    })
    // const receiver = doc(FIREBASE_DB, "users",route.params.ownerId);
    // await updateDoc(receiver, {
    //   [pointes]: FieldValue.increment(route.params.pointes),
    // });

    // const senderId = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser?.uid);
    // await updateDoc(senderId, {
    //   [pointes]: FieldValue.increment(-route.params.pointes),
    // });
    console.log("done");
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  // Request camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // what happens when we scan the bar code
  const handelBarCodeScanner = ({ type, data }) => {
    setScanned(true);
    setText(data);
    //  data ?  navigation.navigate("Map") : null
    console.log("type: " + type + "\n data: " + data);
  };
  // check permission and return the screens
  if (hasPermission == null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera </Text>
      </View>
    );
  }
  if (hasPermission == false) {
    return (
      <View>
        <Text style={{ margin: 10 }}>no Access to camera</Text>
        <Button
          title={"Allow camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map")}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            paddingHorizontal: 20,
            backgroundColor: "red",
            margin: 10,
            paddingVertical: 10,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "white" }}>Close</Text>
        </TouchableOpacity>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handelBarCodeScanner}
            style={{ height: 400, width: 400 }}
          />
        </View>

        {scanned && (
          <View style={{ marginTop: 20, gap: 10 }}>
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={{
                backgroundColor: "tomato",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "white" }}>Scan again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                handleTransaction();
                navigation.navigate("Map");
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
