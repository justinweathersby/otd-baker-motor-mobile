app.controller('DashCtrl', function($scope, $sce, $http, $state,
                                    $ionicPlatform, $ionicLoading, $ionicPopup, $ionicActionSheet, $ionicHistory,
                                    currentUserService, currentDealerService, dealerService,
                                    DEALERSHIP_API) {


  $scope.inAppBrowser = null;
  $scope.inAppBrowswerOpen = 0;
  $scope.urlSourceErrorOpen = 0;

  if(currentDealerService.id == null){
    dealershipInit();
  }

  //--Initialize Function for Controller
  function dealershipInit() {
    console.log("Inside dealership initialize----");
    // currentUserService.dealership_id = dealership_id;
    $scope.dealership = null;

    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });

    dealerService.getDealership().success(function(){
      $scope.dealership = currentDealerService;
      $scope.iframeFriendly = currentDealerService.iframeFriendly;
      $scope.dealership.full_location_string = currentDealerService.location;
      console.log("currentDealer...", JSON.stringify($scope.dealership, null, 4));
      $ionicLoading.hide();

    }).error(function(){
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Could Not Get Dealership Profile',
        template: "Please Restart Your App. If This problem continues please contact us."
      });
    });
 };
 //---End Initialize


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
         currentDealerService);
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


  $scope.openLinkInBrowser = function(url, redirect){
    if ($scope.inAppBrowswerOpen == 0){
      $scope.inAppBrowswerOpen = 1;
      $ionicPlatform.ready(function() {
        var inAppBrowser = window.open(url, '_blank', 'location=yes');

        // inAppBrowser.addEventListener('loadstop', $scope.replaceHeaderImage);
        inAppBrowser.addEventListener('exit', function(event){
          $state.go(redirect);
          console.log("in app broswer close event");
          $scope.inAppBrowswerOpen = 0;
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


});
