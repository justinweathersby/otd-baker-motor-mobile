app.controller('ConversationsCtrl', function($rootScope, $scope, $state, $http, $stateParams, $cordovaBadge,
                                        $ionicPopup, $ionicLoading,
                                        currentUserService, currentConversation,
                                        DEALERSHIP_API)
{
  $scope.$on('cloud:push:notification', function(event, data) {
    var payload = data.message.raw.additionalData.payload;
    console.log("PAYLOAD FROM PUSH" + JSON.stringify(payload));
    if (payload.user_message == 1){
        $scope.getConversations();
    }
  });


  $scope.current_user = currentUserService;
  $rootScope.message_badge_count = 0;

  $scope.getConversations = function() {
    if(window.cordova){
      $cordovaBadge.clear();
    }
    console.log("inside getConversations");
    $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
    // localforage.getItem('user_token').then(function(value) {

      $http({ method: 'GET',
              url: DEALERSHIP_API.url + "/conversations",
              headers: {'Authorization' : $scope.current_user.token}
      }).success( function( data ){
              console.log("Data from conversations: ", JSON.stringify(data, null, 4));
              $scope.conversations = data.conversations;
              $ionicLoading.hide();
      }).error( function(error){
              console.log("Error in Conversations", JSON.stringify(error));
              if (error.errors === "Not authenticated"){
                var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Sorry you have been logged out. Please re-login'
                });
              }
              $state.go('login');
              $ionicLoading.hide();
      }).finally(function() {
             // Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
      });
    // }).catch(function(err) { console.log("GET ITEM ERROR::Conversations::getConversation::", JSON.stringify(err));});
  };

  $scope.openConversation = function(convo){
    //--Set Conversation
    console.log("OpenConvo Convo", JSON.stringify(convo,null, 4));
    currentConversation.id = convo.conversation_id;
    currentConversation.sender_id = convo.sender_id;
    currentConversation.sender_name = convo.sender_name;
    currentConversation.sender_image = convo.sender_image;

    localforage.setItem('conversation', currentConversation).then(function(value){
     $state.go('tab.messages');
    });
  };
});
