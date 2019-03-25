import firebase from "firebase"
// var config = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId
// };
var config = {
  apiKey: "AIzaSyADGuH0SPMLB-4oO0Ike2IiPnlujOhTCBc",
  authDomain: "toko-ca11d.firebaseapp.com",
  databaseURL: "https://toko-ca11d.firebaseio.com",
  projectId: "toko-ca11d",
  storageBucket: "toko-ca11d.appspot.com",
  messagingSenderId: "677711622028"
};
firebase.initializeApp(config);
const db = firebase.firestore()

// var database = firebase.database()

export default db
