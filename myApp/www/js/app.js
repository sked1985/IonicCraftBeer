var app = angular.module('ionicApp', ['ionic','ionic.contrib.ui.tinderCards'])

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
  $stateProvider.state('sign', {
    url: '/sign',
    views: {
      home: {
        templateUrl: 'sign.html'
      }
    }
  })
  
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
  
  //This brings you to videos page
   $stateProvider.state('video', {
    url: '/video',
    views: {
      home: {
        templateUrl: 'video.html'
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



//This is the script that makes the image gallery work
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

//Swipe Cards functionality
.controller('CardsCtrl', function($scope) {
    var cardTypes = [
        { image: 'img/beer.jpg', title: 'So much grass #hippster'},
        { image: 'img/beer.jpg', title: 'Way too much Sand, right?'},
        { image: 'img/bagel.jpg', title: 'Beautiful sky from wherever'},
		{ image: 'img/beer.jpg', title: 'So much grass #hippster'},
        { image: 'img/beer.jpg', title: 'Way too much Sand, right?'},
        { image: 'img/bagel.jpg', title: 'Beautiful sky from wherever'},
		 { image: 'img/beer.jpg', title: 'So much grass #hippster'},
        { image: 'img/beer.jpg', title: 'Way too much Sand, right?'},
        { image: 'img/bagel.jpg', title: 'Beautiful sky from wherever'},
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



	