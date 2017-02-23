app.controller('TabsCtrl', function($scope, $state,
                                    $ionicActionSheet, $ionicHistory, $ionicPlatform, $ionicLoading, $ionicPopup,
                                    authService, currentUserService, currentDealerService, dealerService){

$scope.$on('cloud:push:notification', function(event, data) {
  var msg = data.message;
  var alertPopup = $ionicPopup.alert({
    title: msg.title,
    template: msg.text
  });
});

if (currentDealerService){
  $scope.dealership = currentDealerService;
}
else{
    //-- Load Current Dealer
    localforage.getItem('currentDealer').then(function (value){
      angular.copy(value, currentDealerService);
      $scope.dealership = currentDealerService;
    }).catch(function(err){
      console.log("GET ITEM ERROR::loginCtrl::currentDealer::", JSON.stringify(err));
    });
}

function openExternalURL(url, template, alertString){
  if (url){
    if(currentDealerService.iframeFriendly){ $state.go(template);}
    else{ openLinkInBrowser(url);}
  }else{noUrlAlertAndRedirect(alertString);}
};

function openLinkInBrowser(url, redirect){
  $ionicPlatform.ready(function() {
      var inAppBrowser = window.open(url, '_blank', 'location=no');
  });
};

function noUrlAlertAndRedirect(fromString){
    var alertPopup = $ionicPopup.alert({
      title: "Sorry",
      template: "There is no link to " + fromString
    });
    $state.go('tab.dash');
};

//--Open actionsheet overlay modal
$scope.openHomeModal = function() {

 // Show the action sheet
 var hideSheet = $ionicActionSheet.show({
   buttons: [
     { text: 'Home' },
     { text: 'View All Dealerships' }
   ],
   cancelText: 'Cancel',
   cancel: function() {},
   buttonClicked: function(index) {
     hideSheet();
     switch(index){
       case 0:
       $state.go('tab.dash');
       break;
       case 1:
       $state.go('dealership-list');
       break;
     }

   }
 });
};

$scope.openInventoryModal = function(){
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'New Inventory' },
      { text: 'Used Inventory' },
      { text: 'Find Parts'}
    ],
    cancelText: 'Cancel',
    cancel: function() {},
    buttonClicked: function(index) {
      hideSheet();
      switch(index){
        case 0:
        openExternalURL(currentDealerService.new_cars_url, "tab.new-cars", "New Cars");
        break;
        case 1:
        openExternalURL(currentDealerService.used_cars_url, "tab.used-cars", "Used Cars");
        break;
        case 2:
        openExternalURL(currentDealerService.parts_url, "tab.parts", "Parts");
        break;
      }

    }
  });
};

$scope.openSpecialsModal = function(){
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'Inventory Specials' },
      { text: 'Service Specials' }
    ],
    cancelText: 'Cancel',
    cancel: function() {},
    buttonClicked: function(index) {
      hideSheet();
      switch(index){
        case 0:
        openExternalURL(currentDealerService.new_cars_url, "tab.specials", "Specials");
        break;
        case 1:
        openExternalURL(currentDealerService.new_cars_url, "tab.service-specials", "Service Specials");
        break;
      }
    }
  });
};

$scope.openMoreModal = function(){
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'Financing' },
      { text: 'Logout' }
    ],
    cancelText: 'Cancel',
    cancel: function() {},
    buttonClicked: function(index) {
      hideSheet();
      switch(index){
        case 0:
        openExternalURL(currentDealerService.new_cars_url, "tab.financing", "Financing");
        break;
        case 1:
        logout();
        break;
      }
    }
  });
};

$scope.goToChat = function(){
  $state.go('tab.conversations');
};

function logout() {
  localforage.clear().then(function() {
    // Run this code once the database has been entirely deleted.
    console.log('Database is now empty.');
    authService.resetCurrent();
    dealerService.resetCurrent();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $state.go('login', {}, {reload:true});
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log("ERROR::tabsCtrl::logout::clear::", JSON.stringify(err));
  });

};
});
