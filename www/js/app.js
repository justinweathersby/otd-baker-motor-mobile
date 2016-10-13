// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('otd-baker-motor-app', ['ionic', 'ionic.cloud']);

app.config(function($ionicCloudProvider){
  $ionicCloudProvider.init({
    "core": {
      "app_id": "3a5069a7"
    },
    "push": {
      "sender_id": "619003736575",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "alert": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
});

app.run(function($ionicPlatform, $ionicPush) {
  $ionicPlatform.ready(function() {

    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Push Token Saved:', t.token);
      console.log('Token Valid?: ', t.valid ? 1 : 0);
      console.log('Token type: ', t.type);
      console.log('App Id: ', t.app_id);
    });




    // var push = new Ionic.Push({
    //   "debug": true
    // });
    //
    // push.register(function(token){
    //   console.log("My Device Token: ", token.token);
    //   push.saveToken(token); // persist the token in the Ionic Platform
    // });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
