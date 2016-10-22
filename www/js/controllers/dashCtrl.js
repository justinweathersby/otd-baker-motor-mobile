app.controller('DashCtrl', function($scope, $sce, $ionicPlatform, $http, $ionicLoading, $state, $ionicPopup, authService, currentUserService, $ionicHistory, DEALERSHIP_API) {
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    var alertPopup = $ionicPopup.alert({
      title: msg.title,
      template: msg.text
    });
  });

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });


  $scope.inAppBrowser = null;
  $scope.inAppBrowswerOpen = 0;
  $scope.urlSourceErrorOpen = 0;


  $http({ method: 'GET',
          url: DEALERSHIP_API.url + "/dealerships/" + currentUserService.dealership_id
        })
        .success( function( data )
        {
          console.log('Return Data From Get Dealerships/ from Api:', JSON.stringify(data, null, 4));

          $scope.dealership = data;
          $scope.iframeFriendly = data.iframeFriendly;
          $scope.dealership.full_location_string = "maps:?q=" + $scope.dealership.location.street + ' ' + $scope.dealership.location.city + ', ' + $scope.dealership.location.state + ' ' +$scope.dealership.location.zipcode;
          console.log('Location of dealership:', $scope.dealership.location.street);
          $ionicLoading.hide();
        }
      )
      .error( function(error)
      {
        console.log(error);
        $ionicLoading.hide();
      }
  );

  $scope.contactSales = function(){
    console.log("contact slaes button is being pushed");
    window.plugin.email.open({
         to:      $scope.dealership.sales_email,
         subject: $scope.dealership.name + ' Sales Inquiry',
         body:    currentUserService.name + ': '
         }, function () {
             console.log('email view dismissed');
             $ionicPopup.alert({
                     title: 'Email Not Sent',
                     content: 'You have selected to exit out before sending the email.'
                   });
         },
         this);
  };

  $scope.contactService = function(){
    console.log("contact slaes button is being pushed");
    window.plugin.email.open({
         to:      $scope.dealership.service_email,
         subject: $scope.dealership.name + ' Service Inquiry',
         body:    currentUserService.name + ': '
         }, function () {
             console.log('email view dismissed');
             $ionicPopup.alert({
                     title: 'Email Not Sent',
                     content: 'You have selected to exit out before sending the email.'
                   });
         },
         this);
  };


  $scope.openLinkInBrowser = function(url){
    if ($scope.inAppBrowswerOpen == 0){
      $scope.inAppBrowswerOpen = 1;
      $ionicPlatform.ready(function() {
        var inAppBrowser = window.open(url, '_blank', 'location=yes');

        // inAppBrowser.addEventListener('loadstop', $scope.replaceHeaderImage);
        inAppBrowser.addEventListener('exit', function(event){
          $state.go('tab.dash');
          console.log("in app broswer close event");
          // $scope.inAppBrowswerOpen = 0;

        });
      });
    }
  };

  $scope.noUrlAlertAndRedirect = function(fromString){
    if($scope.urlSourceErrorOpen == 0){
      $scope.urlSourceErrorOpen = 1;
      console.log("Inside no url alert and redirect");
      var alertPopup = $ionicPopup.alert({
        title: "Sorry",
        template: "There is no link to " + fromString
      });
      $state.go('tab.dash');
    }

  };

  $scope.goToMaps = function(){
    window.open($scope.dealership.full_location_string, '_system');
  };

  $scope.callDealership = function(){
    var telephone = 'tel:'+$scope.dealership.phone;
    window.open(telephone, '_system');
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.goToNew = function() {
    console.log("Go to New Cars.... state?");
    $state.go('tab.new-cars');
  };

  $scope.goToUsed = function() {
    $state.go('tab.used-cars');
  };

  $scope.logout = function() {
    console.log("Inside logout function");
    localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    console.log("LocalStorage User: ", localStorage.getItem('user'));
    $state.go('login', {}, {reload:true});
  };
});
