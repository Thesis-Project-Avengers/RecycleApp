import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import React, { useCallback, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../firebaseConfig";
import { query } from "firebase/database";
import OneTip from "../components/OneTip";

const ProfileVisitor = ({ route }) => {
  const navigation = useNavigation()
  const [visible,setVisible]=useState("false")
  const [tips, setTips] = useState([]);
  // console.log(tips);
  const { user } = route.params;
  useFocusEffect(
    useCallback(() => {
      const refrence = collection(FIREBASE_DB, "Tips");
      const q = query(refrence, where("posterId", "==", user?.uid));
      getDocs(q).then((querySnapshot) => {
        const tipsData = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          tipsData.push(data);
        });
        setTips(tipsData);
      });
      // setLoading(false);
    }, [])
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color="gold"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <ScrollView
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, height: "auto" }}
      >
        <View style={styles.header}>
          <Icon3 name="arrow-back-ios" size={30} />
          <Text style={{ fontSize: 17 }}>ProfileVisitor</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("report")}}>
          
              <Icon2 name="megaphone" size={30} color={"red"} />
      
          </TouchableOpacity>
          <Modal transparent visible={visible}>
        <SafeAreaView style={{flex:1 }} onTouchStart={()=>{setVisible(false)}} >
          <View style={styles.popup}>
            <Text>report</Text>
          </View>
        </SafeAreaView>

          </Modal>
        </View>
        <View style={styles.imageContainerText}>
          <Image style={styles.imageProfile} source={{ uri: user.photoURL }} />
          <Text>{user.displayName}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            alignSelf: "center",
          }}
        >
          {renderStars(user?.rating / 5 || 1)}
        </View>
        <View style={{ height: 30 }}>
          <Text style={{ fontSize: 16 }}>Tips</Text>
        </View>
        {tips.map((tip) => (
          <OneTip key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileVisitor;
const styles = StyleSheet.create({
  imageContainerText: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // marginTop:"10%"
  },
  imageProfile: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"red",
    marginBottom: 40,
    // padding:15
  },
  popup:{
    // borderRadius:8 , 
    borderColor:"grey", 
    borderWidth:1,
    // backgroundColor:"white",
    width:"30%",
    justifyContent:"center",
    alignItems:"center",
    padding:5,
    position:"absolute",
    top:90,
    left:"60%"
    // right:"1200%"
  }
});
