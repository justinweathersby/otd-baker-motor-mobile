app.controller('TabsCtrl', function($scope, $state,
                                    $ionicActionSheet, $ionicHistory,
                                    authService, currentDealerService, dealerService){

$scope.$on('cloud:push:notification', function(event, data) {
  var msg = data.message;
  var alertPopup = $ionicPopup.alert({
    title: msg.title,
    template: msg.text
  });
});
$scope.dealership = currentDealerService;

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
  // Show the action sheet
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
        $state.go('tab.new-cars');
        break;
        case 1:
        $state.go('tab.used-cars');
        break;
        case 2:
        $state.go('tab.parts');
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
        $state.go('tab.specials');
        break;
        case 1:
        $state.go('tab.service-specials');
        break;
      }

    }
  });
};

$scope.openMoreModal = function(){
  var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: 'Logout' }
    ],
    cancelText: 'Cancel',
    cancel: function() {},
    buttonClicked: function(index) {
      hideSheet();
      switch(index){
        case 0:
        logout();
        break;
      }
    }
  });
};

$scope.goToFinancing = function(){
   $scope.inAppBrowswerOpen = 0;
   $state.go('tab.financing');
};

//--End actionsheet popup
function logout() {
  authService.resetCurrent();
  dealerService.resetCurrent();
  localStorage.clear();
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $state.go('login', {}, {reload:true});
};
});
