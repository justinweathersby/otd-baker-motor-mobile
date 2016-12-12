app.controller('LoginCtrl', function($scope, $http, $ionicLoading, $state, $ionicPopup, authService, currentUserService, DEALERSHIP_API) {
  var user = localStorage.getItem('user');
  if(user !== null)
  {
    currentUserService.token = localStorage.getItem('token');
    currentUserService.id = localStorage.getItem('id');
    currentUserService.name = localStorage.getItem('name');
    currentUserService.email = user;
    currentUserService.dealership_id = localStorage.getItem('dealership_id');

    $state.go('tab.dash');
  }

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    var alertPopup = $ionicPopup.alert({
      title: msg.title,
      template: msg.text
    });
  });


  $scope.login = function(user) {
    $ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Logging in</p><ion-spinner class="spinner-positive" icon="dots"></ion-spinner>',
     hideOnStageChange: true
    });

    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        $ionicLoading.hide();

        localStorage.setItem('user', user.email);
        localStorage.setItem('dealership_id', currentUserService.dealership_id);
        localStorage.setItem('name', currentUserService.name);
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);

        $state.go('tab.dash', {}, {reload:true});
      }).error(function()
      {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Login Unsuccessful',
          template: "Email and password did not match our records."
        });
      });
    }
    else{
      console.log("Invalid form data");
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Login Unsuccessful',
        template: "Email must be in correct format and password cannot be empty"
      });
    }
  }; //end of login function

  $scope.resetPassword = function(email) {

    $ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Checking to see if your account exists..</p><ion-spinner class="spinner-positive" icon="dots"></ion-spinner>',
     hideOnStageChange: true
    });

    $http({method: 'POST', url: DEALERSHIP_API.url + '/reset_password?email=' + email})
      .success( function( data )
      {
        $ionicLoading.hide();
        console.log('Return Data From Reset Password Api:', data)
        $ionicPopup.alert({
           title: 'Thank You',
           content: 'An email has been sent to the email provided with instructions to reset your password.'
         });
         $state.go('login');
      }
    )
    .error( function(error)
    {
      $ionicLoading.hide();
      console.log("error:", JSON.stringify(error, 4, null));
      $ionicPopup.alert({
         title: 'Woops..',
         content: 'The email you have entered does not exist in our records'
       });
       $state.go('signup');
    });
  };//end of reset password function


  $scope.goToSignUp = function() {
    $state.go('dealership-list');
  };

  $scope.goToLogin = function() {
    $state.go('login');
  };

  $scope.goToForgotPassword = function() {
    $state.go('forgot-password');
  };

});
