// Check if the user is signed in when page loads
function isUserAuthenticated() {
  $("#message").text('Please sign in');
  return localStorage.getItem('token') !== null;
}
// isUserAuthenticated();
$(document).ready(function () {
  // if user is signed in, display their name in Welcome message, hide login btn, and show logout btn
  if (isUserAuthenticated()) {
    $('#login').hide();
    $('#logout').show();
    $("#message").text('Welcome, ' + localStorage.name + '!');

    // Otherwise they aren't signed in, so hide the logout btn
  } else {
    $("#logout").hide();
  }
  // click function that triggers the auth modal 
  $("#login").on("click", function () {
    // event.preventDefault();
    $('#login_modal').modal('show');
  });
  // logout function
  $("#logout").on("click", function () {
    // console.log("hitting logout func");
    firebase.auth().signOut();
    // Clear the token and the name from local storage when a user signs out
    $('#logout').hide();
    $('#login').show();
    localStorage.clear();
    window.location.reload();
  });
});

let app_fireBase = {};
(function () {
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
// console.log(firebase);
(function () {
  // Initialize the FirebaseUI Widget using Firebase.
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  let uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        // User successfully signed in.
        if (authResult) {
          // console.log auth result to get token info, name, userID
          console.log(authResult)
          $('#login_modal').modal('hide');
          $('#login').hide();
          $('#logout').show();
          $("#message").text('Welcome, ' + authResult.user.displayName + '!');
          // set the token to local storage when a user signs in
          // refresh token allows you to have short - lived access tokens without having to collect credentials every single time one expires.You request this token alongside the access and / or ID tokens as part of a user 's initial authentication flow.
          localStorage.setItem('token', authResult.user.refreshToken);
          localStorage.setItem('name', authResult.user.displayName);
          localStorage.setItem('userID', authResult.user.uid);
        }
        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      // use email only for sign in...
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
})();
//
// let mainApp = {};

(function () {
  let firebase = app_fireBase;
  let uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    } else {
      uid = null;
    }
  });

})();