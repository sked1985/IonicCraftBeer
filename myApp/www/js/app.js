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