// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ionic.contrib.ui.tinderCards'
  ])

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
//End of image gallery
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
//End of swipe card functionality

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // This is the Login state
    .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: "LoginCtrl"
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      // The tab requires user login
      data: {
        requiresLogin: true
      }
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.browse', {
     url: "/browse",
     views: {
       'tab-home': {
         templateUrl: "templates/browse.html"
       }
     }
   })

   .state('tab.beers', {
    url: "/beers",
    views: {
      'tab-home': {
        templateUrl: "templates/beers.html"
      }
    }
  })

  .state('tab.ciders', {
   url: "/ciders",
   views: {
     'tab-home': {
       templateUrl: "templates/ciders.html"
     }
   }
 })

 .state('tab.sandwiches', {
  url: "/sandwiches",
  views: {
    'tab-home': {
      templateUrl: "templates/sandwiches.html"
    }
  }
})

  .state('tab.baltika', {
   url: "/baltika",
   views: {
     'tab-home': {
       templateUrl: "templates/baltika.html"
     }
   }
 })

 .state('tab.dungarvan', {
  url: "/dungarvan",
  views: {
    'tab-home': {
      templateUrl: "templates/dungarvan.html"
    }
  }
})

.state('tab.bohemian', {
 url: "/bohemian",
 views: {
   'tab-home': {
     templateUrl: "templates/bohemian.html"
   }
 }
})

.state('tab.bulmers', {
 url: "/bulmers",
 views: {
   'tab-home': {
     templateUrl: "templates/bulmers.html"
   }
 }
})


.state('tab.strongbow', {
 url: "/strongbow",
 views: {
   'tab-home': {
     templateUrl: "templates/strongbow.html"
   }
 }
})

.state('tab.club', {
 url: "/club",
 views: {
   'tab-home': {
     templateUrl: "templates/club.html"
   }
 }
})

.state('tab.blt', {
 url: "/blt",
 views: {
   'tab-home': {
     templateUrl: "templates/blt.html"
   }
 }
})


 .state('tab.images', {
  url: "/images",
  views: {
    'tab-home': {
      templateUrl: "templates/images.html"
    }
  }
})

.state('tab.review', {
 url: "/review",
 views: {
   'tab-home': {
     templateUrl: "templates/review.html"
   }
 }
})

.state('tab.order', {
 url: "/order",
 views: {
   'tab-home': {
     templateUrl: "templates/order.html"
   }
 }
})

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    //This brings you to browse items page
 $stateProvider.state('browse', {
   url: '/browse',
   views: {
     home: {
       templateUrl: 'templates/browse.html'
     }
   }
 })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });



  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }

  });
});
