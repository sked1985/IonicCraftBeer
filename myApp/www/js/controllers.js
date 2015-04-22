angular.module('starter.controllers', [])

//Login controller
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    },function(profile,token, accessToken, state, refreshToken){
      store.set('profile',profile);
      store.set('token',token);
      store.set('refreshToken',refreshToken);
      $state.go('tour');
    },function(){
      console.log('There was an error');
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });
  doAuth();
})
//Side menu controller
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate, $cordovaSocialSharing) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
  $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
  }

  $scope.shareViaTwitter = function(message, image, link) {
      $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
          $cordovaSocialSharing.shareViaTwitter(message, image, link);
      }, function(error) {
          alert("Cannot share on Twitter");
      });
  }
})
//Controller for the tabs
.controller('TabsCtrl', function($scope, User) {
  $scope.favCount = User.favoriteCount;

  $scope.enteringFavorites = function(){
    User.newFavorites = 0;
  }
})
//Home Page controller
.controller('HomeCtrl', function($scope, $cordovaSocialSharing, auth, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, EventsService, $state, store, CommentsService, $rootScope) {

  $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
  }

  $scope.shareViaTwitter = function(message, image, link) {
      $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
          $cordovaSocialSharing.shareViaTwitter(message, image, link);
      }, function(error) {
          alert("Cannot share on Twitter");
      });
  }

  $scope.auth = auth;
  $scope.postAuthor = auth.profile.name;
  $scope.postAuthorPic = auth.profile.picture;


  $scope.data = {}

   // This is the help button on the items page alert
   $scope.showPopup = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Like what you see?',
       template: 'Press the order now button'
     });
     alertPopup.then(function(res) {
       console.log('');
     });
  }

  var message = {
    rating: 5
  };

  //This is the start of the comments
  $scope.comments = CommentsService;

  $scope.comment = {};



  $scope.comment = angular.copy(message);

  //Sends the comments
  $scope.addComment = function(comment) {
    $scope.comments.$add({message: $scope.comment,
                          postAuthor:$scope.postAuthor,
                          postAuthorPic:$scope.postAuthorPic});
    //we reset the text input field to an empty string
    $scope.comment.theComment = "";

  };

  //This is the function that displays the message when comments have been sent
  $scope.sendComments = function() {

    console.log("This is logged" , $scope.comment);
    // Send comment
    $scope.cancelComments();
    $ionicPopup.alert({
      title: 'Thank you!',
      template: 'We appreciate your comments!',
      okText: 'Close'

    });
  };

  //Closes the comments page
  $scope.cancelComments = function () {

    $scope.modal.hide();
  }



  //Opens the comments page

  $scope.openComments = function() {
    $ionicModal.fromTemplateUrl('templates/comments.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the beerchat page
  $scope.cancelBeerChat = function () {

    $scope.modal.hide();
  }



  //Opens the beerchat page
  $scope.openBeerChat = function() {
    $ionicModal.fromTemplateUrl('templates/beerchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the ciderchat page
  $scope.cancelCiderChat = function () {

    $scope.modal.hide();
  }



  //Opens the ciderchat page
  $scope.openCiderChat = function() {
    $ionicModal.fromTemplateUrl('templates/ciderchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the stoutchat page
  $scope.cancelStoutChat = function () {

    $scope.modal.hide();
  }



  //Opens the stoutchat page
  $scope.openStoutChat = function() {
    $ionicModal.fromTemplateUrl('templates/stoutchat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //Closes the coffeechat page
  $scope.cancelCoffeeChat = function () {

    $scope.modal.hide();
  }



  //Opens the coffeechat page
  $scope.openCoffeeChat = function() {
    $ionicModal.fromTemplateUrl('templates/coffeechat.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };


  //logout function
  $scope.logout = function() {
   auth.signout();
   store.remove('token');
   store.remove('profile');
   store.remove('refreshToken');
   $state.go('login');
 }

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });

  //Loads the Upcoming Events into an array and then displays them
  var events = EventsService.$asArray();
  events.$loaded().then(function () {
    $scope.today = events[new Date().getDay()];
  });

})



//Controller for the discover items tabs
  .controller('DiscoverCtrl', function($scope, $timeout, User, $ionicPopup) {

    // An alert dialog
      $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
      title: 'Welcome to the Discover Page!',
      type: 'button-positive',
      template: 'Favorite the ones you like, Skip the ones you hate! Enjoy'
      });
      alertPopup.then(function(res) {
      console.log('Thank you for liking');
      });
      };


    // our first three songs
    $scope.songs = [
       {
          "title":"Fishers",
          "artist":"Beer",
          "image_small":"http://i38.tinypic.com/zx8d1i.jpg",
          "image_large":"http://i38.tinypic.com/zx8d1i.jpg"
       },
       {
          "title":"Guinness",
          "artist":"Stout",
          "image_small":"http://www.redfm.ie/wp-content/uploads/2014/08/guinness1.jpg",
          "image_large":"http://www.redfm.ie/wp-content/uploads/2014/08/guinness1.jpg"
       },
       {
          "title":"Trouble Brewing",
          "artist":"Stout",
          "image_small":"http://thegreenmanstudio.com/wp-content/uploads/2011/11/darkarts.jpg",
          "image_large":"http://thegreenmanstudio.com/wp-content/uploads/2011/11/darkarts.jpg"
       },
       {
          "title":"Club",
          "artist":"Sandwich",
          "image_small":"http://i.huffpost.com/gen/1107767/images/o-CLUB-SANDWICH-facebook.jpg",
          "image_large":"http://i.huffpost.com/gen/1107767/images/o-CLUB-SANDWICH-facebook.jpg"
       },
       {
          "title":"Americano",
          "artist":"Coffee",
          "image_small":"https://ardyssrecipes.files.wordpress.com/2012/12/black_coffee_cup_nice-1680x1050.jpg",
          "image_large":"https://ardyssrecipes.files.wordpress.com/2012/12/black_coffee_cup_nice-1680x1050.jpg"
       },
       {
          "title":"BLT",
          "artist":"Sandwich",
          "image_small":"http://i38.http://upload.wikimedia.org/wikipedia/commons/f/f1/BLT_sandwich_(1).jpg.com/zx8d1i.jpg",
          "image_large":"http://i38.http://upload.wikimedia.org/wikipedia/commons/f/f1/BLT_sandwich_(1).jpg.com/zx8d1i.jpg"
       },
       {
          "title":"Fishers",
          "artist":"Beer",
          "image_small":"https://s-media-cache-ak0.pinimg.com/originals/32/21/6c/32216ccffb6f3f2184a54ce11f537a11.jpg",
          "image_large":"https://s-media-cache-ak0.pinimg.com/originals/32/21/6c/32216ccffb6f3f2184a54ce11f537a11.jpg"
       },
       {
          "title":"Whiskey Sour",
          "artist":"Cocktails",
          "image_small":"http://www.betcheslovethis.com/files/uploads/images/whiskeys.jpg",
          "image_large":"http://www.betcheslovethis.com/files/uploads/images/whiskeys.jpg"
       },
       {
          "title":"Baltika",
          "artist":"Beer",
          "image_small":"http://3.bp.blogspot.com/-rpQ7MkjZURE/T8EoQYBjQJI/AAAAAAAADdk/OKIC67DYSOk/s1600/Zombie+Dust.jpg",
          "image_large":"http://3.bp.blogspot.com/-rpQ7MkjZURE/T8EoQYBjQJI/AAAAAAAADdk/OKIC67DYSOk/s1600/Zombie+Dust.jpg"
       },
       {
          "title":"Dungarven",
          "artist":"Beer",
          "image_small":"http://drinkwiththewench.com/wp-content/uploads/2013/01/12244_10102418352089945_1869374664_n.jpg",
          "image_large":"http://drinkwiththewench.com/wp-content/uploads/2013/01/12244_10102418352089945_1869374664_n.jpg"
       }
    ];

    $scope.currentSong = angular.copy($scope.songs[0]);

    $scope.sendFeedback = function (bool) {
      if(bool) User.addSongToFavorites($scope.currentSong);

     // set variable for the correct animation sequence
     $scope.currentSong.rated = bool;
     $scope.currentSong.hide = true;

     $timeout(function() {
       // $timeout to allow animation to complete before changing to next song
       // set the current song to one of our three songs
       var randomSong = Math.round(Math.random() * ($scope.songs.length - 1));

       // update current song in scope
       $scope.currentSong = angular.copy($scope.songs[randomSong]);

     }, 250);
   }

   $scope.removeSong = function(song, index){
     User.removeSongFromFavorites(song, index);
   }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {

  $scope.favorites = User.favorites;

})

//Events controller
.controller('EventsCtrl', function ($scope, EventsService) {

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var day = new Date().getDay();
  var index = 0;
  $scope.events = EventsService.$asArray();

  $scope.events.$loaded().then(function () {
    while (day != index && index < 7) {
      $scope.events.push($scope.events.shift());
      index++;
    }
  });
})

//Baltika Image gallery controller
.controller('BaltikaCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Swipe me to the left. Tap/click to close'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];



    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Bulmers Image gallery controller
.controller('BulmersCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'This was easier than expected'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal2.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Guinness Image gallery controller
.controller('GuinnessCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Pint of Guinness '
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal3.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Guinness Image gallery controller
.controller('CocktailsCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Beautiful Cocktails '
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal4.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Coffees Image gallery controller
.controller('CoffeesCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Pictures of delicious coffee'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal5.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])
//Coffees Image gallery controller
.controller('SandwichesCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://ionicframework.com/img/ionic_logo.svg',
      	'msg' : 'Tasty'
    	}, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
      }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg',
        'msg' : ''
    }];

    $ionicModal.fromTemplateUrl('image-modal6.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
      // Important: This line is needed to update the current ion-slide's width
      // Try commenting this line, click the button and see what happens
      $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


  }
])

//Order now controller
.controller('FoodCtrl', function ($scope, auth, $cordovaLocalNotification, $ionicListDelegate, $ionicLoading, $ionicModal, $ionicPopup, MenuService, OrderService) {


  $scope.auth = auth;
  $scope.postAuthor = auth.profile.name;
  $scope.postAuthorPic = auth.profile.picture;


  $scope.orders = OrderService;

  $scope.order = {
    items: [],
    total: 0
  };

  //This displays the submitted order message
  $scope.sendOrder = function (order) {
    $scope.orders.$add({content: $scope.order,
      postAuthor:$scope.postAuthor,
      postAuthorPic:$scope.postAuthorPic});

    $ionicPopup.alert({
      title: 'Order submitted',
      template: 'Your order will be delieved to your table in 5 minutes',
    }).then(function (code) {
      $scope.modal.hide();
      console.log("This is logged" , $scope.order);
    });
    var alarmTime = new Date();
       alarmTime.setSeconds(alarmTime.getSeconds() + 10);
       $cordovaLocalNotification.add({
           id: "1234",
           date: alarmTime,
           message: "Your drink should be arriving any second now. Enjoy!!",
           title: "Thank you for the order",
           autoCancel: true
       }).then(function () {
           console.log("The notification has been set");
       });
  }

  //This opens the preview order page
  $scope.openPreview = function() {
    $ionicModal.fromTemplateUrl('templates/preview.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  //This cancels the preview order page
  $scope.cancelPreview = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    if ($scope.modal) {
      $scope.modal.remove();
    }
  });



  $scope.add = function (item) {
    $ionicListDelegate.closeOptionButtons();
    $scope.order.items.push(angular.copy(item));
    $scope.order.total += item.price;
  };

  $scope.remove = function (index) {
    $scope.order.total -= $scope.order.items[index].price;
    $scope.order.items.splice(index, 1);
  };

  $ionicLoading.show({
    template: '<span class="icon spin ion-loading-d"></span> Loading menu'
  });

  $scope.menu = MenuService.$asArray();
  $scope.menu.$loaded().then(function () {
    $ionicLoading.hide();
  });

})
//End of the order controller
//Image gallery
.controller('MediaCtrl', function($scope, $ionicModal) {
$scope.allImages = [{
      'src' : 'img/blt.jpg'
  }, {
      'src' : 'img/del2.jpg'
  },{
      'src' : 'img/curim.jpg'
  }, {
      'src' : 'img/cider2.jpg'
  }];

  $scope.allImages1 = [{
        'src' : 'img/cider.jpg'
    }, {
        'src' : 'img/blt2.jpg'
    },{
        'src' : 'img/bulmers.jpg'
    }, {
        'src' : 'img/del4.jpg'
    }];

    $scope.allImages2 = [{
          'src' : 'img/coffee.jpg'
      }, {
          'src' : 'img/cocktail2.jpg'
      },{
          'src' : 'img/del3.jpg'
      }, {
          'src' : 'img/dun.jpg'
      }];


$scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-popover.html');
  }

  $scope.clipSrc = 'img/coffee.MOV';

$scope.playVideo = function() {
    $scope.showModal('templates/video-popover.html');
}

$scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
      });
  }
  // Close the modal
  $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
  };
})
//End of image gallery
//Beer chat controller
.controller('chatController', ["$scope", "beerChat", function($scope, beerChat ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = beerChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])
//End of beer chat controller
//Cider chat controller
.controller('chatController1', ["$scope", "ciderChat", function($scope, ciderChat ) {
    //Set messages to chatMessages factory which returns the firebase data
    $scope.messages = ciderChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])
//end of cider chat
//Stout chat controller
.controller('chatController2', ["$scope", "stoutChat", function($scope, stoutChat ) {
    //Set messages to chatMessages factory which returns the firebase data


    $scope.messages = stoutChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}])

//Stout chat controller
.controller('chatController3', ["$scope", "coffeeChat", function($scope, coffeeChat ) {
    //Set messages to chatMessages factory which returns the firebase data


    $scope.messages = coffeeChat;

    //Initialize message object
    $scope.message = {};

    //Add message to the firebase data
    $scope.addMessage = function(message) {
      $scope.messages.$add({content: message});
      //we reset the text input field to an empty string
      $scope.message.theMessage = "";
    };
}]);
