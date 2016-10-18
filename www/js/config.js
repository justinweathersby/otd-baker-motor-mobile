app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('forgot-password', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html',
    controller: 'LoginCtrl'
  })


  //setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'DashCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.connect', {
    url: '/connect',
    views: {
      'tab-connect': {
        templateUrl: 'templates/tab-connect.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.service',{
    url: '/service',
    views: {
      'tab-service':{
        templateUrl: 'templates/tab-service.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.specials',{
    url: '/specials',
    views: {
      'tab-specials':{
        templateUrl: 'templates/tab-specials.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.more',{
    url: '/more',
    views: {
      'tab-more':{
        templateUrl: 'templates/tab-more.html',
        controller: 'DashCtrl'
      }
    }
  })


  .state('tab.used-cars',{
    url: '/used_cars',
    views: {
      'tab-dash':{
        templateUrl: 'templates/tab-used-cars.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.new-cars',{
    url: '/new_cars',
    views: {
      'tab-dash':{
        templateUrl: 'templates/tab-new-cars.html',
        controller: 'DashCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); //--default go to page

  //--Cordova white list plugin
  // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

});
