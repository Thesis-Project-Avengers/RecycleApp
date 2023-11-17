import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OneTip from '../components/OneTip'
import OneFavouriteTip from '../components/OneFavouriteTip'

const UserFavouritesTipsScreen = () => {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  useFocusEffect(useCallback(() => {
    const refrence = collection(FIREBASE_DB, "Tips")
    const q = query(refrence, orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const tipsData = [];
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().isFavourite?.includes(FIREBASE_AUTH.currentUser?.uid)) {
          const data = { id: doc.id, ...doc.data() }
          tipsData.push(data);
        }
      });
      setTips(tipsData);
    })
    setLoading(false);
  }, []))
  if (loading) {
    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading ....</Text>
    </View>)
  } else {
    return (
      <SafeAreaView style={styles.container} >
        < ScrollView
          style={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* take me to the collectorProfile */}
          {tips.map((tip, index) =>
            <OneFavouriteTip key={index} tip={tip} />
          )}

        </ScrollView>
      </SafeAreaView >
    )
  }
}

export default UserFavouritesTipsScreen

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    // backgroundColor: "green",
    height: "100%",
  },
})