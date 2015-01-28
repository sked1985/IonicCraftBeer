'use strict';
/* global window,angular */

var ineeditControllers = angular.module('ineeditControllers', []);

ineeditControllers.controller('HomeCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	console.log('Running home controller');
	$scope.status = 'Getting position...';
	
	navigator.geolocation.getCurrentPosition(function(result) {
		$rootScope.position = result.coords;
		$location.path('/services');
		$scope.$apply();
	}, function(err) {
		if(err.code && err.code === 1) {
			alert("You must allow geolocation access\nfor this application to work.");
		} else {
			//more generic error
			alert("I'm sorry, but I was unable\nto get your position.\n" + "Err Code: "+err.code);
		}
		console.log(err);
	},{enableHighAccuracy:false, timeout:60*1000});

}]);

ineeditControllers.controller('ServiceListCtrl', ['$scope', '$http', function($scope, $http) {
	
	$http.get('data/services.json').success(function(data) {
		$scope.services = data;
	});
}]);

ineeditControllers.controller('ServiceDetailCtrl', ['$scope','$stateParams', '$rootScope', 'nicetitleFilter', '$ionicScrollDelegate', function($scope, $stateParams, $rootScope, nicetitleFilter, $ionicScrollDelegate) {
	$scope.serviceId = $stateParams.serviceId;
	$scope.service = nicetitleFilter($scope.serviceId);
	$rootScope.notHome = true;

	var lat = $rootScope.position.latitude;
	var lng = $rootScope.position.longitude;

	var request = {};
	request.location = new google.maps.LatLng(lat,lng);
	request.radius = 2000;
	request.types = [ $scope.serviceId ];

	var service = new google.maps.places.PlacesService(document.createElement("div"));
	service.nearbySearch(request, callback);

	function callback(result) {
		var matches = result.map(function(o) {
			return {
				id:o.id,
				reference:o.reference,
				name:o.name,
				address:o.vicinity,
				icon:o.icon,
				location:{longitude:o.geometry.location.lng(),latitude:o.geometry.location.lat()}
			};
		});
		$scope.matches = matches;
		$ionicScrollDelegate.resize();
		console.log("Matches", $scope.matches.length);
		if(matches.length === 0) {
			$scope.noresult = "Sorry, there are no matches.";	
		}
		$scope.$apply();
	}

}]);

ineeditControllers.controller('PlaceDetailCtrl', ['$scope', '$stateParams', '$rootScope', '$ionicSlideBoxDelegate', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate) {
	$rootScope.notHome = true;
	$scope.placeId = $stateParams.placeId;

	var service = new google.maps.places.PlacesService(document.createElement("div"));
	service.getDetails({reference:$scope.placeId}, function(res) {
		console.dir(res);
		//modify res so we can use loc easier
		res.position = {longitude:res.geometry.location.lng(), latitude:res.geometry.location.lat()};

		if(res.opening_hours) {
			$scope.hasOpen = true;	
		} else $scope.hasOpen = false;
		
		$scope.price = "";
		if(res.price_level) {
			if(res.price_level === 0) $scope.price = "Free";
			if(res.price_level === 1) $scope.price = "Inexpensive";
			if(res.price_level === 2) $scope.price = "Moderate";
			if(res.price_level === 3) $scope.price = "Expensive";
			if(res.price_level === 4) $scope.price = "Very expensive";
		}
		
		if(res.photos) {
			$scope.hasPhotos = true;
			for(var x=0;x<res.photos.length; x++) {
				res.photos[x].url = res.photos[x].getUrl({'maxWidth':300,'maxHeight':300});
			}
		} else $scope.hasPhotos = false;

		$scope.place = res;
		$ionicSlideBoxDelegate.update();

		$scope.$apply();
	});

}]);




