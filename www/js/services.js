//-- This service contains user information for authorization and authentication needs
app.service('currentUserService', function(){
  this.id = null;
  this.token = null;

  this.name = null;
  this.email = null;
  this.dealership_id = null;

  this.device_token = null;
  this.device_type = null;

});

//-- This service handles all authentication between app and Chatter API
app.service('authService', function($http, currentUserService, DEALERSHIP_API){
  this.login = function(user){

    return  $http({method: 'POST',
                   url: DEALERSHIP_API.url + '/login',
                   headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password, 'X-API-DEVICE-TOKEN' : currentUserService.device_token, 'X-API-DEVICE-TYPE' : currentUserService.device_type}})
      .success( function( data )
      {
        console.log('Return Data From Login Post to Api:', JSON.stringify(data, null, 4));
        currentUserService.token = data.user.auth_token;
        currentUserService.id = data.user.id;
        currentUserService.name = data.user.name;
        currentUserService.email = data.user.email;
        currentUserService.dealership_id = data.user.dealership_id
        currentUserService.device_token = data.user.device_token
        currentUserService.device_type = data.user.device_type

        // console.log('Return login data:', data)
        console.log('CurrentUserService:', JSON.stringify(currentUserService, null, 4));
        // console.log('UserService token: ', data.user.auth_token)

        // localStorage.setItem('user', user.email);
        // localStorage.setItem('token', data.user.auth_token);

        //--Set header for all subsequent requests
        $http.defaults.headers.common['Authorization'] = data.user.auth_token;

      }
    )
    .error( function(error)
    {
      console.log(error);

    });
  }; //--End of login function

  this.logout = function(user){
    return  $http({method: 'POST', url: DEALERSHIP_API.url + '/logout', headers: {'Authorization' : user.token}});
  };// --End of logout function
});
