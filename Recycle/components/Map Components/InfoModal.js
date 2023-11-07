import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import InfoOfModal from "./DataModal";
import UserProfileModal from "./UserProfileModal"
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
const InfoModal = ({
  currentInformation,
  currentRegion,
  handleAnimate,
  setShowWay,
  setVisibleModal,
  setMode,
  getSelectedInformation,
  selectedPos,
  mode,
}) => {
  const [user,setUser] = useState({})
  useEffect(()=>{
    getUserInfo()
  },[])
 
const getUserInfo = async ()=>{
      try {
        setUser({})
        const refUser = doc(FIREBASE_DB,"users",currentInformation?.ownerId)
            await getDoc(refUser).then((snapshot)=>{
                 setUser(snapshot.data());
            })
      } catch (error) {
        console.log(error);
      }
}
  return (
    <View style={styles.modalContent}>
      <Swiper
        showsButtons={true}
        horizontal={true}
        loop={false}
        showsPagination={false}
        index={0}
      >
        <InfoOfModal
           currentInformation={currentInformation}
           currentRegion={currentRegion}
           handleAnimate={handleAnimate}
           setShowWay={setShowWay}
           setVisibleModal={setVisibleModal}
           setMode={setMode}
           mode={mode}
           getSelectedInformation={getSelectedInformation}
           selectedPos={selectedPos}
        />
        <UserProfileModal user={user}/>
      </Swiper>
    </View>
  );
};

export default InfoModal;
const styles = StyleSheet.create({
  modalContent: {
    height: "55%",
    backgroundColor: "white",
    padding: 22,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  Content: {
    height: "100%",
    backgroundColor: "white",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalText: {
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#93C572",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "#93C572",
  },
  selectedIcon: {
    marginRight: 10,
    fontSize: 20,
    backgroundColor: "#93C572",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "white",
  },
});