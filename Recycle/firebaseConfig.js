// import  "dotenv/config"
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: "AIzaSyDIX9agEqxrTUPV7qydY49Ja40WJ3z_SIg",
//   authDomain: "recycle-20fae.firebaseapp.com",
//   projectId: "recycle-20fae",
//   databaseURL: 'https://recycle-20fae-default-rtdb.europe-west1.firebasedatabase.app',
//   storageBucket: "recycle-20fae.appspot.com",
//   messagingSenderId: "637778408728",
//   appId: "1:637778408728:web:cb36d1547108f4cd659a6d"
// };
export const firebaseConfig = {
  apiKey: "AIzaSyDaiKBV81jX2kz8GWWFV-gJRp_sy6R_pfc",
  authDomain: "recyclev2-44dd8.firebaseapp.com",
  projectId: "recyclev2-44dd8",
  databaseURL: "https://recyclev2-44dd8-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "recyclev2-44dd8.appspot.com",
  messagingSenderId: "358013929699",
  appId: "1:358013929699:web:68de6fa51703aeefed5dd6"
};



// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)