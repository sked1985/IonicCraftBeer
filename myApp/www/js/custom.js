//function for image gallery
(function () {
	angular.module('ionicApp', ['ionic'])
		.controller('SlideController', function($scope) {

			function showBanner(index) {
				var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
				var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
				var elm = document.querySelector(q);

        console.log("Show banner " + index);
        
				// Remove class "current"
				if (null !== oldElm) {
					oldElm.classList.remove("current");
				}

				// Add class "current" to current slide
				if (null !== elm) {
					elm.classList.add("current");
				}
			}

			$scope.activeSlide = 0;

			setTimeout(function() {
				showBanner($scope.activeSlide);
			}, 100);

			$scope.slideChanged = showBanner;
		});
}());