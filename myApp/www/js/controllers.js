angular.module('starter.controllers', [])
//Login controller
.controller('LoginCtrl', function($scope, auth, $state, store) {
  auth.signin({
    closable: false,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    $state.go('tab.home');
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})


.controller('HomeCtrl', function($scope, $http) {

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  }
})

//Logout controller
.controller('AccountCtrl', function($scope, auth, $state, store) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login');
  }
})
//Pop up controller
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: 'Enter Wi-Fi Password',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };
})

//Countdown controller
.controller('AppCtrl', function($scope, $timeout) {
    $scope.moveButtons = function() {
        var buttons = document.getElementById('buttons');

        move(buttons)
        .ease('in-out')
        .y(200)
        .duration('0.5s')
        .end();
    };
    $scope.blink = function(){
      var bg = document.getElementById('contentBG');

      var highlightBack = move(bg)
      .set('background','#FFFFFF')
      .duration('0.2s')
      .end();

      var highlight = move(bg)
      .set('background', '#B9F6CA')
      .duration('0.2s')
      .then(highlightBack)
      .end();
    };
    $scope.timer = function(){
      if($scope.timerTimeout){
        $timeout.cancel($scope.timerTimeout);
      }
    $scope.time=0;
    $scope.timerTimeout = $timeout(onTimerTimeout,0);
  };
  function onTimerTimeout(){
    $scope.time++;
    var timer = document.getElementById('myTimer');

    move(timer)
    .ease('snap')
    .set('opacity',1)
    .scale(1.4)
    .duration('0s')
    .end();

    move(timer)
    .ease('out')
    .x(150)
    .rotate(140)
    .scale(.1)
    .set('opacity',0)
    .duration('1s')
    .end();
    $scope.timerTimeout = $timeout(onTimerTimeout,1000);
  };
});
