var app = angular.module('ionicApp', ['ionic'])

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

.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }
});

	