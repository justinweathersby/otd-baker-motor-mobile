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
          console.log('Return Data From Get Dealerships from Api:', JSON.stringify(data, null, 4));

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

  $scope.createUser = function(user)
  {
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
                                                       dealership_id: user.dealership_id}})
  	.success( function (data) {
      $ionicLoading.hide();
      console.log("Returned Sign Up Success Data> ");
      console.log(JSON.stringify(data, null, 4));
      currentUserService.token = data.user.auth_token;
      currentUserService.id = data.user.id;
      currentUserService.name = data.user.name;
      currentUserService.email = data.user.email;
      currentUserService.dealership_id = data.user.dealership_id

      localStorage.setItem('user', currentUserService.email);
      localStorage.setItem('dealership_id', currentUserService.dealership_id);
      localStorage.setItem('name', currentUserService.name);
      localStorage.setItem('token', currentUserService.token);
      localStorage.setItem('id', currentUserService.id);

      // authService.login(user);

      $state.go('tab.dash');
  	})
    .error( function(error)
    {
      // window.plugins.toast.showShortCenter('username already taken');
      console.log("Returned Sign Up Error Data> ");
      console.log(JSON.stringify(error, null, 4));
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Well, We Have A Problem...',
        template: error.errors
      });
    });

  };

});
