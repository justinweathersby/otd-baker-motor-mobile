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

  .state('dealership-list', {
    url: '/dealership-list',
    templateUrl: 'templates/dealership-list.html',
    controller: 'SignupCtrl'
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
    cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'DashCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    cache: false,
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
      'tab-dash': {
        templateUrl: 'templates/tab-connect.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.service',{
    cache: false,
    url: '/service',
    views: {
      'tab-dash':{
        templateUrl: 'templates/tab-service.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.specials',{
    cache: false,
    url: '/specials',
    views: {
      'tab-specials':{
        templateUrl: 'templates/tab-specials.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.service-specials',{
    cache: false,
    url: '/service_specials',
    views: {
      'tab-specials':{
        templateUrl: 'templates/tab-service-specials.html',
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
    cache: false,
    url: '/used_cars',
    views: {
      'tab-inventory':{
        templateUrl: 'templates/tab-used-cars.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.new-cars',{
    cache: false,
    url: '/new_cars',
    views: {
      'tab-inventory':{
        templateUrl: 'templates/tab-new-cars.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.parts',{
    cache: false,
    url: '/parts',
    views: {
      'tab-dash':{
        templateUrl: 'templates/tab-parts.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.financing',{
    cache: false,
    url: '/financing',
    views: {
      'tab-financing':{
        templateUrl: 'templates/tab-financing.html',
        controller: 'DashCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); //--default go to page

  //--Cordova white list plugin
  // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

});
