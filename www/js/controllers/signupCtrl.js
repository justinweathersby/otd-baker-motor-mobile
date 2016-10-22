app.controller('SignupCtrl', function($scope, $state, $http, $stateParams, $ionicPopup, authService, $ionicPopup, $ionicLoading, currentUserService, DEALERSHIP_API)
{
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
        console.log(error);
        $ionicLoading.hide();
      }
  );

  $scope.dealershipSelected = function(dealership_id){
    if (dealership_id != null){
      currentUserService.dealership_id = dealership_id;
      $state.go('signup');
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

        localStorage.setItem('user', currentUserService.email);
        localStorage.setItem('dealership_id', currentUserService.dealership_id);
        localStorage.setItem('name', currentUserService.name);
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);

        $state.go('tab.dash');
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

});
