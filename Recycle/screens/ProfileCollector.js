import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TextInput } from 'react-native';

import { FIREBASE_DB } from '../firebaseConfig';

const ProfileCollector = () => {
  const [accumulator, setAccumulator] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    // Fetch the accumulator data from Firebase using the provided UID
    const userId = 'cLsFqnC5SXPTmhJgEXVZUiWxq5P2'; // Replace with the actual user ID
    const userRef = FIREBASE_DB.ref(`users/${userId}`);

    userRef.once('value')
      .then(snapshot => {
        const userData = snapshot.val();
        setAccumulator(userData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Simulate loading reviews (replace with actual reviews retrieval)
    const dummyReviews = [
      { id: 1, rating: 5, text: 'Great accumulator!' },
      { id: 2, rating: 4, text: 'Nice collector.' },
    ];
    setReviews(dummyReviews);
  }, []);

  const handleReviewSubmit = () => {
    // Simulate adding a review (you can replace this simulation with actual review submission)
    const newReviewItem = { id: reviews.length + 1, ...newReview };
    setReviews([...reviews, newReviewItem]);
    setNewReview({ rating: 0, text: '' });
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return <Text>No reviews available.</Text>;
    }

    return (
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text>Rating: {item.rating}</Text>
            <Text>Review: {item.text}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {accumulator && (
        <>
          <Text style={styles.title}>Accumulator Profile</Text>
          <Text>Name: {accumulator.displayName}</Text>
          <Text>Email: {accumulator.email}</Text>
          <Text>First Name: {accumulator.firstName}</Text>
          <Text>Last Name: {accumulator.lastName}</Text>
          {/* Include other user data here */}
        </>
      )}

      <Button title="View Reviews" onPress={() => setShowReviews(!showReviews)} />

      {showReviews && (
        <>
          {renderReviews()}
          <Text style={styles.reviewTitle}>Leave a Review</Text>
          <TextInput
            placeholder="Rating (1-5)"
            value={newReview.rating.toString()}
            onChangeText={text => setNewReview({ ...newReview, rating: Number(text) })}
          />
          <TextInput
            placeholder="Review text"
            value={newReview.text}
            onChangeText={text => setNewReview({ ...newReview, text: text })}
          />
          <Button title="Submit Review" onPress={handleReviewSubmit()} />
        </>
      )}
    </View>
  );
};

export default ProfileCollector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  reviewItem: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
});