// import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import RatingReview from './RatingReview';
// import { FIREBASE_DB } from '../firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const RatingProfile = () => {
//   const [ratings, setRatings] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
 

//   useEffect(() => {
//     // Fetch ratings from Firebase
//     // const fetchRatings = async () => {
//     //   try {
//         const ratingsCollection = collection(FIREBASE_DB, 'Ratings'); // Firebase path
//         // const querySnapshot = await getDocs(ratingsCollection);
//         getDocs(q).then((querySnapshot) => {
//         const ratingData = [];
//         querySnapshot.forEach((doc) => {
//           if( doc.data()){
//             ratingData.push(data.rating);
//           }
         
//         });

//         setRatings(ratingData);
//       })
//       // } catch (error) {
//       //   console.error('Error fetching ratings:', error);
//       // }
//     // };

   
//   }, []);

//   useEffect(() => {
//     // Calculate the average rating
//     if (rating.length > 0) {
//       const totalRating = rating.reduce((acc, ratings) => acc + ratings, 0);
//       const avgRating = totalRating / ratings.length;
//       setAverageRating(avgRating);
//     }
//   }, [rating]);

 

//   return (
//     <View>
// <View style={{ flexDirection: 'row' }}>
//         {Array.from({ length: 5 }).map((i, index) => (
//           <RatingReview
//             key={index}
//             value={averageRating > index ? 1 : 0}
//            
//           />
//         ))}
//       </View>
    
//     </View>
//   );
// };

// export default RatingProfile;
