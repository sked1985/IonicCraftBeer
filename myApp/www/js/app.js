angular.module('starter', ['ionic',
  'firebase',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ionic.ion.headerShrink',
  'ngCordova',
  'ionic.ion.imageCacheFactory',
  '$selectBox',
  'ionic-datepicker'
  ])


//Runs the application
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#387ef5');

}
  });
})

.directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			$ionicGesture.on('tap', function(e){

				// Grab the content
				var content = element[0].querySelector('.item-content');

				// Grab the buttons and their width
				var buttons = element[0].querySelector('.item-options');

				if (!buttons) {
					console.log('There are no option buttons');
					return;
				}
				var buttonsWidth = buttons.offsetWidth;

				ionic.requestAnimationFrame(function() {
					content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

					if (!buttons.classList.contains('invisible')) {
						console.log('close');
						content.style[ionic.CSS.TRANSFORM] = '';
						setTimeout(function() {
							buttons.classList.add('invisible');
						}, 250);
					} else {
						buttons.classList.remove('invisible');
						content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
					}
				});

			}, element);
		}
	};
}])

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})

//This is the directive for the fake status bar on the app
.directive('fakeStatusbar', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="fake-statusbar"><div class="pull-left">Carrier</div><div class="time">3:30 PM</div><div class="pull-right">50%</div></div>'
  }
})

//This is the directive for the header shrink animation in the application
.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(44, amt);
    fadeAmt = 1 - amt / 44;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;

      $element.bind('scroll', function(e) {
        var scrollTop = null;
        if(e.detail){
          scrollTop = e.detail.scrollTop;
        }else if(e.target){
          scrollTop = e.target.scrollTop;
        }
        if(scrollTop > starty){
          // Start shrinking
          shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
          shrink(header, $element[0], shrinkAmt, headerHeight);
        } else {
          shrink(header, $element[0], 0, headerHeight);
        }
      });
    }
  }
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {





  // Ionic uses AngularUI Router which uses the concept of st$ionicConfigProvidertes
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
      controller: 'TabsCtrl',
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

      .state('tab.reservation', {
       url: "/reservation",
       views: {
         'tab-home': {
           templateUrl: "templates/reservation.html",
           controller: 'ReservationController'
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

       .state('tab.dashboard', {
        url: "/dashboard",
        views: {
          'tab-home': {
            templateUrl: "templates/dashboard.html"
          }
        }
      })

      .state('tab.staff', {
       url: "/staff",
       views: {
         'tab-home': {
           templateUrl: "templates/staff.html"
         }
       }
     })

     .state('tab.staffcontent', {
      url: "/staffcontent",
      views: {
        'tab-home': {
          templateUrl: "templates/staffcontent.html"
        }
      }
    })

     .state('tab.popular', {
      url: "/popular",
      views: {
        'tab-home': {
          templateUrl: "templates/popular.html"
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

     .state('tab.stouts', {
      url: "/stouts",
      views: {
        'tab-home': {
          templateUrl: "templates/stouts.html"
        }
      }
    })

    .state('tab.cocktails', {
     url: "/cocktails",
     views: {
       'tab-home': {
         templateUrl: "templates/cocktails.html"
       }
     }
   })

   .state('tab.coffees', {
    url: "/coffees",
    views: {
      'tab-home': {
        templateUrl: "templates/coffees.html"
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
           templateUrl: "templates/baltika.html",
           controller: 'HomeCtrl'
         }
       }
     })


     .state('tab.dungarvan', {
      url: "/dungarvan",
      views: {
        'tab-home': {
          templateUrl: "templates/dungarvan.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.bohemian', {
     url: "/bohemian",
     views: {
       'tab-home': {
         templateUrl: "templates/bohemian.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.bulmers', {
     url: "/bulmers",
     views: {
       'tab-home': {
         templateUrl: "templates/bulmers.html",
         controller: 'HomeCtrl'
       }
     }
    })


    .state('tab.strongbow', {
     url: "/strongbow",
     views: {
       'tab-home': {
         templateUrl: "templates/strongbow.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.guinness', {
     url: "/guinness",
     views: {
       'tab-home': {
         templateUrl: "templates/guinness.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.oharas', {
     url: "/oharas",
     views: {
       'tab-home': {
         templateUrl: "templates/oharas.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.whiskey', {
     url: "/whiskey",
     views: {
       'tab-home': {
         templateUrl: "templates/whiskey.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.sex', {
     url: "/sex",
     views: {
       'tab-home': {
         templateUrl: "templates/sex.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.americano', {
     url: "/americano",
     views: {
       'tab-home': {
         templateUrl: "templates/americano.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.cappuccino', {
     url: "/cappuccino",
     views: {
       'tab-home': {
         templateUrl: "templates/cappuccino.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.club', {
     url: "/club",
     views: {
       'tab-home': {
         templateUrl: "templates/club.html",
         controller: 'HomeCtrl'
       }
     }
    })

    .state('tab.blt', {
     url: "/blt",
     views: {
       'tab-home': {
         templateUrl: "templates/blt.html",
         controller: 'HomeCtrl'
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



    .state('tour', {
      url: '/tour',
      templateUrl: 'templates/tour.html',
      data: {
        requiresLogin: true
      }
    });


  // Configure Auth0
  authProvider.init({
    domain: 'sked.auth0.com',
    clientID: 'cbJWSrBQY1BQfLqfgYVCjPxH644mZAFL',
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
