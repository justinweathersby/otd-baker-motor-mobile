app.controller('SignupCtrl', function($scope, $state, $http, $stateParams,
                                      $ionicPopup, $ionicPopup, $ionicLoading, $ionicHistory,
                                      authService, currentUserService, currentDealerService, dealerService,
                                      DEALERSHIP_API)
{
  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
  $http({ method: 'GET',
          url: DEALERSHIP_API.url + "/dealerships"
        })
        .success( function( data )
        {
          // console.log('Return Data From Get Dealerships from Api:', JSON.stringify(data, null, 4));
          $scope.dealerships = data;
          $ionicLoading.hide();
        }
      )
      .error( function(error)
      {
        console.log(error);
        $ionicLoading.hide();
      }
  );

  $scope.dealershipSelected = function(dealership_id){
    console.log("Inside dealershipSelected dealerid: ", dealership_id);
    console.log("---token: ", currentUserService.token);
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
      console.log("Start Post ");
    	console.log(user);
    	$http.post(DEALERSHIP_API.url + "/users", {user: {email: user.email,
                                                         password: user.password,
                                                         name: user.name,
                                                         device_token: currentUserService.device_token,
                                                         device_type: currentUserService.device_type,
                                                         dealership_id: currentUserService.dealership_id}})
    	.success( function (data) {
        $ionicLoading.hide();
        console.log("Returned Sign Up Success Data> ");
        console.log(JSON.stringify(data, null, 4));
        currentUserService.token = data.user.auth_token;
        currentUserService.id = data.user.id;
        currentUserService.name = data.user.name;
        currentUserService.email = data.user.email;
        // currentUserService.dealership_id = data.user.dealership_id

        localStorage.setItem('user', currentUserService.email);
        localStorage.setItem('dealership_id', currentUserService.dealership_id);
        localStorage.setItem('name', currentUserService.name);
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);

        $state.go('tab.dash');
    	})
      .error( function(error)
      {
        // window.plugins.toast.showShortCenter('username already taken');
        console.log("Returned Sign Up Error Data> ");
        console.log(JSON.stringify(error.errors.password, null, 4));
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
      console.log($scope.signupForm.$error);
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
