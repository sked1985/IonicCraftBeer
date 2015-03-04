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

//Home Page controller
.controller('HomeCtrl', function($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup) {
  var comment = {
    message: '',
    rating: 5
  };
  $scope.comment = angular.copy(comment);

  $scope.sendComments = function () {
    // Send comment
    $scope.cancelComments();
    $ionicPopup.alert({
      title: 'Thank you!',
      template: 'We appreciate your comments!',
      okText: 'Close'
    });
  };

  $scope.cancelComments = function () {
    $scope.comment = angular.copy(comment);
    $scope.modal.hide();
  }

  $scope.openComments = function() {
    $ionicModal.fromTemplateUrl('templates/comments.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });


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

//Order now controller
.controller('FoodCtrl', function ($scope, $ionicListDelegate, $ionicLoading, $ionicModal, $ionicPopup, MenuService) {

  $scope.sendOrder = function () {
    $ionicPopup.alert({
      title: 'Order submitted',
      template: 'Your order will be delieved to your table in 5 minutes',
    }).then(function (code) {
      $scope.modal.hide();
    });
  }

  $scope.openPreview = function() {
    $ionicModal.fromTemplateUrl('templates/preview.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.cancelPreview = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

  $scope.order = {
    items: [],
    total: 0
  };

  $scope.add = function (item) {
    $ionicListDelegate.closeOptionButtons();
    $scope.order.items.push(angular.copy(item));
    $scope.order.total += item.price;
  };

  $scope.remove = function (index) {
    $scope.order.total -= $scope.order.items[index].price;
    $scope.order.items.splice(index, 1);
  };

  $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading menu'
  });

  $scope.menu = MenuService.$asArray();
  $scope.menu.$loaded().then(function () {
    $ionicLoading.hide();
  });

})

//Image gallery
.controller('MediaCtrl', function($scope, $ionicModal) {
$scope.allImages = [{
      'src' : 'img/blt.jpg'
  }, {
      'src' : 'img/blt2.jpg'
  }, {
      'src' : 'img/blt.jpg'
  }];

$scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
  }

  $scope.clipSrc = 'img/coffee.MOV';

$scope.playVideo = function() {
    $scope.showModal('templates/video-popover.html');
}

$scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  }
  // Close the modal
  $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
  };
})
//End of image gallery
//Baltika Image gallery
.controller('MediaCtrl2', function($scope, $ionicModal) {
$scope.allImages = [{
      'src' : 'img/bulmers.jpg'
  }, {
      'src' : 'img/blt.jpg'
  }, {
      'src' : 'img/blt.jpg'
  }];

$scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
  }

  $scope.clipSrc = 'img/coffee.MOV';

$scope.playVideo = function() {
    $scope.showModal('templates/video-popover.html');
}

$scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  }
  // Close the modal
  $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
  };
})
//End of Baltika image gallery
//Swipe Cards Review functionality
.controller('CardsCtrl', function($scope) {
    var cardTypes = [
        { image: 'img/beer.jpg', title: 'Baltika'},
        { image: 'img/del7.jpg', title: 'Fantastic?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
        { image: 'img/del1.jpg', title: 'Did you like?'},
        { image: 'img/del2.jpg', title: 'Tasty, No?'},
        { image: 'img/del3.jpg', title: 'Swipe left if no'},
        { image: 'img/del4.jpg', title: 'Surely you like this?'},
        { image: 'img/del5.jpg', title: 'Freshly made'},
        { image: 'img/del6.jpg', title: 'delish'},
        { image: 'img/beer.jpg', title: 'Baltika'},
        { image: 'img/del7.jpg', title: 'Fantastic?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
        { image: 'img/del1.jpg', title: 'Did you like?'},
        { image: 'img/del2.jpg', title: 'Tasty, No?'},
        { image: 'img/del3.jpg', title: 'Swipe left if no'},
        { image: 'img/del4.jpg', title: 'Surely you like this?'},
        { image: 'img/del5.jpg', title: 'Freshly made'},
        { image: 'img/del6.jpg', title: 'delish'}
    ];

    $scope.cards = [];

    $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 18; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
})
//End of swipe card functionality
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
