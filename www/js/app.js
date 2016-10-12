// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('otd-baker-motor-app', ['ionic', 'ionic.cloud']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

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

app.config(function($ionicCloudProvider){
  $ionicCloudProvider.init({
    "core": {
      "app_id": "3a5069a7"
    }
  });
});
