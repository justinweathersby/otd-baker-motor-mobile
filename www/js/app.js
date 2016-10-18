// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('otd-baker-motor-app', ['ionic', 'ionic.cloud' ]);

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

app.run(function($ionicPlatform, $ionicPush, currentUserService) {
  $ionicPlatform.ready(function() {

    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      currentUserService.device_token = t.token;
      currentUserService.device_type = t.type;
      console.log('Push Token Saved:', t.token);
      console.log('Token type: ', t.type);
      console.log('Inside Run..CurrentUser: ', JSON.stringify(currentUserService, null, 4));
    });

    TestFairy.begin("993218db594324f249e28bfa5a72f74f0d21732d");

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
