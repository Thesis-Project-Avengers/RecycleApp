import { Rating, AirbnbRating } from 'react-native-ratings';
import React from 'react'

const RatingReview = () => {
  // const BALHA_IMAGE = require('../assets/balha.jpg')

ratingCompleted=(rating) =>{
  console.log("Rating is: " + rating)
}

  return (
    <>
    <AirbnbRating />

    <AirbnbRating
      count={11}
      reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
      defaultRating={11}
      size={20}
    />
    
    <Rating
      showRating
      onFinishRating={this.ratingCompleted}
      style={{ paddingVertical: 10 }}
    />
    
   
    
    <Rating
      type='custom'
      // ratingImage={BALHA_IMAGE}
      ratingColor='#3498db'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={10}
      imageSize={30}
      onFinishRating={this.ratingCompleted}
      style={{ paddingVertical: 10 }}
    />
    </>
  )
}

export default RatingReview

