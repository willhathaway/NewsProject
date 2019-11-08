// Check if the user is signed in when page loads
function isUserAuthenticated() {
  // console.log('hitting new function')
  // If localStorage has token, return true
  // If localStorage.token is === null, return false
  // localStorage.clear();
  $("#message").text('Please sign in');
  return localStorage.getItem('token') !== null;
}

// isUserAuthenticated();

$(document).ready(function () { // $(document).ready(() => {
  // Check whether or not a user is signed in
  if (isUserAuthenticated()) {
    $('#login').hide();
    $('#logout').show();
    $("#message").text('Welcome ' + localStorage.name);
    // $('#logout').show();
  } else {
    $("#logout").hide();
  }

  $("#login").on("click", function () {
    // event.preventDefault();
    $('#login_modal').modal('show');
  });

  $("#logout").on("click", function () {
    // mainApp.logOut()
    console.log("hitting logout func");
    firebase.auth().signOut();
    // Clear the token and the name from local storage when a user signs out
    $('#logout').hide();
    $('#login').show();
    localStorage.clear();
    window.location.reload();
    // $("#message").text('Please sign in');
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

(function () {
  // Initialize the FirebaseUI Widget using Firebase.
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  let uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        if (authResult) {
          console.log(authResult)
          $('#login_modal').modal('hide');
          $('#login').hide();
          $('#logout').show();
          $("#message").text('Welcome ' + authResult.user.displayName);

          // set the token to local storage when a user signs in
          localStorage.setItem('token', authResult.user.refreshToken);
          localStorage.setItem('name', authResult.user.displayName);
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
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    // tosUrl: 'index.html',

    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
})();

let mainApp = {};

(function () {
  let firebase = app_fireBase;
  let uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    } else {
      // redirect to login page
      uid = null;
      // window.location.replace("index.html");
    }
  });

})();