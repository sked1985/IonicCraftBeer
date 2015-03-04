angular.module('starter.services', [])


 //Menu Service that is to return some data
 .factory('MenuService', function ($firebase) {
     var firebase = new Firebase('https://craftbeerproject.firebaseio.com/menu');
     var service = $firebase(firebase);
     return service;
   });
