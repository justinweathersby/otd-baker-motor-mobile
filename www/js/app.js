// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('otd-baker-motor-app', ['ionic', 'ionic.cloud' ]);

app.config(function($ionicCloudProvider, $compileProvider){
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

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|map|geo|skype):/);

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

function checkForCross(fr)
{
  console.log("Inside checkforcross this: ", fr);
  var html = null;
  var doc = fr.contentDocument || fr.contentWindow.document;
  html = doc.body.innerHTML;
  try{
    var doc = fr.contentDocument || fr.contentWindow.document;
    console.log("Doc:: ", doc);
    html = doc.body.innerHTML;
  } catch(err){

  }
  console.log("Doc:: ", doc);
  console.log("Html:: ", html);
    // return (html !== null);
    if(html !== null){
      alert('good to go');
    }
    else {
      alert('got nothing man');
    }
  // if (!fr.contentDocument.location) alert('Cross domain');
  // console.log("Inside Check for Cross function");
  // var iframe = angular.element(document.getElementById("iframeServ"));
  // console.log(JSON.stringify(iframe, null, 4));

};
