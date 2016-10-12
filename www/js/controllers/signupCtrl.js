app.controller('SignupCtrl', function($scope, $state, $http, $stateParams, $ionicPopup, authService, $ionicPopup, $ionicLoading, DEALERSHIP_API)
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
  //--TODO: Replace with actual api call
  // $scope.daysOfWeek = [
  //     {id: 0, name: 'BMW of Willm'},
  //     {id: 1, name: 'Monday'},
  //     {id: 2, name: 'Tuesday'},
  //     {id: 3, name: 'Wednesday'},
  //     {id: 4, name: 'Thursday'},
  //     {id: 5, name: 'Friday'},
  //     {id: 6, name: 'Saturday'}
  //  ];

  $scope.createUser = function(user)
  {
  	console.log(user);
  	$http.post(DEALERSHIP_API.url + "/users", {user: {email: user.email,
                                                       password: user.password,
                                                       name: user.name,
                                                       dealership_id: user.dealership_id}})
  	.success( function (data) {
      console.log("Returned Success Data> ");
      console.log(JSON.stringify(data, null, 4));

      authService.login(user);
      $state.go('tab.dash');
  	})
    .error( function(error)
    {
      // window.plugins.toast.showShortCenter('username already taken');
      var alertPopup = $ionicPopup.alert({
        title: 'Sorry',
        template: error.errors
      });
    });

  };

});
