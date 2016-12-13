//-- This service contains user information for authorization and authentication needs
app.service('currentUserService', function(){
  this.id =
  this.token =
  this.name =
  this.email =
  this.dealership_id =
  this.device_token =
  this.device_type = null;
});

app.service('currentDealerService', function(){
  this.id =
  this.name =
  this.phone =
  this.location =
  this.primary_color =
  this.new_cars_url =
  this.used_cars_url =
  this.service_url =
  this.specials_url =
  this.service_specials_url =
  this.parts_url =
  this.financing_url =
  this.service_email =
  this.sales_email =
  this.facebook_url =
  this.twitter_url =
  this.logo_url =
  this.background_image_url =
  this.iframeFriendly = null;
});

app.service('dealerService', function($http, $ionicLoading, currentUserService, currentDealerService, DEALERSHIP_API){
  this.resetCurrent = function (){
    currentDealerService.id =
    currentDealerService.name =
    currentDealerService.location =
    currentDealerService.primary_color =
    currentDealerService.new_cars_url =
    currentDealerService.used_cars_url =
    currentDealerService.specials_url =
    currentDealerService.service_url =
    currentDealerService.service_specials_url =
    currentDealerService.parts_url =
    currentDealerService.financing_url =
    currentDealerService.service_email =
    currentDealerService.sales_email =
    currentDealerService.facebook_url =
    currentDealerService.twitter_url =
    currentDealerService.logo_url =
    currentDealerService.background_image_url =
    currentDealerService.iframeFriendly = null;
  };

  this.getDealership = function(){
    return $http({ method: 'GET',
        url: DEALERSHIP_API.url + "/dealerships/" + currentUserService.dealership_id
    }).success( function( data ){
        currentDealerService.id = data.id;
        currentDealerService.name = data.name;
        currentDealerService.phone = data.phone;
        currentDealerService.location = "maps:?q=" + data.location.street + ' ' + data.location.city + ', ' + data.location.state + ' ' + data.location.zipcode;
        currentDealerService.primary_color = data.primary_color;
        currentDealerService.new_cars_url = data.new_cars_url;
        currentDealerService.used_cars_url = data.used_cars_url;
        currentDealerService.service_url = data.service_url;
        currentDealerService.service_specials_url = data.service_specials_url;
        currentDealerService.specials_url = data.specials_url;
        currentDealerService.parts_url = data.parts_url;
        currentDealerService.financing_url = data.financing_url;
        currentDealerService.service_email = data.service_email;
        currentDealerService.sales_email = data.sales_email;
        currentDealerService.facebook_url = data.facebook_url;
        currentDealerService.twitter_url = data.twitter_url;
        currentDealerService.logo_url = data.logo_url;
        currentDealerService.background_image_url = data.background_image_url;
        currentDealerService.iframeFriendly = data.iframeFriendly;

        $ionicLoading.hide();
      }).error( function(error){
          console.log(error);
          $ionicLoading.hide();
      });
    };
});


//-- This service handles all authentication between app and Chatter API
app.service('authService', function($http, $ionicPlatform, $ionicPush, currentUserService, DEALERSHIP_API){
  this.login = function(user){

    $ionicPlatform.ready(function() {
      $ionicPush.register().then(function(t) {
        return $ionicPush.saveToken(t);
      }).then(function(t) {
        currentUserService.device_token = t.token;
        currentUserService.device_type = t.type;
      });
    });

    return  $http({method: 'POST',
                   url: DEALERSHIP_API.url + '/login',
                   headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password, 'X-API-DEVICE-TOKEN' : currentUserService.device_token, 'X-API-DEVICE-TYPE' : currentUserService.device_type}})
      .success( function( data )
      {
        currentUserService.token = data.user.auth_token;
        currentUserService.id = data.user.id;
        currentUserService.name = data.user.name;
        currentUserService.email = data.user.email;
        currentUserService.dealership_id = data.user.dealership_id
        currentUserService.device_token = data.user.device_token
        currentUserService.device_type = data.user.device_type

        $http.defaults.headers.common['Authorization'] = data.user.auth_token;
      }
    )
    .error( function(error)
    {
      console.log(error);
    });
  }; //--End of login function

  this.resetCurrent = function(){
    currentUserService.id =
    currentUserService.token =
    currentUserService.name =
    currentUserService.email =
    currentUserService.dealership_id = null;
  };
});
