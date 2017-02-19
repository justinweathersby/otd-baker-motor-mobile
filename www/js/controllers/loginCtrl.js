app.controller('LoginCtrl', function($scope, $http, $ionicLoading, $state, $ionicPopup, authService, currentUserService, dealerService, DEALERSHIP_API) {
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

  localforage.getItem('user_token').then(function(value) {
    var token = value;
    if(token){
      console.log("Token: " + token);
      $state.go('tab.dash');
    }
  }).catch(function(err) { console.log("GET ITEM ERROR::Login::", err);});

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

        localforage.setItem('user_token', currentUserService.token).then(function (value) {
            // Do other things once the value has been saved.
            console.log("SUCCESSFULLY STORED TOKEN AFTER AUTHSERVICE");
            console.log(value);

            localforage.setItem('user_id', currentUserService.id).then(function (value) {
                // Do other things once the value has been saved.
                console.log("SUCCESSFULLY STORED ID AFTER AUTHSERVICE");
                console.log(value);
                // $state.go('tab.dash');
                // $ionicLoading.hide();
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log("SET ITEM ERROR::Services::authService::token::",err);
            });

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log("SET ITEM ERROR::Services::authService::token::",err);
        });

        localStorage.setItem('user', user.email);
        localStorage.setItem('dealership_id', currentUserService.dealership_id);
        localStorage.setItem('name', currentUserService.name);
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);

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
