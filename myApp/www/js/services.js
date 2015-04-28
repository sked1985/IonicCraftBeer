angular.module('starter.services', [])

  //Events service that returns the Events data
  .factory('EventsService', function ($firebase) {
      var firebase = new Firebase('https://craftbeerproject.firebaseio.com/events');
      var service = $firebase(firebase);
      return service;
    })

    //Comments Service that sends the comments data
  .factory('CommentsService', function($firebase, $rootScope){

    var ref = new Firebase("https://craftbeerproject.firebaseio.com/");
       return $firebase(ref.child('reviews')).$asArray();
  })

  //Staff Comments Service that sends the comments about staff members
.factory('StaffCommentsService', function($firebase, $rootScope){

  var ref = new Firebase("https://craftbeerproject.firebaseio.com/");
     return $firebase(ref.child('staffcomments')).$asArray();
})

  //Submitting order service Service
  .factory('OrderService', function($firebase, $rootScope){

    var ref = new Firebase("https://craftbeerproject.firebaseio.com/");
    return $firebase(ref.child('orders')).$asArray();
    })

 //Menu Service that is to return the menu data
 .factory('MenuService', function ($firebase) {
     var firebase = new Firebase('https://craftbeerproject.firebaseio.com/menu');
     var service = $firebase(firebase);
     return service;
   })

   //Beer chat service
   .factory("beerChat", ['$firebase', "$rootScope", function($firebase, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://craftbeerproject.firebaseio.com/");

     // this uses AngularFire to create the synchronized array
     // We limit the results to 10
     return $firebase(ref.child('beerchat')).$asArray();
   }])

   //Cider chat service
   .factory("ciderChat", ['$firebase', "$rootScope", function($firebase, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://craftbeerproject.firebaseio.com/");

     // this uses AngularFire to create the synchronized array
     // We limit the results to 10
     return $firebase(ref.child('ciderchat')).$asArray();
   }])

   //Stout chat service
   .factory("stoutChat", ['$firebase', "$rootScope", function($firebase, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://craftbeerproject.firebaseio.com/");

     // this uses AngularFire to create the synchronized array
     // We limit the results to 10
     return $firebase(ref.child('stoutchat')).$asArray();
   }])

   //Coffee chat service
   .factory("coffeeChat", ['$firebase', "$rootScope", function($firebase, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://craftbeerproject.firebaseio.com/");

     // this uses AngularFire to create the synchronized array
     // We limit the results to 10
     return $firebase(ref.child('coffeechat')).$asArray();
   }])

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
