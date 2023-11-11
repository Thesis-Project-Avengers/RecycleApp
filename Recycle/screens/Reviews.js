import React from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const refrence = collection(FIREBASE_DB, "reviews");
      const q = query(refrence, orderBy("createdAt", "desc"));
      getDocs(q).then((querySnapshot) => {
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().photoURL) {
            const data = { id: doc.id, ...doc.data() };
            reviewsData.push(data);
          }
        });
        setReviews(reviewsData);
      });
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
  if (!loading) {
    if (reviews.length > 0) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                padding: 20,
                marginBottom: 15,
                borderWidth: 2,
                borderColor: "#eee",
                borderRadius: 20,
                width: 270,
                gap: 10,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    borderRadius={50}
                    source={{
                      uri: user?.photoURL,
                    }}
                    width={40}
                    height={40}
                  />
                  <Text style={{ fontSize: 15, fontWeight: 700 }}>
                    {user?.displayName}
                  </Text>
                </View>
                <Text>
                  {review.createdAt?.toDate().toString().slice(15, 18) > 12
                    ? review.createdAt?.toDate().toString().slice(15, 21) +
                      " PM"
                    : review.createdAt?.toDate().toString().slice(15, 21) +
                      " AM"}
                </Text>
              </View>

              <Text style={{ color: "black" }}>{review.content}</Text>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{ flexDirection: "row", marginVertical: 10 }}
                ></View>
              </View>
              <Text style={{ padding: 5, fontSize: 20, letterSpacing: 2 }}>
                {" "}
                {user?.displayName}
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                {renderStars(user?.rating / 5 || 1)}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="green" />
          <Text>Loading</Text>
        </View>
      );
    }
  }
};

export default Reviews;
