angular.module('starter.services', [])

  //Events service that returns some data
  .factory('EventsService', function ($firebase) {
      var firebase = new Firebase('https://craftbeerproject.firebaseio.com/events');
      var service = $firebase(firebase);
      return service;
    })

    //Comments Service
  .factory('CommentsService', function($firebase, $rootScope){

    var ref = new Firebase("https://craftbeerproject.firebaseio.com/");
       return $firebase(ref.limitToLast(10)).$asArray();
  })

  //Comments Service
  .factory('OrderService', function($firebase, $rootScope){

    var ref = new Firebase("https://skedchat.firebaseio.com/");
      return $firebase(ref.limitToLast(10)).$asArray();
    })

 //Menu Service that is to return some data
 .factory('MenuService', function ($firebase) {
     var firebase = new Firebase('https://craftbeerproject.firebaseio.com/menu');
     var service = $firebase(firebase);
     return service;
   })

//User Service for favorites
   .factory('User', function(){

     var o = {
       favorites: [],
       newFavorites: 0
     }

     o.addSongToFavorites = function(song){

       if(!song) return false;

       o.favorites.unshift(song);
       o.newFavorites ++;

     }

     o.favoriteCount = function(){
       return o.newFavorites;
     }

     o.removeSongFromFavorites = function(song, index){

       if (!song) return false;

       o.favorites.splice(index, 1);

     }

     return o;

   });
