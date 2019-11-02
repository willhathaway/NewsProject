let app_fireBase = {};
(function(){
const firebaseConfig = {
    apiKey: "AIzaSyDmkA-S2e5UussUJ7xgMziMm5z4G7fMw34",
    authDomain: "newsproject-7b2d1.firebaseapp.com",
    databaseURL: "https://newsproject-7b2d1.firebaseio.com",
    projectId: "newsproject-7b2d1",
    storageBucket: "newsproject-7b2d1.appspot.com",
    messagingSenderId: "289098825857",
    appId: "1:289098825857:web:5231ee54e034da6ce98d80",
    measurementId: "G-ZP0PFXWGZG"
  };
  firebase.initializeApp(firebaseConfig);

  app_fireBase = firebase;
})();