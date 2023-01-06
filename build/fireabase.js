"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = exports.upload = exports.storage = exports.db_firestore = exports.admin = exports.db = exports.auth = exports.analytics = exports.FirebaseApp = exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
exports.upload = upload;
//const config = require("../firebase")
var admin = require("firebase-admin");
exports.admin = admin;
var serviceAccount = require("../firebase.json");
const Bucket = "ibaripca.appspot.com";
exports.Bucket = Bucket;
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
exports.firebaseConfig = firebaseConfig;
const FirebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.FirebaseApp = FirebaseApp;
const analytics = (0, analytics_1.isSupported)().then(yes => yes ? (0, analytics_1.getAnalytics)(FirebaseApp) : null);
exports.analytics = analytics;
const auth = (0, auth_1.getAuth)(FirebaseApp);
exports.auth = auth;
const db = admin.firestore();
exports.db = db;
const db_firestore = (0, firestore_1.getFirestore)(FirebaseApp);
exports.db_firestore = db_firestore;
const storage = (0, storage_1.getStorage)(FirebaseApp);
exports.storage = storage;
