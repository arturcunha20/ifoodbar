import { initializeApp } from "firebase/app";
import { getAnalytics , isSupported  } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

//const config = require("../firebase")

var admin = require("firebase-admin");
var serviceAccount = require("../firebase.json");

const Bucket =  "ibaripca.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ibaripca-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: Bucket
});

const firebaseConfig = {
    apiKey: "AIzaSyBKJjBz-6iSzmmY6Hh-y4rux2AT9EUtvXM",
    authDomain: "ibaripca.firebaseapp.com",
    projectId: "ibaripca",
    storageBucket: "ibaripca.appspot.com",
    messagingSenderId: "914336803625",
    appId: "1:914336803625:web:c83afdc99da23cfc3a6538",
    measurementId: "G-P2KKD5D8NV"
  };
  
const FirebaseApp  = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(FirebaseApp) : null);
const auth = getAuth(FirebaseApp);
const db = admin.firestore()
const db_firestore = getFirestore(FirebaseApp)
const storage = getStorage(FirebaseApp)
  
export{
    firebaseConfig,
    FirebaseApp,
    analytics,
    auth,
    db,
    admin,
    db_firestore,
    storage,
    upload,
    Bucket
}

  