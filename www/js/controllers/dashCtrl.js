app.controller('DashCtrl', function($scope, $sce, $http, $ionicLoading, $state, $ionicPopup, authService, currentUserService, DEALERSHIP_API) {
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
  $http({ method: 'GET',
          url: DEALERSHIP_API.url + "/dealerships/" + currentUserService.dealership_id
        })
        .success( function( data )
        {
          console.log('Return Data From Get Dealerships/ from Api:', JSON.stringify(data, null, 4));

          $scope.dealership = data;
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
});
