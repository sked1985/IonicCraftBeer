angular.module('starter.services', [])

  //Events service that returns some data
  .factory('EventsService', function ($firebase) {
      var firebase = new Firebase('https://craftbeerproject.firebaseio.com/events');
      var service = $firebase(firebase);
      return service;
    })

 //Menu Service that is to return some data
 .factory('MenuService', function ($firebase) {
     var firebase = new Firebase('https://craftbeerproject.firebaseio.com/menu');
     var service = $firebase(firebase);
     return service;
   });
