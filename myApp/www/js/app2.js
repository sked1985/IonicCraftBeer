angular.module('ineeditApp', ['ionic','ineeditControllers','ineeditFilters'])

.config(['$stateProvider','$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

	  $stateProvider
	  	.state('Home', {
			url: '/',
			controller: 'HomeCtrl', 
			templateUrl: 'partials/home.html'
		})
	  	.state('Services', {
			url: '/services',
			controller: 'ServiceListCtrl',
			templateUrl: 'partials/service-list.html'
		})
	  	.state('Service', {
			url: '/service/:serviceId', 
			controller: 'ServiceDetailCtrl', 
			templateUrl: 'partials/service-detail.html'
		})
	  	.state('Place', {
			url: '/place/:placeId', 
			controller: 'PlaceDetailCtrl', 
			templateUrl: 'partials/place-detail.html'
		});

	  $urlRouterProvider.otherwise("/");

}])	

.run(function($ionicPlatform,$rootScope,$location) {
	
  $rootScope.goHome = function() {
	$location.path('/services');
  };
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
  });
});
