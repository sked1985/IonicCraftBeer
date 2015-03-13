// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//Use YOUR Firebase URL (not the one below)

angular.module('starter', ['ionic',
  'firebase',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ionic.contrib.ui.tinderCards'
  ])

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

        .state('tab.food', {
         url: "/food",
         views: {
           'tab-home': {
             templateUrl: "templates/food.html",
             controller: 'FoodCtrl'
           }
         }
       })

       .state('tab.events', {
        url: "/events",
        views: {
          'tab-home': {
            templateUrl: "templates/events.html",
            controller: 'EventsCtrl'
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

    .state('tab.dungarvenimg', {
     url: "/dungarvenimg",
     views: {
       'tab-home': {
         templateUrl: "templates/dungarvenimg.html"
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

    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html',
        }
      }
    })

    .state('tour', {
      url: '/tour',
      templateUrl: 'templates/tour.html',
      data: {
        requiresLogin: true
      }
    });


  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tour');

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
