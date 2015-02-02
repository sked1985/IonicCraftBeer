var app = angular.module('ionicApp', ['ionic','ionic.contrib.ui.tinderCards', 'firebase'])


//Swipe Script
.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: '/home',
    views: {
      home: {
        templateUrl: 'home.html'
      }
    }
  })


  //This brings you to Sign in items page
  $stateProvider.state('login', {
    url: '/login',
    views: {
      home: {
        templateUrl: 'login.html',
        
      }
    }
  })

  app.controller("LoginController", function($scope, $firebaseAuth, $location) {


    $scope.login = function(username, password) {
      var fbAuth = $firebaseAuth(fb);
      fbAuth.$authWithPassword({
        email: username,
        password: password
      }).then(function(authData) {
        $location.path("/home");
      }).catch(function(error) {
        console.error("ERROR: " + error);
      });
    }

    $scope.register = function(username, password) {
      var fbAuth = $firebaseAuth(fb);
      fbAuth.$createUser(username, password).then(function() {
        return fbAuth.$authWithPassword({
          email: username,
          password: password
        });
      }).then(function(authData) {
        $location.path("/home");
      }).catch(function(error) {
        console.error("ERROR " + error);
      });
    }

  });



  //This brings you to Sign in items page
  $stateProvider.state('register', {
    url: '/register',
    views: {
      home: {
        templateUrl: 'register.html'
      }
    }
  })
  //This brings you to browse items page
  $stateProvider.state('browse', {
    url: '/2',
    views: {
      home: {
        templateUrl: 'browse.html'
      }
    }
  })

  //This brings you to beers list page
  $stateProvider.state('beers', {
    url: '/3',
    views: {
      home: {
        templateUrl: 'beers.html'
      }
    }
  })

   //This brings you to ciders list page
  $stateProvider.state('ciders', {
    url: '/9',
    views: {
      home: {
        templateUrl: 'ciders.html'
      }
    }
  })

   //This brings you to bulmers page
  $stateProvider.state('bulmers', {
    url: '/10',
    views: {
      home: {
        templateUrl: 'bulmers.html'
      }
    }
  })


   //This brings you to strongbow page
  $stateProvider.state('strongbow', {
    url: '/11',
    views: {
      home: {
        templateUrl: 'strongbow.html'
      }
    }
  })

    //This brings you to Sandwiches list page
  $stateProvider.state('sandwiches', {
    url: '/6',
    views: {
      home: {
        templateUrl: 'sandwiches.html'
      }
    }
  })

  //This is club page
  $stateProvider.state('club', {
    url: '/7',
    views: {
      home: {
        templateUrl: 'club.html'
      }
    }
  })

   //This is blt page
  $stateProvider.state('blt', {
    url: '/8',
    views: {
      home: {
        templateUrl: 'blt.html'
      }
    }
  })
  //This brings you to baltika page
   $stateProvider.state('baltika', {
    url: '/4',
    views: {
      home: {
        templateUrl: 'baltika.html'
      }
    }
  })
  //This brings you to dungarvan page
   $stateProvider.state('dungarvan', {
    url: '/5',
    views: {
      home: {
        templateUrl: 'dungarvan.html'
      }
    }
  })
   //This brings you to bohemian page
   $stateProvider.state('bohemian', {
    url: '/12',
    views: {
      home: {
        templateUrl: 'bohemian.html'
      }
    }
  })

   //This brings you to photo page
   $stateProvider.state('photo', {
    url: '/photo',
    views: {
      home: {
        templateUrl: 'photo.html'
      }
    }
  })
  //This brings you to reviews page
   $stateProvider.state('review', {
    url: '/review',
    views: {
      home: {
        templateUrl: 'review.html'
      }
    }
  })
  //This brings you to order now page
   $stateProvider.state('order', {
    url: '/order',
    views: {
      home: {
        templateUrl: 'order.html'
      }
    }
  })
  //This brings you to help page
  $stateProvider.state('help', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
})

//Image gallery
.controller('MediaCtrl', function($scope, $ionicModal) {
 $scope.allImages = [{
        'src' : 'img/blt.jpg'
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
//Swipe Cards Review functionality
.controller('CardsCtrl', function($scope) {
    var cardTypes = [
        { image: 'img/beer.jpg', title: 'Baltika'},
        { image: 'img/beer.jpg', title: 'Bulmers'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
		{ image: 'img/beer.jpg', title: 'So much grass #hippster'},
        { image: 'img/beer.jpg', title: 'Way too much Sand, right?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
		 { image: 'img/beer.jpg', title: 'So much grass #hippster'},
        { image: 'img/beer.jpg', title: 'Way too much Sand, right?'},
        { image: 'img/bagel.jpg', title: 'Bagel'},
    ];

    $scope.cards = [];

    $scope.addCard = function(i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 9; i++) $scope.addCard();

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

//Main Control
.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');

  $scope.toIntro = function(){
    $state.go('intro');
  }
});

var fb = null;

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    fb = new Firebase("https://craftbeerproject.firebaseio.com/");
  });
});

//This brings you to Sign in items page
