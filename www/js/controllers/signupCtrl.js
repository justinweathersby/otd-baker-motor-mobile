app.controller('SignupCtrl', function($scope, $state, $http, $stateParams,
                                      $ionicPopup, $ionicPopup, $ionicLoading, $ionicHistory,
                                      authService, currentUserService, currentDealerService, dealerService,
                                      DEALERSHIP_API)
{
  // $scope.$on('cloud:push:notification', function(event, data) {
  //   var msg = data.message;
  //   var alertPopup = $ionicPopup.alert({
  //     title: msg.title,
  //     template: msg.text
  //   });
  // });

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
  $http({ method: 'GET',
          url: DEALERSHIP_API.url + "/dealerships"
        })
        .success( function( data )
        {
          $scope.dealerships = data;
          $ionicLoading.hide();
        }
      )
      .error( function(error)
      {
        $ionicLoading.hide();
      }
  );

  $scope.dealershipSelected = function(dealership_id){
    if (dealership_id != null){
      dealerService.resetCurrent();
      currentUserService.dealership_id = dealership_id;

      //--This is for determining if this is a new user or old user changing thier viewing dealership
      if(currentUserService.token !== null) // you had to have loged in if you have a token
      {
        $ionicHistory.clearCache();
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });

        localforage.setItem('currentUser', currentUserService).then(function (value){
          console.log("Value set in currentDealer:", JSON.stringify(value));
        }).catch(function(err){
          console.log("SET ITEM ERROR::singupCtrl::dealershipSelected::currentUser::",err)
        });

        //--Try to preload the dealership after click
        dealerService.getDealership().success(function(){
          $state.go('tab.dash');
          $ionicLoading.hide();

        }).error(function(){
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Could Not Get Dealership Profile',
            template: "Please Restart Your App. If This problem continues please contact us."
          });
          $state.go('login');
        });

      }
      else{
        $state.go('signup');
      }
    }
  }

  $scope.createUser = function(user)
  {
    if ($scope.signupForm.$valid){
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    	$http.post(DEALERSHIP_API.url + "/users", {user: {email: user.email,
                                                         password: user.password,
                                                         name: user.name,
                                                         device_token: currentUserService.device_token,
                                                         device_type: currentUserService.device_type,
                                                         dealership_id: currentUserService.dealership_id}})
    	.success( function (data) {
        $ionicLoading.hide();
        currentUserService.token = data.user.auth_token;
        currentUserService.id = data.user.id;
        currentUserService.name = data.user.name;
        currentUserService.email = data.user.email;
        currentUserService.roles = data.roles;

        // localStorage.setItem('user', currentUserService.email);
        // localStorage.setItem('dealership_id', currentUserService.dealership_id);
        // localStorage.setItem('name', currentUserService.name);
        // localStorage.setItem('token', currentUserService.token);
        // localStorage.setItem('id', currentUserService.id);
        localforage.setItem('currentUser', currentUserService).then(function (value){
          console.log("Value set in currentDealer:", JSON.stringify(value));
          $state.go('tab.dash');
        }).catch(function(err){
          console.log("SET ITEM ERROR::singupCtrl::dealershipSelected::currentUser::",err)
        });

    	})
      .error( function(error)
      {
        $ionicLoading.hide();
        var errorResponse = "";
        if (angular.isDefined(error.errors.password)){
          errorResponse = "Password: " + error.errors.password;
        }
        if (angular.isDefined(error.errors.email)){
          errorResponse += "<br>Email: " + error.errors.email;
        }
        var alertPopup = $ionicPopup.alert({
          title: 'Well, We Have A Problem...',
          template: errorResponse
        });
      });
    }
    else{
      var errorResponse = "";
      if(user.password != user.password_confirmation){
        errorResponse = "Passwords do not match";
      }
      else{
        errorResponse = "Fields cannot be blank or of incorrect format";
      }
      var alertPopup = $ionicPopup.alert({
        title: 'Incorrect Input',
        template: errorResponse
      });
    }

  };

  $scope.goToLogin = function() {
    $state.go('login');
  };

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

});
